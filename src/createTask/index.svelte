<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import CreateHeader from "../components/CreateHeader.svelte";
  import CreateError from "../components/CreateError.svelte";
  import SetTask from "./SetTask.svelte";
  import SetDeadline from "./SetDeadline.svelte";
  import SetProject from "./SetProject.svelte";
  import SetDesc from "../createProject/SetDesc.svelte";
  import SetNote from "../createProject/SetNote.svelte";
  import Save from "./Save.svelte";
  import Success from "./Success.svelte";

  // Model
  let list;
  let task = {};
  let project = {};
  let isProjectNew = false;
  let msgError = false;

  // Lifecycle
  afterUpdate(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, list.scrollHeight + 200);
      clearTimeout(scrollTimeout);
    }, 100);
  });

  // Updates
  $: isSuccess = task._id && (!isProjectNew || project._id);

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
        viewMode.set(`projects`);
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
  <SetTask bind:task bind:msgError />
  {#if task.name}
    <SetDeadline bind:task bind:msgError />
  {/if}
  {#if task.deadline}
    <SetProject bind:task bind:project bind:msgError bind:isProjectNew />
  {/if}
  {#if project.name}
    <SetDesc bind:project bind:msgError />
  {/if}
  {#if project.desc}
    <SetNote bind:project bind:msgError />
  {/if}
  {#if (task.project && !isProjectNew) || project.note}
    <Save bind:task bind:project {isProjectNew} bind:msgError bind:isSuccess />
  {/if}
  <CreateError {msgError} />
  <Success {isSuccess} {isProjectNew} {task} {project} />
</ul>
