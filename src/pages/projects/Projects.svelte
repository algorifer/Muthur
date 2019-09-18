<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbProjects, dbLogs } from "../../stores/db";

  // Components
  import LastDays from "../../components/LastDays.svelte";
  import Help from "../../components/Help.svelte";
  import List from "../../components/List.svelte";
  import Info from "./Info.svelte";

  // Model
  let projects = [];
  let currentIndex = -1;
  let logs = [];

  $: currentProject = projects[currentIndex];

  // Lifecycle
  onMount(() => {
    $dbProjects
      .find()
      .then(res => {
        projects = res;
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
        if (currentIndex < projects.length - 1) {
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
        $dbProjects.remove({ _id: currentProject._id }).then(() =>
          $dbProjects
            .find()
            .then(res => {
              projects = res;
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
  <List {currentIndex} data={projects} />
  {#if currentProject}
    <Info {currentProject} {logs} />
  {:else}
    <Help />
  {/if}
</main>
<LastDays
  {logs}
  prop="project"
  active={currentProject ? currentProject.name : false} />
