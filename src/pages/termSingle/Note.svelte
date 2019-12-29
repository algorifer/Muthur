<script>
  // Svelte
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Utils
  import birker from "../../utils/birker";

  // Components
  import Input from "../../components/create/Input.svelte";

  // Model
  let value = ``;
  export let note;
  export let editField = false;

  $: if (note) editField = false;

  // Events
  const onChange = () => {
    if (value.length === 0) value = `empty`;
    dispatch(`change`, { type: `note`, value });
  };

  function onWindowKeydown(e) {
    switch (e.key) {
      case `Enter`:
        if (!editField) {
          e.preventDefault();
          value = note;
          editField = true;
        }
        break;
    }
  }
</script>

<style>
  article {
    position: relative;
    z-index: 10;
    margin: 20px 0;
    padding: 10px 20px;
    background: var(--bg);
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<article class="formated">
  {#if editField}
    <Input bind:value on:submit={onChange} />
  {:else}
    {@html birker(note)}
  {/if}
</article>
