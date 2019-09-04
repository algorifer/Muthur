<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { projects } from "../stores/db";
  import { tasksCount, message } from "../stores/muthur";

  // Components
  import ProjectCard from "../components/ProjectCard.svelte";

  // State
  let projectsList;

  // Lifecycle
  onMount(() => {
    $projects
      .find()
      .exec()
      .then(res => {
        projectsList = res;
      })
      .catch(err => console.log(err));
    if (!$tasksCount) message.set(`You need to create the first task`);
  });
</script>

<style>
  ul {
    width: 100%;
    margin: 0 auto auto;
    padding: 0;
    list-style: none;
  }
</style>

{#if projectsList}
  <ul>
    {#each projectsList as project (project._id)}
      <ProjectCard {...project} />
    {/each}
  </ul>
{/if}
