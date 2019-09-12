<script>
  // Svelte
  import { onMount } from "svelte";

  // Components
  import GrafLine from "./GrafLine.svelte";

  // Stores
  import { dbTasks } from "../stores/db";

  // Model
  let allCount = 0;
  let selectorCount = 0;
  export let selector;

  $: $dbTasks
    .count(selector)
    .then(res => {
      selectorCount = res;
    })
    .catch(err => console.log(err));

  // Lifecycle
  onMount(() => {
    $dbTasks
      .count()
      .then(res => (allCount = res))
      .catch(err => console.log(err));
  });
</script>

<style>
  li {
    padding: 0;
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .section {
    margin-bottom: 15px;
  }

  .name {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 5px;
  }
</style>

{#if selectorCount}
  <li class="section">
    <ul>
      <li class="name">
        <span>tasks / all</span>
        <span>{selectorCount} / {allCount}</span>
      </li>
    </ul>
    <GrafLine items={[selectorCount]} full={allCount} />
  </li>
{/if}
