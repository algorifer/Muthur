<script>
  // Store
  import { viewMode } from "../stores/muthur";

  // Components
  import Timer from "./Timer.svelte";
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
    white-space: nowrap;
  }

  nav {
    display: flex;
    justify-content: space-between;
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
  <h1>MU ○ TH ○ UR</h1>
  <nav>
    <ul>
      <li>
        <button class:active={$viewMode === `tasks`}>Tasks</button>
      </li>
      <li>
        <button class:active={$viewMode === `terms`}>Glossary</button>
      </li>
      <li>
        <button class:active={$viewMode === `divisions`}>Divisions</button>
      </li>
      <li>
        <button class:active={$viewMode === `types`}>Types</button>
      </li>
      <li>
        <button class:active={$viewMode === `logs`}>Logs</button>
      </li>
      <!-- <li>
        <button class:active={$viewMode === `journal`}>Journal</button>
      </li> -->
    </ul>
    <Timer />
  </nav>
</header>
