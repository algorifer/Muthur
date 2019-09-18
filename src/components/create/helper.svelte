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
    color: rgba(0, 0, 0, 0.6);
  }

  ul {
    margin: 0;
    width: 100%;
    padding: 10px 20px;
    font-style: italic;
    color: rgba(0, 0, 0, 0.6);
    border-left: 1px solid rgba(0, 0, 0, 0.6);
    overflow: hidden;
    white-space: nowrap;
  }

  ul span {
    width: auto;
    padding-right: 10px;
    color: #000;
  }
</style>

{#if helpers.length}
  <li>
    <span>⍉</span>
    <ul>
      {#each helpers as help (help.name)}
        <li animate:flip={{ duration: 200 }}>
          <span>{help.name}</span>
          {#if help.desc}~ {help.desc}{/if}
        </li>
      {/each}
    </ul>
  </li>
{/if}
