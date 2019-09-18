<script>
  // Components
  import InfoWrapper from "./infoWrapper.svelte";
</script>

<style>
  p {
    margin: 0 0px 15px;
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.6);
  }

  b {
    display: inline-block;
    min-width: 16px;
    padding: 2px;
    font-weight: normal;
    text-align: center;
    color: #000;
    background: var(--background);
    border-radius: 3px;
    box-shadow: 1px 3px 0 #000;
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
