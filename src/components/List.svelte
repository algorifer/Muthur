<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Model
  let listHeight;
  export let data;
  export let currentIndex;

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
    padding: 20px;
    list-style: none;
  }

  li {
    position: relative;
    display: flex;
    padding: 5px;
    transition: 0.1s;
  }

  .active {
    color: #fff;
    background: #000;
  }

  .active::before {
    content: "◉";
    margin-right: 5px;
  }
</style>

<ul bind:clientHeight={listHeight}>
  {#each data as item, i (item._id)}
    <li class:active={i === currentIndex}>{item.name}</li>
  {/each}
</ul>
