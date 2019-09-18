<script>
  // Svelte
  import { fade } from "svelte/transition";

  // Utils
  const { DateTime } = require("luxon");

  // Components
  import Input from "./input.svelte";

  // Model
  export let name;
  export let prop;
  export let value;
  export let request;
  export let placeholder;
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

  p {
    margin: 0;
    padding: 10px 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.6);
  }
</style>

{#if !prop}
  <li>
    <span>○</span>
    <p>{request}</p>
  </li>
{/if}
<li>
  <span>{name}</span>
  {#if !prop}
    <Input bind:value {placeholder} on:submit on:help />
  {:else}
    <p>
      {name === `time` ? `${prop} ${prop === 1 ? `hour` : `hours`}` : name === `date` ? `${DateTime.fromISO(prop).toLocaleString()}` : `${prop}`}
    </p>
  {/if}
</li>
