<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Model
  export let isSuccess;
  export let isProjectNew;
  export let task;
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
  }

  .request p {
    color: var(--f_inv);
  }
</style>

{#if isSuccess}
  {#if isProjectNew}
    <li class="request">
      <span>⍜</span>
      <p in:typewriter>{`Project created! ID: ${project._id}`}</p>
    </li>
  {/if}
  <li class="request">
    <span>⍜</span>
    <p in:typewriter>{`Task created! ID: ${task._id}`}</p>
  </li>
{/if}
