<script>
  import db from "../data";
  import ProjectCard from "./ProjectCard.svelte";

  let tasks = db.tasks;
  let projects = db.projects;

  $: taskProjects = tasks.reduce(
    (newArr, task) =>
      newArr.indexOf(task.project) < 0 ? [...newArr, task.project] : newArr,
    []
  );
</script>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: flex-start;
    padding: 20px;
    flex-basis: 50%;
  }

  h2 {
    margin: 0 auto 40px 0;
    font-size: 20px;
    line-height: 1;
    text-transform: uppercase;
  }

  ul {
    width: 100%;
    margin: 0;
    padding: 0 0 20px;
    list-style: none;
  }

  button {
    font-size: 14px;
  }
</style>

<section>
  <h2>Active Projects</h2>
  <button class="btn_link">add new</button>
  <ul>
    {#each taskProjects as project}
      <ProjectCard name={project} />
    {/each}
  </ul>
</section>
