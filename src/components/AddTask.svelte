<script>
  // Svelte
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  // Utils
  import typewriter from "../helpers/typewriter";
  const { DateTime } = require("luxon");

  // Stores
  import { dbProjects, dbTasks } from "../stores/db";
  import { viewMode } from "../stores/muthur";

  // Components
  import Input from "../elements/Input.svelte";

  // State
  const dateFormat = `2020-05-25T14:24`;
  let newTask = {};
  let taskValue = ``;
  let deadlineValue = ``;
  let projectValue = ``;
  let saveValue = ``;
  let projects = [];
  let isNewProject = false;
  let newProject = {};
  let descValue = ``;
  let noteValue = ``;
  let error = null;
  let isSucces = null;

  $: helpers = !newTask.name
    ? []
    : !newTask.deadline
    ? [{ name: dateFormat, desc: `format` }]
    : !newTask.project
    ? projects.filter(
        p =>
          !p.name.toLowerCase().indexOf(projectValue.toLowerCase()) &&
          p.name.toLowerCase() !== projectValue.toLowerCase()
      )
    : [];

  $: if (isSucces) {
    const saveTimeout = setTimeout(() => {
      viewMode.set(`tasks`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Lifecycle
  onMount(() => {
    $dbProjects
      .find()
      .exec()
      .then(res => {
        projects = res.map(r => ({ name: r.name, desc: r.desc }));
      })
      .catch(err => console.log(err));
  });

  // Events
  const onTaskSet = () => {
    if (!taskValue.length) {
      error = `required field`;
      return;
    }
    error = null;
    newTask.name = taskValue;
  };

  const onDeadlineSet = () => {
    error = null;
    if (!deadlineValue.length) {
      newTask.deadline = `none`;
      return;
    }
    const date = DateTime.fromISO(deadlineValue);
    if (date.isValid) {
      newTask.deadline = date.toISO();
    } else {
      deadlineValue = ``;
      error = `inValid format`;
    }
  };

  const onProjectSet = () => {
    error = null;
    if (!projectValue.length) {
      error = `required field`;
      return;
    }
    const findProject = projects.filter(
      p => p.name.toLowerCase() === projectValue.toLowerCase()
    );
    if (!findProject.length) {
      isNewProject = true;
      newProject.name = projectValue;
      newTask.project = projectValue;
    } else {
      newTask.project = findProject[0].name;
    }
  };

  const onDescSet = () => {
    if (!descValue.length) {
      error = `required field`;
      return;
    }
    error = null;
    newProject.desc = descValue;
  };

  const onNoteSet = () => {
    error = null;
    newProject.note = noteValue.length ? noteValue : `empty`;
  };

  const onSave = () => {
    error = null;
    switch (saveValue.toLowerCase()) {
      case `yes`:
      case `y`:
        return isNewProject
          ? $dbProjects
              .insert(newProject)
              .then(res => {
                newProject = res;
                $dbTasks
                  .insert(newTask)
                  .then(res => {
                    newTask = res;
                    isSucces = true;
                  })
                  .catch(err => (error = err));
              })
              .catch(err => (error = err))
          : $dbTasks
              .insert(newTask)
              .then(res => {
                newTask = res;
                isSucces = true;
              })
              .catch(err => (error = err));
      case `no`:
      case `n`:
        return viewMode.set(`tasks`);
      default:
        saveValue = ``;
        error = `wrong command`;
    }
  };

  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`projects`);
        break;
      case `Tab`:
        if (helpers.length && !newTask.project) {
          projectValue = helpers[0].name;
        }
        break;
    }
  }
</script>

<style>
  header {
    display: flex;
    align-items: baseline;
    margin-bottom: 40px;
  }

  header span {
    font-style: italic;
  }

  h1 {
    margin: 0;
    font-size: 14px;
    line-height: 1;
    text-transform: uppercase;
    color: var(--f_inv);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: baseline;
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: var(--f_med);
  }

  p {
    margin: 0;
    padding: 5px 20px;
    border-left: 1px solid var(--f_low);
  }

  .q p {
    color: var(--f_inv);
  }

  .error p {
    color: var(--b_inv);
  }

  .helpers {
    margin: 0;
    width: 100%;
    padding: 5px 20px;
    font-style: italic;
    color: var(--f_med);
    border-left: 1px solid var(--f_low);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .helpers span {
    width: auto;
    padding-right: 10px;
    color: var(--f_high);
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<header>
  <span>{`<esc> back`}</span>
  <h1>Add Task</h1>
</header>
<ul>
  <li class="q">
    <span>○</span>
    <p in:typewriter>What is the name of the task?</p>
  </li>
  <li class="d">
    <span>task</span>
    {#if !newTask.name}
      <Input
        bind:value={taskValue}
        on:submit={onTaskSet}
        placeholder="required" />
    {:else}
      <p>{newTask.name}</p>
    {/if}
  </li>
  {#if newTask.name}
    <li class="q">
      <span>○</span>
      <p in:typewriter>Does the task have a deadline?</p>
    </li>
    <li class="d">
      <span>deadline</span>
      {#if !newTask.deadline}
        <Input
          bind:value={deadlineValue}
          on:submit={onDeadlineSet}
          placeholder="none" />
      {:else}
        <p>
          {newTask.deadline === `none` ? `none` : DateTime.fromISO(newTask.deadline).toLocaleString()}
        </p>
      {/if}
    </li>
  {/if}
  {#if newTask.deadline}
    <li class="q">
      <span>○</span>
      <p in:typewriter>What project does the task include?</p>
    </li>
    <li class="d">
      <span>{isNewProject ? `newProject` : `project`}</span>
      {#if !newTask.project}
        <Input
          bind:value={projectValue}
          on:submit={onProjectSet}
          placeholder="required" />
      {:else}
        <p>{newTask.project}</p>
      {/if}
    </li>
  {/if}
  {#if newProject.name}
    <li class="q">
      <span>○</span>
      <p in:typewriter>How do you describe this project?</p>
    </li>
    <li class="d">
      <span>desc</span>
      {#if !newProject.desc}
        <Input
          bind:value={descValue}
          on:submit={onDescSet}
          placeholder="required" />
      {:else}
        <p>{newProject.desc}</p>
      {/if}
    </li>
  {/if}
  {#if newProject.desc}
    <li class="q">
      <span>○</span>
      <p in:typewriter>Want to add notes to a project?</p>
    </li>
    <li class="d">
      <span>note</span>
      {#if !newProject.note}
        <Input
          bind:value={noteValue}
          on:submit={onNoteSet}
          placeholder="empty" />
      {:else}
        <p>{newProject.note}</p>
      {/if}
    </li>
  {/if}
  {#if (newTask.project && !isNewProject) || newProject.note}
    <li class="q">
      <span>○</span>
      <p in:typewriter>Save?</p>
    </li>
    <li class="d">
      <span>fin</span>
      <Input
        bind:value={saveValue}
        on:submit={onSave}
        placeholder="[y]es or [n]o" />
    </li>
  {/if}
  {#if error}
    <li class="error">
      <span>⍭</span>
      <p in:typewriter>{error}</p>
    </li>
  {/if}
  {#if isSucces}
    {#if isNewProject}
      <li class="q">
        <span>⍜</span>
        <p in:typewriter>{`Project created! ID: ${newProject._id}`}</p>
      </li>
    {/if}
    <li class="q">
      <span>⍜</span>
      <p in:typewriter>{`Task created! ID: ${newTask._id}`}</p>
    </li>
  {/if}
  {#if helpers.length}
    <li>
      <span>⍉</span>
      <ul class="helpers">
        {#each helpers as help (help.name)}
          <li animate:flip={{ duration: 200 }}>
            <span>{help.name}</span>
            ~ {help.desc}
          </li>
        {/each}
      </ul>
    </li>
  {/if}
</ul>
