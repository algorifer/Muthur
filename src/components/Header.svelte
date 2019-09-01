<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { view, message } from "../stores/app";

  let isMessage = false;

  $: if ($message) {
    isMessage = false;
    const messageTimeout = window.setTimeout(() => {
      isMessage = true;
      clearTimeout(messageTimeout);
    }, 100);
  } else {
    isMessage = false;
  }
</script>

<style>
  header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: baseline;
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px solid var(--alt-text-color);
    color: var(--accent-color);
    background: var(--alt-bg-color);
  }

  h1 {
    margin: 0;
    font-weight: normal;
    font-size: 26px;
    line-height: 1;
  }

  span {
    margin: 0 10px;
  }

  p {
    margin: 0;
    /* font-size: 14px; */
    text-transform: uppercase;
  }
</style>

<header>
  <h1>MU°TH°UR</h1>
  <span>:</span>
  {#if isMessage}
    <p in:typewriter>{$message}</p>
  {/if}
</header>
