<script>
  // Utils
  import getHours from "../helpers/getHours";

  // Model
  export let logs = [];
  export let selectLogs = [];

  $: logsCount = selectLogs ? selectLogs.length : 0;

  $: time = selectLogs ? getHours(selectLogs) : 0;

  $: allTime = logs ? getHours(logs) : 0;
</script>

<style>
  li {
    margin-bottom: 20px;
  }
</style>

<li class="section">
  <span>{time}h / {logsCount} logs / {parseInt((time / allTime) * 100)}%</span>
</li>
