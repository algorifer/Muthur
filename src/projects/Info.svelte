<script>
  // Svelte
  import { beforeUpdate } from "svelte";

  // Stores
  import { dbTasks } from "../stores/db";

  // Components
  import Stat from "./Stat.svelte";

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

  .id {
    margin-top: 20px;
    color: var(--f_med);
  }
</style>

<article>
  <p>{desc}</p>
  <Stat {name} />
  <p class="id">{`⍠ ${id}`}</p>
</article>
