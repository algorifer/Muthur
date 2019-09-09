<script>
  // Svelte
  import { flip } from "svelte/animate";

  // Model
  export let helpers;
</script>

<style>
  li {
    display: flex;
    align-items: baseline;
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: var(--f_med);
  }

  ul {
    margin: 0;
    width: 100%;
    padding: 5px 20px;
    font-style: italic;
    color: var(--f_med);
    border-left: 1px solid var(--f_low);
    overflow: hidden;
    white-space: nowrap;
  }

  ul span {
    width: auto;
    padding-right: 10px;
    color: var(--f_high);
  }
</style>

{#if helpers.length}
  <li>
    <span>⍉</span>
    <ul>
      {#each helpers as help (help.name)}
        <li animate:flip={{ duration: 200 }}>
          <span>{help.name}</span>
          ~ {help.desc}
        </li>
      {/each}
    </ul>
  </li>
{/if}
