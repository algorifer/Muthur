<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Stores
  import { viewMode } from "../../stores/muthur";

  // Components
  import CreateHeader from "../../components/create/Header.svelte";
  import CreateHolder from "../../components/create/Holder.svelte";
  import CreateError from "../../components/create/Error.svelte";
  import CreateSuccess from "../../components/create/Success.svelte";
  import CreateSave from "../../components/create/Save.svelte";
  import SetName from "../../components/set/Name.svelte";
  import SetDesc from "../../components/set/Desc.svelte";
  import SetNote from "../../components/set/Note.svelte";

  // Model
  let list;
  let term = {};
  let msgError = false;

  $: isSuccess = term._id ? true : false;

  // Lifecycle
  afterUpdate(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, list.scrollHeight + 200);
      clearTimeout(scrollTimeout);
    }, 100);
  });

  // Update
  $: if (isSuccess) {
    const saveTimeout = setTimeout(() => {
      viewMode.set(`terms`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`terms`);
        break;
    }
  }
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<CreateHeader title="Create Term" />
<ul bind:this={list}>
  <SetName bind:obj={term} bind:msgError />
  {#if term.name}
    <SetDesc bind:obj={term} bind:msgError />
  {:else}
    <CreateHolder name="desc" />
  {/if}
  {#if term.desc}
    <SetNote bind:obj={term} bind:msgError />
  {:else}
    <CreateHolder name="note" />
  {/if}
  {#if term.note}
    <CreateSave bind:term bind:msgError />
  {:else}
    <CreateHolder name="save" />
  {/if}
  <CreateError {msgError} />
  <CreateSuccess {term} {isSuccess} />
</ul>
