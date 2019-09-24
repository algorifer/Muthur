<script>
  // Svelte
  import { flip } from "svelte/animate";

  // Model
  export let helpers;
  export let isTab;
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
    padding: 10px 20px;
    font-style: italic;
    color: var(--f_med);
    border-left: 1px solid var(--f_med);
    overflow: hidden;
    white-space: nowrap;
  }

  ul span {
    width: auto;
    padding-right: 10px;
    color: var(--f);
  }

  b {
    display: inline-block;
    min-width: 16px;
    padding: 2px;
    font-weight: normal;
    text-align: center;
    color: var(--f);
    background: var(--bg);
    border-radius: 3px;
    box-shadow: 1px 3px 0 var(--f);
  }
</style>

{#if helpers.length}
  <li>
    <span>
      {#if isTab}
        <b>Tab</b>
      {:else}⍉{/if}
    </span>
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
