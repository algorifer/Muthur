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
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: rgba(0, 0, 0, 0.6);
  }

  b {
    display: inline-block;
    min-width: 16px;
    padding: 2px;
    font-weight: normal;
    text-align: center;
    color: #000;
    background: var(--background);
    border-radius: 3px;
    box-shadow: 1px 3px 0 #000;
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
