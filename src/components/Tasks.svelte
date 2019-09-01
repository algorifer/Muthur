<script>
  import db from "../data";
  import TaskCard from "./TaskCard.svelte";

  let tasks = db.tasks;
</script>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: flex-start;
    padding: 20px;
    /* flex-basis: 50%; */
  }

  h2 {
    margin: 0 auto 40px 0;
    font-size: 20px;
    line-height: 1;
    text-transform: uppercase;
  }

  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    background: var(--bg-color);
  }

  button {
    font-size: 14px;
  }
</style>

<section>
  <h2>Tasks</h2>
  <button class="btn_link">add new</button>
  <ul>
    {#each tasks as task (task.id)}
      <TaskCard {...task} />
    {/each}
  </ul>
</section>
