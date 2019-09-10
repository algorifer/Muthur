<script>
  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import Header from "./Header.svelte";
  import Projects from "../projects/index.svelte";
  import Tasks from "../tasks/index.svelte";
  import Logs from "../logs/index.svelte";
  import CreateProject from "../createProject/index.svelte";
  import CreateTask from "../createTask/index.svelte";
  import CreateLog from "../createLog/index.svelte";

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
      case `l`:
        if (e.metaKey || e.ctrlKey) {
          viewMode.set(`createLog`);
        }
        break;
      case `ArrowLeft`:
        if (e.shiftKey) {
          switch ($viewMode) {
            case `projects`:
              viewMode.set(`tasks`);
              break;
            case `tasks`:
              viewMode.set(`logs`);
              break;
            case `logs`:
              viewMode.set(`projects`);
              break;
          }
        }
        break;
      case `ArrowRight`:
        if (e.shiftKey) {
          switch ($viewMode) {
            case `projects`:
              viewMode.set(`logs`);
              break;
            case `tasks`:
              viewMode.set(`projects`);
              break;
            case `logs`:
              viewMode.set(`tasks`);
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
{:else if $viewMode === `logs`}
  <Header />
  <Logs />
{:else if $viewMode === `createProject`}
  <CreateProject />
{:else if $viewMode === `createTask`}
  <CreateTask />
{:else if $viewMode === `createLog`}
  <CreateLog />
{/if}
