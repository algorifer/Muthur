<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { dbProjects } from "../stores/db";
  import { viewMode } from "../stores/muthur";

  // Components
  import Input from "../elements/Input.svelte";

  // State
  let newProject = {},
    nameValue = ``,
    descValue = ``,
    noteValue = ``,
    saveValue = ``,
    error = null,
    isSucces = false;

  $: if (isSucces) {
    const saveTimeout = setTimeout(() => {
      viewMode.set(`projects`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Events
  const onNameSet = () => {
    if (!nameValue.length) {
      error = `required field`;
      return;
    }
    error = null;
    newProject.name = nameValue;
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
        $dbProjects
          .insert(newProject)
          .then(res => {
            newProject = res;
            isSucces = true;
          })
          .catch(err => (error = err));
        break;
      case `no`:
      case `n`:
        viewMode.set(`projects`);
        break;
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
</style>

<svelte:window on:keydown={onWindowKeydown} />

<header>
  <span>{`<esc> back`}</span>
  <h1>Add Project</h1>
</header>
<ul>
  <li class="q">
    <span>○</span>
    <p in:typewriter>What is the name of the project?</p>
  </li>
  <li class="d">
    <span>name</span>
    {#if !newProject.name}
      <Input
        bind:value={nameValue}
        on:submit={onNameSet}
        placeholder="required" />
    {:else}
      <p>{newProject.name}</p>
    {/if}
  </li>
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
  {#if newProject.note}
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
    <li class="q">
      <span>⍜</span>
      <p in:typewriter>{`Project created! ID: ${newProject._id}`}</p>
    </li>
  {/if}
</ul>
