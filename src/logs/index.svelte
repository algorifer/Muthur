<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbLogs } from "../stores/db";

  // Components
  import List from "./List.svelte";
  import LastDays from "../components/LastDays.svelte";

  // Model
  let logs = [];
  let currentIndex = 0;

  // Lifecycle
  onMount(() => {
    $dbLogs
      .find()
      .exec()
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
        if (currentIndex < logs.length - 1) {
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
        $dbLogs.remove({ _id: logs[currentIndex]._id }).then(() =>
          $dbLogs
            .find()
            .then(res => {
              logs = res.sort(
                (a, b) => DateTime.fromISO(b.date) - DateTime.fromISO(a.date)
              );
            })
            .catch(err => console.log(err))
        );
    }
  }
</script>

<svelte:window on:keydown={onWindowKeydown} />

<main>
  <List {currentIndex} {logs} />
</main>
<LastDays {logs} />
