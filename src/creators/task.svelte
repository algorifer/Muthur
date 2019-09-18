<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import CreateHeader from "../components/create/header.svelte";
  import CreateError from "../components/create/error.svelte";
  import CreateSuccess from "../components/create/success.svelte";
  import CreateSave from "../components/create/save.svelte";
  import SetName from "../components/set/name.svelte";
  import SetProject from "../components/set/project.svelte";
  import SetDesc from "../components/set/desc.svelte";
  import SetNote from "../components/set/note.svelte";

  // Model
  let list;
  let task = {};
  let project = {};
  let msgError = false;

  // Lifecycle
  afterUpdate(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, list.scrollHeight + 200);
      clearTimeout(scrollTimeout);
    }, 100);
  });

  // Updates
  $: isSuccess = task._id && (!projects.name || project._id);

  $: if (isSuccess) {
    const saveTimeout = setTimeout(() => {
      viewMode.set(`tasks`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`tasks`);
        break;
    }
  }
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<CreateHeader title="Add Task" />
<ul bind:this={list}>
  <SetName bind:obj={task} bind:msgError />
  {#if task.deadline}
    <SetProject bind:obj={task} bind:project bind:msgError />
  {/if}
  {#if project.name}
    <SetDesc bind:obj={project} bind:msgError />
  {/if}
  {#if project.desc}
    <SetNote bind:obj={project} bind:msgError />
  {/if}
  {#if (task.project && !project.name) || project.note}
    <CreateSave bind:task bind:project bind:msgError />
  {/if}
  <CreateError {msgError} />
  <CreateSuccess {isSuccess} {task} {project} />
</ul>
