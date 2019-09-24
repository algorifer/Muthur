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
  import SetTerm from "../../components/set/Term.svelte";
  import SetDesc from "../../components/set/Desc.svelte";
  import SetNote from "../../components/set/Note.svelte";
  import SetType from "../../components/set/Type.svelte";
  import SetDivision from "../../components/set/Division.svelte";
  import SetTask from "../../components/set/Task.svelte";

  // Model
  let list;
  let log = {};
  let term = {};
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
    (!term.name || term._id) &&
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
    <SetTerm bind:obj={log} bind:term bind:msgError />
  {:else}
    <CreateHolder name="term" />
  {/if}
  {#if term.name}
    <SetDesc bind:obj={term} bind:msgError />
  {/if}
  {#if term.desc}
    <SetNote bind:obj={term} bind:msgError />
  {:else if term.name}
    <CreateHolder name="termNote" />
  {/if}
  {#if (log.term && !term.name) || term.note}
    <SetDivision bind:obj={log} bind:division bind:msgError />
  {:else}
    <CreateHolder name="division" />
  {/if}
  {#if division.name}
    <SetDesc bind:obj={division} bind:msgError />
  {/if}
  {#if (log.division && !division.name) || division.desc}
    <SetType bind:obj={log} bind:type bind:msgError />
  {:else}
    <CreateHolder name="type" />
  {/if}
  {#if type.name}
    <SetDesc bind:obj={type} bind:msgError />
  {/if}
  {#if (log.type && !type.name) || type.desc}
    <SetTask bind:obj={log} bind:task bind:msgError />
  {:else}
    <CreateHolder name="task" />
  {/if}
  {#if log.task}
    <CreateSave
      bind:log
      bind:term
      bind:type
      bind:division
      bind:task
      bind:msgError />
  {:else}
    <CreateHolder name="save" />
  {/if}
  <CreateSuccess {log} {term} {type} {division} {task} {isSuccess} />
  <CreateError {msgError} />
</ul>
