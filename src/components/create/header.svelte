<script>
  // Model
  export let title;
</script>

<style>
  header {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 10px;
    border-bottom: 1px solid var(--f_med);
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: var(--f_med);
  }

  b {
    display: inline-block;
    min-width: 16px;
    padding: 2px;
    font-weight: normal;
    text-align: center;
    color: var(--f);
    background: var(--bg);
    border-radius: 3px;
    box-shadow: 1px 3px 0 var(--f);
  }

  h1 {
    margin: 0;
    font-size: inherit;
    line-height: 1;
    text-transform: uppercase;
  }
</style>

<header>
  <span>
    <b>esc</b>
    back
  </span>
  <h1>{title}</h1>
</header>
