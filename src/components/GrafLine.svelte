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
    height: 5px;
    background: var(--b_low);
  }

  span {
    height: 100%;
    margin: 0 1px;
    background: var(--b_high);
    border-radius: 5px;
  }

  .item--0 {
    background: var(--b_high);
  }

  .item--1 {
    background: var(--b_med);
  }
</style>

<div>
  {#each items as item, i (i)}
    <span class={`item--${i % 2}`} style={`width: ${item / (full / 100)}%`} />
  {/each}
</div>
