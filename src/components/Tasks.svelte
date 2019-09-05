<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbTasks } from "../stores/db";
  import { viewMode } from "../stores/muthur";

  // Components
  import TasksList from "../elements/TasksList.svelte";
  import TaskInfo from "../elements/TaskInfo.svelte";
  import TasksHolder from "../elements/TasksHolder.svelte";

  // State
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
        if (currentIndex < tasks.length - 1) {
          currentIndex = currentIndex + 1;
        }
        break;
      case `ArrowUp`:
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
    <TasksList
      {currentIndex}
      tasks={tasks.map(t => ({
        name: t.name,
        project: t.project,
        id: t._id
      }))} />
    {#if currentTask}
      <TaskInfo
        deadline={currentTask.deadline}
        id={currentTask._id}
        project={currentTask.project} />
    {:else}
      <TasksHolder />
    {/if}
  </main>
{/if}
