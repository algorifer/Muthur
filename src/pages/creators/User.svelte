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
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<CreateHeader title="Add User" noBack={true} />
<ul bind:this={list}>
  <SetName bind:obj={user} bind:msgError />
  {#if user.name}
    <SetDesc bind:obj={user} bind:msgError />
  {/if}
  {#if user.desc}
    <CreateSave bind:user bind:msgError />
  {/if}
  <CreateError {msgError} />
  <CreateSuccess {user} />
</ul>
