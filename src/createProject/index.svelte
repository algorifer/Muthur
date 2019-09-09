<script>
  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import CreateHeader from "../components/CreateHeader.svelte";
  import CreateError from "../components/CreateError.svelte";
  import SetName from "./SetName.svelte";
  import SetDesc from "./SetDesc.svelte";
  import SetNote from "./SetNote.svelte";
  import Save from "./Save.svelte";
  import Success from "./Success.svelte";

  // Model
  let project = {},
    msgError = false,
    isSuccess = false;

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
<ul>
  <SetName bind:project bind:msgError />
  {#if project.name}
    <SetDesc bind:project bind:msgError />
  {/if}
  {#if project.desc}
    <SetNote bind:project bind:msgError />
  {/if}
  {#if project.note}
    <Save bind:project bind:msgError bind:isSuccess />
  {/if}
  <CreateError bind:msgError />
  <Success bind:project bind:isSuccess />
</ul>
