<script>
  // Utils
  import typewriter from "../helpers/typewriter";
  const { DateTime } = require("luxon");

  // Components
  import Input from "../components/Input.svelte";
  import CreateHelper from "../components/CreateHelper.svelte";

  // Model
  let value = ``;
  let helpers = [{ name: `2020-05-25T14:24`, desc: `format` }];
  export let task;
  export let msgError;

  // Update
  const setDeadline = () => {
    msgError = false;
    if (!value.length) {
      task.deadline = `none`;
      return;
    }
    const date = DateTime.fromISO(value);
    if (date.isValid) {
      task.deadline = date.toISO();
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
  <p in:typewriter>Does the task have a deadline?</p>
</li>
<li>
  <span>deadline</span>
  {#if !task.deadline}
    <Input bind:value on:submit={setDeadline} placeholder="none" />
  {:else}
    <p>
      {task.deadline === `none` ? `none` : DateTime.fromISO(task.deadline).toLocaleString()}
    </p>
  {/if}
</li>
<CreateHelper {helpers} />
