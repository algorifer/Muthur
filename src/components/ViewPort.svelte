<script>
  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import Header from "./Header.svelte";
  import Projects from "../projects/index.svelte";
  import Tasks from "../tasks/index.svelte";
  import CreateProject from "../createProject/index.svelte";
  import CreateTask from "../createTask/index.svelte";

  // HotKeys
  function onWindowKeydown(e) {
    switch (e.key) {
      case `p`:
        if (e.metaKey || e.ctrlKey) {
          viewMode.set(`createProject`);
        }
        break;
      case `t`:
        if (e.metaKey || e.ctrlKey) {
          viewMode.set(`createTask`);
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
{:else if $viewMode === `createProject`}
  <CreateProject />
{:else if $viewMode === `createTask`}
  <CreateTask />
{/if}
