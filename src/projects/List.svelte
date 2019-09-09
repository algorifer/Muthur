<script>
  // Model
  export let projects;
  export let currentIndex;
</script>

<style>
  ul {
    width: 40%;
    flex-shrink: 0;
    margin: 0;
    margin-right: 40px;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    margin-bottom: 5px;
    transition: transform 0.2s;
  }

  .active {
    transform: translateX(12px);
  }

  .active::before {
    content: "◉";
    position: absolute;
    left: -12px;
    color: var(--f_inv);
  }
</style>

<ul>
  {#each projects as project, i (project.id)}
    <li class={i === currentIndex ? `active` : ``}>{project.name}</li>
  {/each}
</ul>
