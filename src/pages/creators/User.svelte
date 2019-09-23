<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Utils
  import { divisions, types } from "../../utils/defaults";

  // Stores
  import { dbDivisions, dbTypes } from "../../stores/db";
  import { viewMode } from "../../stores/muthur";

  // Components
  import CreateHeader from "../../components/create/Header.svelte";
  import CreateHolder from "../../components/create/Holder.svelte";
  import CreateError from "../../components/create/Error.svelte";
  import CreateSuccess from "../../components/create/Success.svelte";
  import CreateSave from "../../components/create/Save.svelte";
  import SetName from "../../components/set/Name.svelte";
  import SetDesc from "../../components/set/Desc.svelte";

  // Model
  let list;
  let user = {};
  let msgError = false;

  $: isSuccess = user._id ? true : false;

  // Lifecycle
  afterUpdate(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, list.scrollHeight + 200);
      clearTimeout(scrollTimeout);
    }, 100);
  });

  // Method
  const createDefaults = () => {
    $dbDivisions
      .insert(divisions)
      .then()
      .catch(err => console.log(err));
    $dbTypes
      .insert(types)
      .then()
      .catch(err => console.log(err));
  };

  // Update
  $: if (isSuccess) {
    createDefaults();
    const saveTimeout = setTimeout(() => {
      viewMode.set(`tasks`);
      clearTimeout(saveTimeout);
    }, 1500);
  }

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`init`);
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

<CreateHeader title="Create User" />
<ul bind:this={list}>
  <SetName bind:obj={user} bind:msgError />
  {#if user.name}
    <SetDesc bind:obj={user} bind:msgError />
  {:else}
    <CreateHolder name="desc" />
  {/if}
  {#if user.desc}
    <CreateSave bind:user bind:msgError />
  {:else}
    <CreateHolder name="save" />
  {/if}
  <CreateError {msgError} />
  <CreateSuccess {user} {isSuccess} />
</ul>
