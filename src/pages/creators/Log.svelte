<script>
  // Svelte
  import { afterUpdate, onMount, onDestroy } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { viewMode } from "../../stores/muthur";
  import { startTime, stopTime } from "../../stores/timer";

  // Components
  import CreateHeader from "../../components/create/Header.svelte";
  import CreateHolder from "../../components/create/Holder.svelte";
  import CreateError from "../../components/create/Error.svelte";
  import CreateSuccess from "../../components/create/Success.svelte";
  import CreateSave from "../../components/create/Save.svelte";
  import SetDate from "../../components/set/Date.svelte";
  import SetTime from "../../components/set/Time.svelte";
  import SetProject from "../../components/set/Project.svelte";
  import SetDesc from "../../components/set/Desc.svelte";
  import SetNote from "../../components/set/Note.svelte";
  import SetType from "../../components/set/Type.svelte";
  import SetDivision from "../../components/set/Division.svelte";
  import SetTask from "../../components/set/Task.svelte";

  // Model
  let list;
  let log = {};
  let project = {};
  let type = {};
  let division = {};
  let task = {};
  let msgError = false;

  // Lifecycle
  onMount(() => {
    if ($startTime) {
      const diff = $stopTime.diff($startTime, ["hours", "minutes"]);
      log.date = $startTime.toISO();
      log.time = diff.hours + Math.ceil((diff.minutes / 60) * 10) / 10;
    }
  });

  afterUpdate(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, list.scrollHeight + 200);
      clearTimeout(scrollTimeout);
    }, 100);
  });

  onDestroy(() => {
    startTime.set(false);
    stopTime.set(false);
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

<CreateHeader title="Create Log" />
<ul bind:this={list}>
  <SetDate bind:obj={log} bind:msgError />
  {#if log.date}
    <SetTime bind:obj={log} bind:msgError />
  {:else}
    <CreateHolder name="time" />
  {/if}
  {#if log.time}
    <SetProject bind:obj={log} bind:project bind:msgError />
  {:else}
    <CreateHolder name="project" />
  {/if}
  {#if project.name}
    <SetDesc bind:obj={project} bind:msgError />
  {/if}
  {#if project.desc}
    <SetNote bind:obj={project} bind:msgError />
  {:else if project.name}
    <CreateHolder name="projectNote" />
  {/if}
  {#if (log.project && !project.name) || project.note}
    <SetType bind:obj={log} bind:type bind:msgError />
  {:else}
    <CreateHolder name="type" />
  {/if}
  {#if type.name}
    <SetDesc bind:obj={type} bind:msgError />
  {/if}
  {#if (log.type && !type.name) || type.desc}
    <SetDivision bind:obj={log} bind:division bind:msgError />
  {:else}
    <CreateHolder name="division" />
  {/if}
  {#if division.name}
    <SetDesc bind:obj={division} bind:msgError />
  {/if}
  {#if (log.division && !division.name) || division.desc}
    <SetTask bind:obj={log} bind:task bind:msgError />
  {:else}
    <CreateHolder name="task" />
  {/if}
  {#if log.task}
    <CreateSave
      bind:log
      bind:project
      bind:type
      bind:division
      bind:task
      bind:msgError />
  {:else}
    <CreateHolder name="save" />
  {/if}
  <CreateSuccess {log} {project} {type} {division} {task} {isSuccess} />
  <CreateError {msgError} />
</ul>
