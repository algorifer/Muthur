<script>
  // Stores
  import { dbTasks } from "../stores/db";

  // Model
  export let name;
  export let desc;
  export let id;
  let tasksCount = null;

  // Update
  $: {
    $dbTasks
      .count({ project: name })
      .then(res => (tasksCount = res))
      .catch(err => console.log(err));
  }
</script>

<style>
  article {
    width: 100%;
    padding: 0 20px;
    border-left: 1px solid var(--f_low);
  }

  p {
    margin: 0;
    margin-bottom: 10px;
  }

  span {
    font-style: italic;
    text-transform: uppercase;
    color: var(--f_med);
  }

  .id {
    color: var(--f_med);
  }
</style>

<article>
  <p>{desc}</p>
  {#if tasksCount}
    <p>
      <span>tasks:</span>
      {tasksCount}
    </p>
  {/if}
  <p class="id">{`⍠ ${id}`}</p>
</article>
