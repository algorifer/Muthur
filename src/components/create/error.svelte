<script>
  // Utils
  import typewriter from "../../utils/typewriter";

  // Model
  export let msgError;
</script>

<style>
  li {
    display: flex;
    align-items: baseline;
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: var(--f_med);
  }

  p {
    margin: 0;
    padding: 10px 20px;
    color: var(--error);
    border-left: 1px solid var(--f_med);
  }
</style>

{#if msgError}
  <li>
    <span>⍭</span>
    <p in:typewriter>{msgError}</p>
  </li>
{/if}
