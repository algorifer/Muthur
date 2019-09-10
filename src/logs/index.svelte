<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbLogs } from "../stores/db";

  // Components
  import List from "./List.svelte";

  // Model
  let logs = [];
  let currentIndex = -1;

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

{#if !logs.length}
  <p>○ Create your first log</p>
  <span>
    <b>cmd (ctrl)</b>
    +
    <b>l</b>
    for create log
  </span>
{:else}
  <main>
    <List {currentIndex} {logs} />
    <!-- {#if currentProject}
      <Info
        name={currentProject.name}
        desc={currentProject.desc}
        id={currentProject._id} />
    {:else}
      <Holder />
    {/if} -->
  </main>
{/if}
