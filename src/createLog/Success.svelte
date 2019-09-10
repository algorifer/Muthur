<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Model
  export let log;
  export let type;
  export let division;
  export let task;
  export let project;
  export let isSuccess;
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
  {#if project._id}
    <li class="request">
      <span>⍜</span>
      <p in:typewriter>{`Project created! ID: ${project._id}`}</p>
    </li>
  {/if}
  {#if type._id}
    <li class="request">
      <span>⍜</span>
      <p in:typewriter>{`Type created! ID: ${type._id}`}</p>
    </li>
  {/if}
  {#if division._id}
    <li class="request">
      <span>⍜</span>
      <p in:typewriter>{`Division created! ID: ${division._id}`}</p>
    </li>
  {/if}
  {#if task._id}
    <li class="request">
      <span>⍜</span>
      <p in:typewriter>{`Task created! ID: ${task._id}`}</p>
    </li>
  {/if}
  <li class="request">
    <span>⍜</span>
    <p in:typewriter>{`Log created! ID: ${log._id}`}</p>
  </li>
{/if}
