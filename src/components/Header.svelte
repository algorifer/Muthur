<script>
  // Store
  import { viewMode } from "../stores/muthur";
</script>

<style>
  header {
    display: flex;
    align-items: baseline;
    margin-bottom: 40px;
  }

  h1 {
    margin: 0;
    font-size: 14px;
    line-height: 1;
    color: var(--f_inv);
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

  li {
    margin-right: 10px;
  }

  button {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: 14px;
    line-height: 1;
    color: var(--f_med);
    border: none;
    background: none;
    transition: color 0.5s;
  }

  .active {
    color: var(--f_high);
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
      <li>
        <button class={$viewMode === `journal` ? `active` : ``}>Journal</button>
      </li>
    </ul>
  </nav>
</header>
