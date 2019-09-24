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
  import SetTerm from "../../components/set/Term.svelte";
  import SetDesc from "../../components/set/Desc.svelte";
  import SetNote from "../../components/set/Note.svelte";

  // Model
  let list;
  let task = {};
  let term = {};
  let msgError = false;

  // Lifecycle
  afterUpdate(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, list.scrollHeight + 200);
      clearTimeout(scrollTimeout);
    }, 100);
  });

  // Updates
  $: isSuccess = task._id && (!term.name || term._id);

  $: if (isSuccess) {
    const saveTimeout = setTimeout(() => {
      viewMode.set(`tasks`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`tasks`);
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

<CreateHeader title="Create Task" />
<ul bind:this={list}>
  <SetName bind:obj={task} bind:msgError />
  {#if task.name}
    <SetTerm bind:obj={task} bind:term bind:msgError />
  {:else}
    <CreateHolder name="term" />
  {/if}
  {#if term.name}
    <SetDesc bind:obj={term} bind:msgError />
  {/if}
  {#if term.desc}
    <SetNote bind:obj={term} bind:msgError />
  {:else if term.name}
    <CreateHolder name="termNote" />
  {/if}
  {#if (task.term && !term.name) || term.note}
    <CreateSave bind:task bind:term bind:msgError />
  {:else}
    <CreateHolder name="save" />
  {/if}
  <CreateError {msgError} />
  <CreateSuccess {isSuccess} {task} {term} />
</ul>
