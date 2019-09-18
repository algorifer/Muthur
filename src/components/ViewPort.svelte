<script>
  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import Header from "./header.svelte";
  import Projects from "../projects/index.svelte";
  import Tasks from "../tasks/index.svelte";
  import Divisions from "../divisions/index.svelte";
  import Types from "../types/index.svelte";
  import Logs from "../logs/index.svelte";
  import CreateProject from "../creators/project.svelte";
  import CreateTask from "../creators/task.svelte";
  import CreateLog from "../creators/log.svelte";

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
        if (!e.shiftKey) {
          switch ($viewMode) {
            case `tasks`:
              viewMode.set(`logs`);
              break;
            case `projects`:
              viewMode.set(`tasks`);
              break;
            case `divisions`:
              viewMode.set(`projects`);
              break;
            case `types`:
              viewMode.set(`divisions`);
              break;
            case `logs`:
              viewMode.set(`types`);
              break;
          }
        }
        break;
      case `ArrowRight`:
        if (!e.shiftKey) {
          switch ($viewMode) {
            case `tasks`:
              viewMode.set(`projects`);
              break;
            case `projects`:
              viewMode.set(`divisions`);
              break;
            case `divisions`:
              viewMode.set(`types`);
              break;
            case `types`:
              viewMode.set(`logs`);
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
{:else if $viewMode === `divisions`}
  <Header />
  <Divisions />
{:else if $viewMode === `types`}
  <Header />
  <Types />
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
