<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Model
  let listHeight;
  export let tasks;
  export let currentIndex;

  // Lifecycle
  afterUpdate(() => {
    window.scrollTo({
      top: currentIndex * (listHeight / tasks.length),
      left: 0,
      behavior: "smooth"
    });
  });
</script>

<style>
  ul {
    width: 40%;
    flex-shrink: 0;
    margin: 0;
    margin-right: 40px;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    margin-bottom: 10px;
    transition: transform 0.2s;
  }

  .active {
    transform: translateX(12px);
  }

  .active::before {
    content: "◉";
    position: absolute;
    left: -12px;
    color: var(--f_inv);
  }
</style>

<ul bind:clientHeight={listHeight}>
  {#each tasks as task, i (task.id)}
    <li class={i === currentIndex ? `active` : ``}>{task.name}</li>
  {/each}
</ul>
