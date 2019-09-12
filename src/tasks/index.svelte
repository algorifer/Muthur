<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbTasks } from "../stores/db";

  // Components
  import List from "./List.svelte";
  import Info from "./Info.svelte";
  import Holder from "./Holder.svelte";

  // Model
  let tasks = [];
  let currentIndex = -1;

  $: currentTask = tasks[currentIndex];

  // Lifecycle
  onMount(() => {
    $dbTasks
      .find()
      .exec()
      .then(res => {
        tasks = res;
      })
      .catch(err => console.log(err));
  });

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `ArrowDown`:
        e.preventDefault();
        if (currentIndex < tasks.length - 1) {
          currentIndex = currentIndex + 1;
        }
        break;
      case `ArrowUp`:
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex = currentIndex - 1;
        }
        break;
    }
  }
</script>

<style>
  main {
    display: flex;
    align-items: flex-start;
  }

  p {
    margin: 0 0 20px;
    text-transform: uppercase;
    color: var(--f_inv);
  }

  span {
    color: var(--f_med);
  }

  b {
    font-weight: normal;
    color: var(--f_high);
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

{#if !tasks.length}
  <p>○ Create your first task</p>
  <span>
    <b>cmd (ctrl)</b>
    +
    <b>t</b>
    for create task
  </span>
{:else}
  <main>
    <List
      {currentIndex}
      tasks={tasks.map(t => ({
        name: t.name,
        project: t.project,
        id: t._id
      }))} />
    {#if currentTask}
      <Info
        name={currentTask.name}
        deadline={currentTask.deadline}
        id={currentTask._id}
        project={currentTask.project} />
    {:else}
      <Holder />
    {/if}
  </main>
{/if}
