<script>
  // Svelte
  import { fade } from "svelte/transition";

  // Libs
  import commands from "../libs/commands";

  // State
  export let input;
  export let selectedHelp = helpers[0];

  $: helpers =
    input.length !== 0
      ? commands.filter(command => command.letters.indexOf(input) === 0)
      : [];

  $: selectedHelp = helpers[0];
</script>

<style>
  ul {
    position: absolute;
    bottom: 100%;
    margin: 0;
    padding: 5px;
    font-size: 12px;
    list-style: none;
    background: var(--hover-bg-color);
    color: var(--alt-text-color);
    border-radius: 5px;
  }

  span {
    color: var(--text-color);
  }
</style>

{#if helpers.length !== 0}
  <ul transition:fade={{ duration: 200 }}>
    {#each helpers.reverse() as help}
      <li>
        <span>{help.letters}</span>
        ~ {help.desc}
      </li>
    {/each}
  </ul>
{/if}
