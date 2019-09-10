<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import CreateHeader from "../components/CreateHeader.svelte";
  import CreateError from "../components/CreateError.svelte";
  import SetDate from "./SetDate.svelte";
  import SetTime from "./SetTime.svelte";
  import SetProject from "../createTask/SetProject.svelte";
  import SetDesc from "../createProject/SetDesc.svelte";
  import SetNote from "../createProject/SetNote.svelte";
  import SetType from "./SetType.svelte";
  import SetTypeDesc from "./SetTypeDesc.svelte";
  import SetDivision from "./SetDivision.svelte";
  import SetDivisionDesc from "./SetDivisionDesc.svelte";
  import SetTask from "./SetTask.svelte";
  import SetDeadline from "../createTask/SetDeadline.svelte";
  import Save from "./Save.svelte";
  import Success from "./Success.svelte";

  // Model
  let list;
  let log = {};
  let isProjectNew = false;
  let project = {};
  let isTypeNew = false;
  let type = {};
  let isDivisionNew = false;
  let division = {};
  let isTaskNew = false;
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
    (!isProjectNew || project._id) &&
    (!isTypeNew || type._id) &&
    (!isDivisionNew || division._id) &&
    (!isTaskNew || task._id);

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
  <SetDate bind:log bind:msgError />
  {#if log.date}
    <SetTime bind:log bind:msgError />
  {/if}
  {#if log.time}
    <SetProject bind:log bind:project bind:msgError bind:isProjectNew />
  {/if}
  {#if project.name}
    <SetDesc bind:project bind:msgError />
  {/if}
  {#if project.desc}
    <SetNote bind:project bind:msgError />
  {/if}
  {#if (log.project && !isProjectNew) || project.note}
    <SetType bind:log bind:type bind:msgError bind:isTypeNew />
  {/if}
  {#if type.name}
    <SetTypeDesc bind:type bind:msgError />
  {/if}
  {#if (log.type && !isTypeNew) || type.desc}
    <SetDivision bind:log bind:division bind:msgError bind:isDivisionNew />
  {/if}
  {#if division.name}
    <SetDivisionDesc bind:division bind:msgError />
  {/if}
  {#if (log.division && !isDivisionNew) || division.desc}
    <SetTask bind:log bind:task bind:msgError bind:isTaskNew />
  {/if}
  {#if task.name}
    <SetDeadline bind:task bind:msgError />
  {/if}
  {#if (log.task && !isTaskNew) || task.deadline}
    <Save
      bind:log
      bind:project
      bind:type
      bind:division
      bind:task
      {isProjectNew}
      {isTypeNew}
      {isDivisionNew}
      {isTaskNew}
      bind:msgError />
  {/if}
  <Success {log} {project} {type} {division} {task} {isSuccess} />
  <CreateError {msgError} />
</ul>
