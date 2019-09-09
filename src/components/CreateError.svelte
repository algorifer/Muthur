<script>
  // Utils
  import typewriter from "../helpers/typewriter";

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
    padding: 5px 20px;
    color: var(--b_inv);
    border-left: 1px solid var(--f_low);
  }
</style>

{#if msgError}
  <li>
    <span>⍭</span>
    <p in:typewriter>{msgError}</p>
  </li>
{/if}
