<script>
  // Utils
  const { DateTime, Interval } = require("luxon");

  // Components
  import DaysGraf from "./DaysGraf.svelte";

  // Model
  export let selectLogs;

  $: start = selectLogs
    ? selectLogs.reduce((time, log) => {
        const newTime = DateTime.fromISO(log.date);
        return time.toMillis() < newTime.toMillis() ? time : newTime;
      }, DateTime.fromISO(selectLogs[0].date))
    : null;

  $: end = selectLogs
    ? selectLogs.reduce((time, log) => {
        const newTime = DateTime.fromISO(log.date);
        return time.toMillis() > newTime.toMillis() ? time : newTime;
      }, DateTime.fromISO(selectLogs[0].date))
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

{#if start && end}
  <li class="section">
    <ul>
      <li class="name">
        <span>{start.toLocaleString()}</span>
        <span>{end.toLocaleString()}</span>
      </li>
    </ul>
    <DaysGraf {start} {end} {selectLogs} />
  </li>
{/if}
