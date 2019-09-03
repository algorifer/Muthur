<script>
  // Svelte
  import { fade } from "svelte/transition";

  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { controlError } from "../stores/control";
</script>

<style>
  p {
    width: 100%;
    margin: 0;
    margin-top: 10px;
    padding: 5px;
    font-size: 14px;
    text-transform: uppercase;
    text-align: center;
    color: var(--bg-color);
    background: var(--error-color);
    border-radius: 5px;
  }
</style>

{#if $controlError}
  <p in:typewriter>{$controlError}</p>
{/if}
