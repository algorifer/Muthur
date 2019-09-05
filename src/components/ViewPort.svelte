<script>
  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import Header from "./Header.svelte";
  import Projects from "./Projects.svelte";
  import Tasks from "./Tasks.svelte";
  import AddProject from "./AddProject.svelte";
  import AddTask from "./AddTask.svelte";

  // HotKeys
  function onWindowKeydown(e) {
    switch (e.key) {
      case `p`:
        if (e.metaKey || e.ctrlKey) {
          viewMode.set(`addProject`);
        }
        break;
      case `t`:
        if (e.metaKey || e.ctrlKey) {
          viewMode.set(`addTask`);
        }
        break;
      case `ArrowLeft`:
        if (e.shiftKey) {
          switch ($viewMode) {
            case `projects`:
              viewMode.set(`tasks`);
              break;
            case `tasks`:
              viewMode.set(`projects`);
              break;
          }
        }
        break;
      case `ArrowRight`:
        if (e.shiftKey) {
          switch ($viewMode) {
            case `projects`:
              viewMode.set(`tasks`);
              break;
            case `tasks`:
              viewMode.set(`projects`);
              break;
          }
        }
        break;
    }
  }
</script>

<svelte:window on:keydown={onWindowKeydown} />

{#if $viewMode === `projects`}
  <Header />
  <Projects />
{:else if $viewMode === `tasks`}
  <Header />
  <Tasks />
{:else if $viewMode === `addProject`}
  <AddProject />
{:else if $viewMode === `addTask`}
  <AddTask />
{/if}
