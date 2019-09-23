<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  import impotrData from "../../utils/import";

  // Stores
  import { dbUser } from "../../stores/db";
  import { viewMode } from "../../stores/muthur";

  // Components
  import Title from "./Title.svelte";
  import InitMenu from "./Menu.svelte";
  import Import from "./Import.svelte";
  import Back from "./Back.svelte";

  // Model
  let user = null;
  let isCreate = false;
  let importRes = null;

  $: if (importRes && importRes !== `error`) {
    isCreate = false;
    const importTimeout = setTimeout(() => {
      viewMode.set(`tasks`);
      clearTimeout(importTimeout);
    }, 1500);
  } else if (importRes === `error`) {
    isCreate = true;
  }

  // Lifecycle
  onMount(() => {
    $dbUser
      .find()
      .then(res => (user = res[0]))
      .catch(err => console.log(err));

    const checkTimeout = setTimeout(() => {
      if (user) {
        viewMode.set(`tasks`);
        return;
      }
      isCreate = true;
    }, 3500);
  });

  // Update
  const toNewUser = () => {
    viewMode.set(`createUser`);
  };

  const toImport = () => {
    impotrData()
      .then(res => (importRes = res))
      .catch(err => console.log(err));
  };
</script>

<style>
  main {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    margin: 20px;
  }
</style>

<main>
  <div class="content">
    <Title />
    {#if isCreate}
      <InitMenu on:new={toNewUser} on:import={toImport} />
    {/if}
    <Import {importRes} />
  </div>
  <Back />
</main>
