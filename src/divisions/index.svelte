<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbDivisions, dbLogs } from "../stores/db";

  // Components
  import LastDays from "../components/LastDays.svelte";
  import Help from "../components/help.svelte";
  import List from "../components/List.svelte";
  import Info from "./info.svelte";

  // Model
  let divisions = [];
  let currentIndex = -1;
  let logs = [];

  $: currentDivision = divisions[currentIndex];

  // Lifecycle
  onMount(() => {
    $dbDivisions
      .find()
      .then(res => {
        divisions = res;
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
        if (currentIndex < divisions.length - 1) {
          currentIndex = currentIndex + 1;
        }
        break;
      case `ArrowUp`:
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex = currentIndex - 1;
        }
        break;
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
  <List data={divisions} {currentIndex} />
  {#if currentDivision}
    <Info {currentDivision} {logs} />
  {:else}
    <Help />
  {/if}
</main>
<LastDays
  {logs}
  prop="division"
  active={currentDivision ? currentDivision.name : false} />
