<script>
  // Model
  export let items;
  export let full;
</script>

<style>
  div {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 7px;
    padding-bottom: 1px;
    border-bottom: 1px solid var(--f_med);
  }

  span {
    height: 100%;
    margin: 0 1px;
    background: var(--f);
  }
</style>

<div>
  {#each items as item, i (i)}
    <span style={`width: ${item / (full / 100)}%`} />
  {/each}
</div>
