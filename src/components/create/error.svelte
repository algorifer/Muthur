<script>
  // Utils
  import typewriter from "../../helpers/typewriter";

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
    color: rgba(0, 0, 0, 0.6);
  }

  p {
    margin: 0;
    padding: 10px 20px;
    color: var(--b_inv);
    border-left: 1px solid rgba(0, 0, 0, 0.6);
  }
</style>

{#if msgError}
  <li>
    <span>⍭</span>
    <p in:typewriter>{msgError}</p>
  </li>
{/if}
