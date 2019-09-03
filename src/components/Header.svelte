<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { message } from "../stores/app";

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
    margin: 0;
    padding: 0 0 20px;
    color: var(--f_inv);
  }

  h1 {
    margin: 0;
    font-size: 34px;
    line-height: 1.2;
  }

  p {
    margin: 10px 0 0;
    font-size: 16px;
  }
</style>

<header>
  <h1>MU°TH°UR</h1>
  {#if isMessage}
    <p in:typewriter>{$message}</p>
  {/if}
</header>
