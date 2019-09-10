<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbProjects } from "../stores/db";

  // Components
  import List from "./List.svelte";
  import Info from "./Info.svelte";
  import Holder from "./Holder.svelte";

  // Model
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
    <List
      {currentIndex}
      projects={projects.map(p => ({ name: p.name, id: p._id }))} />
    {#if currentProject}
      <Info
        name={currentProject.name}
        desc={currentProject.desc}
        id={currentProject._id} />
    {:else}
      <Holder />
    {/if}
  </main>
{/if}
