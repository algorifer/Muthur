<script>
  // Svelte
  import { beforeUpdate } from "svelte";

  // Stores
  import { dbTasks } from "../stores/db";

  // Model
  export let name;
  export let desc;
  export let id;
  let tasksCount = null;
  let allTaskCount = 0;

  $: taskPercent = tasksCount / (allTaskCount / 100);

  // Lifecycle
  beforeUpdate(() => {
    $dbTasks
      .count()
      .then(res => (allTaskCount = res))
      .catch(err => console.log(err));
    $dbTasks
      .count({ project: name })
      .then(res => (tasksCount = res))
      .catch(err => console.log(err));
  });
</script>

<style>
  article {
    position: fixed;
    top: 100px;
    right: 0;
    width: 50%;
    padding: 0 40px;
    border-left: 1px solid var(--f_low);
  }

  p {
    margin: 0;
    margin-bottom: 10px;
  }

  span {
    position: relative;
    z-index: 3;
    font-style: italic;
    text-transform: uppercase;
    color: var(--f_higt);
  }

  .id {
    color: var(--f_med);
  }

  .statistic {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 3px solid var(--b_med);
  }

  .task_line {
    position: absolute;
    bottom: -3px;
    left: 0;
    z-index: 1;
    display: block;
    height: 3px;
    background: var(--b_high);
  }
</style>

<article>
  <p>{desc}</p>
  {#if tasksCount}
    <p class="statistic task">
      <span class="task_line" style={`width: ${taskPercent}%`} />
      <span>tasks:</span>
      <span>{tasksCount}</span>
    </p>
  {/if}
  <p class="id">{`⍠ ${id}`}</p>
</article>
