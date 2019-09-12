<script>
  // Stores
  import { dbLogs } from "../stores/db";

  // Model
  let logs = null;
  export let name;

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

  $: divisions = logs
    ? logs
        .reduce((arr, item) => {
          if (arr.indexOf(item.division) < 0) {
            return [...arr, item.division];
          }
          return arr;
        }, [])
        .map(item => ({
          name: item,
          time: logs.reduce((hours, log) => {
            if (log.division === item) {
              return hours + parseFloat(log.time);
            }
            return hours;
          }, 0)
        }))
    : [];

  $: types = logs
    ? logs
        .reduce((arr, item) => {
          if (arr.indexOf(item.type) < 0) {
            return [...arr, item.type];
          }
          return arr;
        }, [])
        .map(item => ({
          name: item,
          time: logs.reduce((hours, log) => {
            if (log.type === item) {
              return hours + parseFloat(log.time);
            }
            return hours;
          }, 0)
        }))
    : [];
</script>

<style>
  ul {
    margin: 10px 0;
    padding: 0;
    list-style: none;
  }

  p {
    color: var(--f_med);
    text-transform: uppercase;
    font-style: italic;
  }
</style>

<ul>
  {#if time && logsCount}
    <li>{time}h / {logsCount} logs</li>
  {/if}
  <p>Divisions:</p>
  {#if divisions}
    {#each divisions as division}
      <li>{division.name} / {division.time}h</li>
    {/each}
  {/if}
  <p>Types:</p>
  {#if types}
    {#each types as type}
      <li>{type.name} / {type.time}h</li>
    {/each}
  {/if}
</ul>
