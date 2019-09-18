<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import CreateHeader from "../components/create/header.svelte";
  import CreateError from "../components/create/error.svelte";
  import CreateSuccess from "../components/create/success.svelte";
  import CreateSave from "../components/create/save.svelte";
  import SetName from "../components/set/name.svelte";
  import SetDesc from "../components/set/desc.svelte";
  import SetNote from "../components/set/note.svelte";

  // Model
  let list;
  let project = {};
  let msgError = false;

  $: isSuccess = project._id ? true : false;

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
      viewMode.set(`projects`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`projects`);
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

<CreateHeader title="Add Project" />
<ul bind:this={list}>
  <SetName bind:obj={project} bind:msgError />
  {#if project.name}
    <SetDesc bind:obj={project} bind:msgError />
  {/if}
  {#if project.desc}
    <SetNote bind:obj={project} bind:msgError />
  {/if}
  {#if project.note}
    <CreateSave bind:project bind:msgError />
  {/if}
  <CreateError {msgError} />
  <CreateSuccess {project} />
</ul>
