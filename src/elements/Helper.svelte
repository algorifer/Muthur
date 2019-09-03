<script>
  // Svelte
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  // Stores
  import { controlHelpers } from "../stores/control";
</script>

<style>
  ul {
    width: 100%;
    margin: 0;
    margin-top: 10px;
    padding: 5px 20px;
    font-size: 14px;
    list-style: none;
    background: var(--hover-bg-color);
    color: var(--alt-text-color);
    border-radius: 5px;
  }

  span {
    color: var(--text-color);
  }
</style>

{#if $controlHelpers.length}
  <ul in:fade={{ duration: 200 }}>
    {#each $controlHelpers as help (help.letters)}
      <li animate:flip={{ duration: 200 }}>
        <span>{help.letters}</span>
        ~ {help.desc}
      </li>
    {/each}
  </ul>
{/if}
