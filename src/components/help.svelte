<script>
  // Stores
  import { viewMode } from "../stores/muthur";

  // Components
  import InfoWrapper from "./InfoWrapper.svelte";
</script>

<style>
  p {
    margin: 0 0px 15px;
    color: var(--f_med);
  }

  b {
    display: inline-block;
    min-width: 16px;
    padding: 2px;
    font-weight: normal;
    text-align: center;
    color: var(--f);
    background: var(--bg);
    border-radius: 3px;
    box-shadow: 1px 3px 0 var(--f);
  }
</style>

<InfoWrapper title="help">
  {#if $viewMode === `terms`}
    <p>
      <b>Enter</b>
      edit term
    </p>
  {/if}
  <p>
    <b>↑</b>
    or
    <b>↓</b>
    switch items
  </p>
  <p>
    <b>←</b>
    or
    <b>→</b>
    switch menu
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>t</b>
    create task
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>p</b>
    create term
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>l</b>
    create log
  </p>
  <p>
    <b>Backspace</b>
    del item
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>Enter</b>
    start / stop timer
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>s</b>
    export data
  </p>
</InfoWrapper>
