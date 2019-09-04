<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import {
    viewMode,
    projectsCount,
    newProject,
    newTask
  } from "../stores/muthur";
  import { projects } from "../stores/db";

  // Components
  import Header from "./Header.svelte";
  import Controls from "./Controls.svelte";
  import InitApp from "../layouts/InitApp.svelte";
  import NonProject from "../layouts/NonProject.svelte";
  import AddProject from "../layouts/AddProject.svelte";
  import AddTask from "../layouts/AddTask.svelte";
  import Projects from "../layouts/Projects.svelte";

  // State
  let isInit = false;

  // Lifecycle
  onMount(() => {
    const initTimeout = setTimeout(() => {
      isInit = true;
      clearTimeout(initTimeout);
    }, 6000);
    $projects.count().then(res => projectsCount.set(res));
  });
</script>

<!-- {#if isInit} -->
<Header />
{#if $viewMode === `AddProject`}
  <AddProject />
{:else if $viewMode === `AddTask`}
  <AddTask />
{:else if $projectsCount === 0}
  <NonProject />
{:else}
  <Projects />
{/if}
<Controls />
<!-- {:else}
  <InitApp />
{/if} -->
