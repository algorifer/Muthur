<script>
  export let name;
  export let project;
</script>

<style>
  li {
    padding: 10px 0 20px;
    padding: 20px;
    transition: background-color 0.2s;
    cursor: pointer;
  }

  li:hover {
    background: var(--hover-bg-color);
  }

  h3 {
    margin: 0;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 14px;
  }

  .meta {
    padding: 10px 0 0;
    font-size: 12px;
    border-top: 1px solid var(--alt-bg-color);
  }
</style>

<li>
  <h3>{name}</h3>
  <div class="meta">
    <button class="btn_link">{project}</button>
  </div>
</li>
