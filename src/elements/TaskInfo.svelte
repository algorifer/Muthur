<script>
  // Utils
  const { DateTime } = require("luxon");

  // State
  export let project;
  export let deadline;
  export let id;
</script>

<style>
  article {
    width: 100%;
    padding: 0 20px;
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
  <p class="id">{`⍠ ${id}`}</p>
</article>
