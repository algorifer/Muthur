<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Model
  export let isSuccess;
  export let project;
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
    border-left: 1px solid var(--f_low);
    color: var(--f_inv);
  }
</style>

{#if isSuccess}
  <li>
    <span>⍜</span>
    <p in:typewriter>{`Project created! ID: ${project._id}`}</p>
  </li>
{/if}
