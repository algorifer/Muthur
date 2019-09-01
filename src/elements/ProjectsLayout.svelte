<script>
  import db from "../data";

  import ProjectsBigCard from "../components/ProjectsBigCard.svelte";
</script>

<style>
  main {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: flex-start;
    margin: 40px 20px;
  }

  h2 {
    margin: 0 auto 40px 0;
    font-size: 20px;
    line-height: 1;
    text-transform: uppercase;
  }

  button {
    font-size: 14px;
  }

  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<main>
  <h2>Projects</h2>
  <button class="btn_link">add new</button>
  <ul>
    {#each db.projects as project}
      <ProjectsBigCard {...project} />
    {/each}
  </ul>
</main>
