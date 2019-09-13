<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import CreateHeader from "../components/CreateHeader.svelte";
  import CreateError from "../components/CreateError.svelte";
  import SetDate from "../components/SetDate.svelte";
  import SetTime from "../components/SetTime.svelte";
  import SetProject from "../components/SetProject.svelte";
  import SetDesc from "../components/SetDesc.svelte";
  import SetNote from "../components/SetNote.svelte";
  import SetType from "../components/SetType.svelte";
  import SetDivision from "../components/SetDivision.svelte";
  import SetTask from "../components/SetTask.svelte";
  import CreateSuccess from "../components/CreateSuccess.svelte";
  import CreateSave from "../components/CreateSave.svelte";

  // Model
  let list;
  let log = {};
  let project = {};
  let type = {};
  let division = {};
  let task = {};
  let msgError = false;

  // Lifecycle
  afterUpdate(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, list.scrollHeight + 200);
      clearTimeout(scrollTimeout);
    }, 100);
  });

  // Update
  $: isSuccess =
    log._id &&
    (!project.name || project._id) &&
    (!type.name || type._id) &&
    (!division.name || division._id) &&
    (!task.name || task._id);

  $: if (isSuccess) {
    const saveTimeout = setTimeout(() => {
      viewMode.set(`logs`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`logs`);
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

<CreateHeader title="Add Log" />
<ul bind:this={list}>
  <SetDate bind:obj={log} bind:msgError />
  {#if log.date}
    <SetTime bind:obj={log} bind:msgError />
  {/if}
  {#if log.time}
    <SetProject bind:obj={log} bind:project bind:msgError />
  {/if}
  {#if project.name}
    <SetDesc bind:obj={project} bind:msgError />
  {/if}
  {#if project.desc}
    <SetNote bind:obj={project} bind:msgError />
  {/if}
  {#if (log.project && !project.name) || project.note}
    <SetType bind:obj={log} bind:type bind:msgError />
  {/if}
  {#if type.name}
    <SetDesc bind:obj={type} bind:msgError />
  {/if}
  {#if (log.type && !type.name) || type.desc}
    <SetDivision bind:obj={log} bind:division bind:msgError />
  {/if}
  {#if division.name}
    <SetDesc bind:obj={division} bind:msgError />
  {/if}
  {#if (log.division && !division.name) || division.desc}
    <SetTask bind:obj={log} bind:task bind:msgError />
  {/if}
  {#if log.task}
    <CreateSave
      bind:log
      bind:project
      bind:type
      bind:division
      bind:task
      bind:msgError />
  {/if}
  <CreateSuccess {log} {project} {type} {division} {task} {isSuccess} />
  <CreateError {msgError} />
</ul>
