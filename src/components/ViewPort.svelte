<script>
  // Utils
  import exportData from "../utils/export";

  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import Header from "./Header.svelte";
  import InitApp from "../pages/initApp/InitApp.svelte";
  import Projects from "../pages/projects/Projects.svelte";
  import Tasks from "../pages/tasks/Tasks.svelte";
  import Divisions from "../pages/divisions/Divisions.svelte";
  import Types from "../pages/types/Types.svelte";
  import Logs from "../pages/logs/Logs.svelte";
  import CreateProject from "../pages/creators/Project.svelte";
  import CreateTask from "../pages/creators/Task.svelte";
  import CreateLog from "../pages/creators/Log.svelte";
  import CreateUser from "../pages/creators/User.svelte";
  import ProjectView from "../pages/projectView/ProjectView.svelte";

  // HotKeys
  function onWindowKeydown(e) {
    switch (e.key) {
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

{#if $viewMode === `init`}
  <InitApp />
{:else if $viewMode === `projects`}
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
{:else if $viewMode === `createUser`}
  <CreateUser />
{:else if $viewMode === `createProject`}
  <CreateProject />
{:else if $viewMode === `createTask`}
  <CreateTask />
{:else if $viewMode === `createLog`}
  <CreateLog />
{:else if $viewMode === `projectView`}
  <ProjectView />
{/if}
