<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbDivisions, dbLogs } from "../stores/db";

  // Components
  import LastDays from "../components/LastDays.svelte";
  import List from "../components/List.svelte";

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

  p {
    margin: 0 0 20px;
    text-transform: uppercase;
    color: var(--f_inv);
  }

  span {
    color: var(--f_med);
  }

  b {
    font-weight: normal;
    color: var(--f_high);
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<LastDays
  {logs}
  prop="division"
  active={currentDivision ? currentDivision.name : false} />
<main>
  <List data={divisions} {currentIndex} />
</main>
