<script>
  // Svelte
  import { fly } from "svelte/transition";

  // Utils
  import typewriter from "../helpers/typewriter";
  const { DateTime } = require("luxon");

  // Components
  import Input from "../components/Input.svelte";
  import CreateHelper from "../components/CreateHelper.svelte";

  // Model
  let now = DateTime.local().toISODate();
  export let log;
  export let msgError;

  $: value = now;
  $: helpers = [{ name: now, desc: `format` }];

  // Update
  const setDate = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    const date = DateTime.fromISO(value);
    if (date.isValid) {
      log.date = date.toISO();
    } else {
      value = ``;
      msgError = `inValid format`;
    }
  };
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

{#if !log.date}
  <li class="request" out:fly={{ y: -20, duration: 200 }}>
    <span>○</span>
    <p in:typewriter>When?</p>
  </li>
{/if}
<li>
  <span>date</span>
  {#if !log.date}
    <Input bind:value on:submit={setDate} placeholder="required" />
  {:else}
    <p>{DateTime.fromISO(log.date).toLocaleString()}</p>
  {/if}
</li>
{#if !log.date}
  <CreateHelper {helpers} />
{/if}
