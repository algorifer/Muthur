<script>
  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { viewMode } from "../stores/muthur";
  import { startTime, stopTime, time } from "../stores/timer";

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Enter`:
        if (e.metaKey || e.ctrlKey) {
          if ($startTime) {
            stopTime.set(DateTime.local());
            viewMode.set(`createLog`);
          } else {
            startTime.set(DateTime.local());
          }
        }
    }
  }
</script>

<style>
  .desc {
    color: var(--f_med);
  }

  .active {
    color: var(--error);
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<div>
  <span class="desc">TIMER:</span>
  {#if $time !== false}
    <span class="active">{$time} hours</span>
  {:else}
    <span>STOP</span>
  {/if}
</div>
