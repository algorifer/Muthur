<script>
  // Model
  export let title;
</script>

<style>
  header {
    display: flex;
    align-items: baseline;
    margin-bottom: 40px;
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    font-style: italic;
    color: var(--f_med);
  }

  b {
    font-weight: normal;
    color: var(--f_high);
  }

  h1 {
    margin: 0;
    font-size: 14px;
    line-height: 1;
    text-transform: uppercase;
    color: var(--f_inv);
  }
</style>

<header>
  <span>
    <b>esc</b>
    back
  </span>
  <h1>{title}</h1>
</header>
