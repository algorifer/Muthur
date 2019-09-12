<script>
  // Components
  import StatLine from "../components/StatLine.svelte";
  import StatDate from "../components/StatDate.svelte";

  // Stores
  import { dbLogs } from "../stores/db";

  // Model
  export let name;
  let logs = null;

  $: $dbLogs
    .find({ task: name })
    .then(res => {
      logs = res;
    })
    .catch(err => console.log(err));

  $: logsCount = logs ? logs.length : null;

  $: time = logs
    ? logs.reduce((hours, item) => {
        return hours + parseFloat(item.time);
      }, 0)
    : null;
</script>

<style>
  li {
    padding: 0;
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .section {
    margin-bottom: 15px;
  }

  .name {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 5px;
  }
</style>

<ul>
  {#if time && logsCount}
    <li class="section">
      <ul>
        <li class="name">
          <span>{time}h / {logsCount} logs</span>
        </li>
      </ul>
    </li>
  {/if}
  <StatDate {logs} />
  <StatLine {logs} selector="division" />
  <StatLine {logs} selector="type" />
</ul>
