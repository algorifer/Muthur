<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbTerms, dbLogs } from "../../stores/db";
  import { viewMode, viewPage } from "../../stores/muthur";

  // Components
  import Holder from "../../components/Holder.svelte";
  import LastDays from "../../components/LastDays.svelte";
  import Help from "../../components/Help.svelte";
  import List from "../../components/List.svelte";
  import Info from "./Info.svelte";

  // Model
  let terms = false;
  let currentIndex = -1;
  let logs = [];

  $: currentTerm = terms[currentIndex];

  // Lifecycle
  onMount(() => {
    $dbTerms
      .find()
      .then(res => {
        terms = res;
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
        if (currentIndex < terms.length - 1) {
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
        $dbTerms.remove({ _id: currentTerm._id }).then(() =>
          $dbTerms
            .find()
            .then(res => {
              terms = res;
            })
            .catch(err => console.log(err))
        );
        break;
      case `Enter`:
        if (currentTerm.name) {
          e.preventDefault();
          viewMode.set(`termSingle`);
          viewPage.set(currentTerm._id);
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
  {#if terms.length}
    <List {currentIndex} data={terms} />
  {:else if terms}
    <Holder />
  {/if}
  {#if currentTerm}
    <Info {currentTerm} {logs} />
  {:else}
    <Help />
  {/if}
</main>
<LastDays {logs} prop="term" active={currentTerm ? currentTerm.name : false} />
