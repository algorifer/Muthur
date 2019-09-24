<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbTypes, dbLogs } from "../../stores/db";

  // Components
  import Holder from "../../components/Holder.svelte";
  import LastDays from "../../components/LastDays.svelte";
  import Help from "../../components/Help.svelte";
  import List from "../../components/List.svelte";
  import Info from "./Info.svelte";

  // Model
  let types = false;
  let currentIndex = -1;
  let logs = [];

  $: currentType = types[currentIndex];

  // Lifecycle
  onMount(() => {
    $dbTypes
      .find()
      .then(res => {
        types = res;
      })
      .catch(err => console.log(err));
    $dbLogs
      .find()
      .then(res => {
        logs = res.sort(
          (a, b) => DateTime.fromISO(b.date) - DateTime.fromISO(a.date)
        );
      })
      .catch(err => console.log(err));
  });

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `ArrowDown`:
        e.preventDefault();
        if (currentIndex < types.length - 1) {
          currentIndex = currentIndex + 1;
        }
        break;
      case `ArrowUp`:
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex = currentIndex - 1;
        }
        break;
      case `Backspace`:
        e.preventDefault();
        $dbTypes.remove({ _id: currentType._id }).then(() =>
          $dbTypes
            .find()
            .then(res => {
              types = res;
            })
            .catch(err => console.log(err))
        );
    }
  }
</script>

<style>
  main {
    display: flex;
    align-items: flex-start;
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<main>
  {#if types.length}
    <List data={types} {currentIndex} />
  {:else if types}
    <Holder />
  {/if}
  {#if currentType}
    <Info {currentType} {logs} />
  {:else}
    <Help />
  {/if}
</main>
<LastDays {logs} prop="type" active={currentType ? currentType.name : false} />
