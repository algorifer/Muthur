<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Components
  import Input from "../components/Input.svelte";

  // Model
  let value = ``;
  export let project;
  export let msgError;

  // Update
  const setName = () => {
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    msgError = false;
    project.name = value;
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
  <p in:typewriter>What is the name of the project?</p>
</li>
<li>
  <span>name</span>
  {#if !project.name}
    <Input bind:value on:submit={setName} placeholder="required" />
  {:else}
    <p>{project.name}</p>
  {/if}
</li>
