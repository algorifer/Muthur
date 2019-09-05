<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbProjects } from "../stores/db";
  import { viewMode } from "../stores/muthur";

  // Components
  import ProjectsList from "../elements/ProjectsList.svelte";
  import ProjectInfo from "../elements/ProjectInfo.svelte";
  import ProjectsHolder from "../elements/ProjectsHolder.svelte";

  // State
  let projects = [];
  let currentIndex = -1;

  $: currentProject = projects[currentIndex];

  // Lifecycle
  onMount(() => {
    $dbProjects
      .find()
      .exec()
      .then(res => {
        projects = res;
      })
      .catch(err => console.log(err));
  });

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `ArrowDown`:
        if (currentIndex < projects.length - 1) {
          currentIndex = currentIndex + 1;
        }
        break;
      case `ArrowUp`:
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

{#if !projects.length}
  <p>○ Create your first project</p>
  <span>
    <b>cmd (ctrl)</b>
    +
    <b>p</b>
    for create project
  </span>
{:else}
  <main>
    <ProjectsList
      {currentIndex}
      projects={projects.map(p => ({ name: p.name, id: p._id }))} />
    {#if currentProject}
      <ProjectInfo
        name={currentProject.name}
        desc={currentProject.desc}
        id={currentProject._id} />
    {:else}
      <ProjectsHolder />
    {/if}
  </main>
{/if}
