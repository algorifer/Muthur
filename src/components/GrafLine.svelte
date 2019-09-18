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
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  }

  span {
    height: 100%;
    margin: 0 1px;
    background: #000;
  }
</style>

<div>
  {#each items as item, i (i)}
    <span style={`width: ${item / (full / 100)}%`} />
  {/each}
</div>
