<script>
  // Svelte
  import { fly } from "svelte/transition";

  // Utils
  import typewriter from "../helpers/typewriter";
  const { DateTime } = require("luxon");

  // Components
  import Input from "./Input.svelte";

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
    color: var(--f_med);
  }

  p {
    margin: 0;
    padding: 5px 20px;
    border-left: 1px solid var(--f_low);
  }

  .request p {
    color: var(--f_inv);
  }
</style>

{#if !prop}
  <li class="request" out:fly={{ x: 50, duration: 200 }}>
    <span>○</span>
    <p in:typewriter>{request}</p>
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
