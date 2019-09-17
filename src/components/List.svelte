<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Model
  let listHeight;
  export let data;
  export let currentIndex;

  $: console.log(currentIndex);

  // Lifecycle
  afterUpdate(() => {
    window.scrollTo({
      top: currentIndex * (listHeight / data.length),
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
    margin-bottom: 5px;
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
  {#each data as item, i (item._id)}
    <li class:active={i === currentIndex}>{item.name}</li>
  {/each}
</ul>
