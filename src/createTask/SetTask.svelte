<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Components
  import Input from "../components/Input.svelte";

  // Model
  let value = ``;
  export let task;
  export let msgError;

  // Update
  const setTask = () => {
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    msgError = false;
    task.name = value;
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
  <p in:typewriter>What is the name of the task?</p>
</li>
<li>
  <span>task</span>
  {#if !task.name}
    <Input bind:value on:submit={setTask} placeholder="required" />
  {:else}
    <p>{task.name}</p>
  {/if}
</li>
