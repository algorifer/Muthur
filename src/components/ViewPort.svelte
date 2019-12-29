<script>
  // Utils
  import exportData from "../utils/export";

  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import Header from "./Header.svelte";
  import InitApp from "../pages/initApp/InitApp.svelte";
  import Terms from "../pages/terms/Terms.svelte";
  import Tasks from "../pages/tasks/Tasks.svelte";
  import Divisions from "../pages/divisions/Divisions.svelte";
  import Types from "../pages/types/Types.svelte";
  import Logs from "../pages/logs/Logs.svelte";
  import CreateTerm from "../pages/creators/Term.svelte";
  import CreateTask from "../pages/creators/Task.svelte";
  import CreateLog from "../pages/creators/Log.svelte";
  import CreateUser from "../pages/creators/User.svelte";
  import TermSingle from "../pages/termSingle/TermSingle.svelte";

  // HotKeys
  function onWindowKeydown(e) {
    switch (e.key) {
      case `ArrowLeft`:
        if (!e.shiftKey) {
          switch ($viewMode) {
            case `tasks`:
              viewMode.set(`logs`);
              break;
            case `terms`:
              viewMode.set(`tasks`);
              break;
            case `divisions`:
              viewMode.set(`terms`);
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
              viewMode.set(`terms`);
              break;
            case `terms`:
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

{#if $viewMode === `init`}
  <InitApp />
{:else if $viewMode === `terms`}
  <Header />
  <Terms />
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
{:else if $viewMode === `createUser`}
  <CreateUser />
{:else if $viewMode === `createTerm`}
  <CreateTerm />
{:else if $viewMode === `createTask`}
  <CreateTask />
{:else if $viewMode === `createLog`}
  <CreateLog />
{:else if $viewMode === `termSingle`}
  <TermSingle />
{/if}
