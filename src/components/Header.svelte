<script>
  // Store
  import { viewMode } from "../stores/muthur";
</script>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    height: 50px;
    align-items: center;
    padding: 14px 20px;
    background: var(--bg);
    border-bottom: 1px solid var(--f_med);
  }

  h1 {
    margin: 0;
    font-size: inherit;
    line-height: 1;
    color: var(--f);
  }

  nav {
    width: 100%;
    margin-left: 20px;
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
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
</style>

<header>
  <h1>MU°TH°UR</h1>
  <nav>
    <ul>
      <li>
        <button class={$viewMode === `tasks` ? `active` : ``}>Tasks</button>
      </li>
      <li>
        <button class={$viewMode === `projects` ? `active` : ``}>
          Projects
        </button>
      </li>
      <li>
        <button class={$viewMode === `divisions` ? `active` : ``}>
          Divisions
        </button>
      </li>
      <li>
        <button class={$viewMode === `types` ? `active` : ``}>Types</button>
      </li>
      <li>
        <button class={$viewMode === `logs` ? `active` : ``}>Logs</button>
      </li>
      <!-- <li>
        <button class={$viewMode === `journal` ? `active` : ``}>Journal</button>
      </li> -->
    </ul>
  </nav>
</header>
