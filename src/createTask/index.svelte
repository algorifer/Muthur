<script>
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
  const dateFormat = `2020-05-25T14:24`;
  let task = {};
  let project = {};
  let isProjectNew = false;
  let msgError = false;
  let isSuccess = false;

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
<ul>
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
