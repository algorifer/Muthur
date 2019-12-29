<script>
  export let page;
  export let type;
</script>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: var(--bg);
    border-bottom: 1px solid var(--f_med);
  }

  span {
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

  ul {
    display: flex;
    margin: 0;
    margin-right: auto;
    padding: 0 20px;
    list-style: none;
  }

  button {
    margin: 0;
    padding: 2px 10px;
    font-family: inherit;
    font-size: inherit;
    line-height: 1;
    color: var(--f);
    opacity: 0.6;
    border: none;
    background: none;
    text-transform: uppercase;
  }

  .active {
    opacity: 1;
    background: var(--f);
    color: var(--bg);
  }

  .type {
    padding: 0;
    text-transform: uppercase;
    font-style: italic;
    color: var(--f);
  }

  .type::before {
    content: "○ ";
  }
</style>

<header>
  <span class="type">{type}</span>
  <ul>
    <li>
      <button class:active={page === `main`}>Main</button>
    </li>
    <li>
      <button class:active={page === `note`}>Note</button>
    </li>
    <!-- <li>
      <button class:active={page === `stat`}>Stat</button>
    </li> -->
  </ul>
  <span>
    <b>esc</b>
    back
  </span>
</header>
