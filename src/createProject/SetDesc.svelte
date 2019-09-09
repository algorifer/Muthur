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
  const setDesc = () => {
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    msgError = false;
    project.desc = value;
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
  <p in:typewriter>How do you describe this project?</p>
</li>
<li>
  <span>desc</span>
  {#if !project.desc}
    <Input bind:value on:submit={setDesc} placeholder="required" />
  {:else}
    <p>{project.desc}</p>
  {/if}
</li>
