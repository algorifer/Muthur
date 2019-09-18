<script>
  // Components
  import InfoWrapper from "./infoWrapper.svelte";
</script>

<style>
  p {
    margin: 0 0px 15px;
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
</style>

<InfoWrapper title="help">
  <p>
    <b>↑</b>
    or
    <b>↓</b>
    for switch items
  </p>
  <p>
    <b>←</b>
    or
    <b>→</b>
    for switch menu
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>t</b>
    for create task
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>p</b>
    for create project
  </p>
  <p>
    <b>cmd (ctrl)</b>
    +
    <b>l</b>
    for create log
  </p>
</InfoWrapper>
