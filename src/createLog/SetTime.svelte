<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Components
  import Input from "../components/Input.svelte";
  import CreateHelper from "../components/CreateHelper.svelte";

  // Model
  let value = ``;
  let helpers = [{ name: `integer or floating number`, desc: `format` }];
  export let log;
  export let msgError;

  // Update
  const setTime = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    if (parseFloat(value)) {
      log.time = value;
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

<li class="request">
  <span>○</span>
  <p in:typewriter>How many hours?</p>
</li>
<li>
  <span>time</span>
  {#if !log.time}
    <Input bind:value on:submit={setTime} placeholder="required" />
  {:else}
    <p>{log.time} {log.time === 1 ? `hour` : `hours`}</p>
  {/if}
</li>
{#if !log.time}
  <CreateHelper {helpers} />
{/if}
