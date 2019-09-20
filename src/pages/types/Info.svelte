<script>
  // Stores
  import { dbLogs } from "../../stores/db";

  // Components
  import InfoWrapper from "../../components/InfoWrapper.svelte";
  import StatCount from "../../components/StatCount.svelte";
  import StatDate from "../../components/StatDate.svelte";

  // Model
  export let currentType;
  export let logs;
  let selectLogs = [];

  $: $dbLogs
    .find({ type: currentType.name })
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
</style>

<InfoWrapper title={currentType._id}>
  <li>{currentType.desc}</li>
  {#if selectLogs.length}
    <StatCount {selectLogs} {logs} />
    <StatDate {selectLogs} />
  {/if}
</InfoWrapper>
