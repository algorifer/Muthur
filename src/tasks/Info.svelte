<script>
  // Utils
  const { DateTime } = require("luxon");

  // Components
  import Stat from "./Stat.svelte";

  // Model
  export let name;
  export let project;
  export let deadline;
  export let id;
</script>

<style>
  article {
    position: fixed;
    top: 100px;
    right: 0;
    width: 50%;
    padding: 0 40px;
    border-left: 1px solid var(--f_low);
  }

  p {
    margin: 0;
    margin-bottom: 10px;
  }

  span {
    font-style: italic;
    text-transform: uppercase;
    color: var(--f_med);
  }

  .id {
    margin-top: 15px;
    color: var(--f_med);
  }
</style>

<article>
  <p>
    <span>project:</span>
    {project}
  </p>
  <p>
    <span>deadline:</span>
    {deadline === `none` ? `none` : DateTime.fromISO(deadline).toLocaleString()}
  </p>
  <Stat {name} />
  <p class="id">{`⍠ ${id}`}</p>
</article>
