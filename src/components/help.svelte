<script>
  // Components
  import InfoWrapper from "./InfoWrapper.svelte";
</script>

<style>
  p {
    margin: 0 0px 15px;
    padding-left: 10px;
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

  .title {
    margin-bottom: 10px;
    padding-left: 0;
    text-transform: uppercase;
  }
</style>

<InfoWrapper title="help">
  <p class="title">> Navigation</p>
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
  <p class="title">> Create</p>
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
    create project
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>l</b>
    create log
  </p>
  <p class="title">> Delete</p>
  <p>
    <b>Backspace</b>
    del item
  </p>
</InfoWrapper>
