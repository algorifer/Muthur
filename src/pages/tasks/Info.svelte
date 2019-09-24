<script>
  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbLogs } from "../../stores/db";

  // Components
  import InfoWrapper from "../../components/InfoWrapper.svelte";
  import StatCount from "../../components/StatCount.svelte";
  import StatLine from "../../components/StatLine.svelte";
  import StatDate from "../../components/StatDate.svelte";

  // Model
  export let currentTask;
  export let logs;
  let selectLogs = [];

  $: $dbLogs
    .find({ task: currentTask.name })
    .then(res => {
      selectLogs = res;
    })
    .catch(err => console.log(err));
</script>

<style>
  li {
    padding: 0;
    margin-bottom: 15px;
  }

  .proj {
    font-style: italic;
    text-transform: uppercase;
    color: var(--f_med);
  }
</style>

<InfoWrapper title={currentTask._id}>
  <li>
    <span class="proj">term:</span>
    {currentTask.term}
  </li>
  {#if selectLogs.length}
    <StatCount {selectLogs} {logs} />
    <StatDate {selectLogs} />
    <StatLine {selectLogs} selector="division" />
    <StatLine {selectLogs} selector="type" />
  {/if}
</InfoWrapper>
