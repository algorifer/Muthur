<script>
  // Svelte
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Components
  import Input from "../create/Input.svelte";
  import Error from "../create/Error.svelte";

  // Model
  let value = ``;
  export let type;
  export let text;
  export let isEdit = false;
  export let isCurrent = false;
  export let msgError = false;

  $: if (isEdit) value = text;

  // Events
  const onChange = () =>
    dispatch(`change`, {
      type,
      value
    });
</script>

<style>
  section {
    padding: 5px 10px;
    transition: 0.2s;
    background: var(--bg);
  }

  h3 {
    margin: 0;
    font-size: inherit;
    font-weight: normal;
    text-transform: lowercase;
    color: var(--f_med);
  }

  p {
    margin: 10px 0;
    display: flex;
  }

  p::before {
    content: "> ";
    margin-right: 10px;
    color: var(--f_med);
  }

  .active {
    background: var(--f);
    color: var(--bg);
  }

  .active h3 {
    color: var(--bg);
  }
</style>

<section class:active={isCurrent && !isEdit}>
  <h3>{type}</h3>
  {#if isEdit}
    <Input bind:value on:submit={onChange} />
    {#if msgError}
      <Error {msgError} isEdit={true} />
    {/if}
  {:else}
    <p>{text}</p>
  {/if}
</section>
