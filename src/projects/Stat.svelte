<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime, Interval } = require("luxon");

  // Components
  import DaysGraf from "./DaysGraf.svelte";

  // Stores
  import { dbLogs, dbTasks } from "../stores/db";

  // Model
  export let name;
  let logs = null;
  let allTaskCount = 0;
  let tasksCount = 0;

  $: $dbLogs
    .find({ project: name })
    .then(res => {
      logs = res;
    })
    .catch(err => console.log(err));

  $: $dbTasks
    .count({ project: name })
    .then(res => {
      tasksCount = res;
    })
    .catch(err => console.log(err));

  $: logsCount = logs ? logs.length : null;

  $: time = logs
    ? logs.reduce((hours, item) => {
        return hours + parseFloat(item.time);
      }, 0)
    : null;

  $: start = logs
    ? logs.reduce((time, log) => {
        const newTime = DateTime.fromISO(log.date);
        return time.toMillis() < newTime.toMillis() ? time : newTime;
      }, DateTime.fromISO(logs[0].date))
    : null;

  $: end = logs
    ? logs.reduce((time, log) => {
        const newTime = DateTime.fromISO(log.date);
        return time.toMillis() > newTime.toMillis() ? time : newTime;
      }, DateTime.fromISO(logs[0].date))
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

  // Lifecycle
  onMount(() => {
    $dbTasks
      .count()
      .then(res => (allTaskCount = res))
      .catch(err => console.log(err));
  });
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p {
    margin: 15px 0 5px;
    color: var(--f_med);
  }

  .names {
    margin-bottom: 5px;
  }

  .name {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
  }

  .graf {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 5px;
    background: var(--b_low);
  }

  .graf__item {
    height: 100%;
    border-right: 2px solid var(--b_low);
  }

  .graf__item:last-child {
    border: none;
  }

  .graf__item--1 {
    background: var(--stat_1);
  }

  .graf__item--2 {
    background: var(--stat_2);
  }

  .graf__item--3 {
    background: var(--stat_3);
  }
</style>

<ul>
  {#if start && end}
    <li class="section">
      <ul class="names">
        <li class="name">
          <span>{start.toLocaleString()}</span>
          <span>{end.toLocaleString()}</span>
        </li>
      </ul>
      <DaysGraf {start} {end} {logs} />
      {#if time && logsCount}
        <ul class="names">
          <li class="name">
            <span>{time}h / {logsCount} logs</span>
          </li>
        </ul>
      {/if}
    </li>
  {/if}
  {#if tasksCount}
    <li class="section">
      <p>tasks</p>
      <ul class="names">
        <li class="name">
          <span>project / all</span>
          <span>{tasksCount} / {allTaskCount}</span>
        </li>
      </ul>
      <div class="graf">
        <span
          class={`graf__item graf__item--1`}
          style={`width: ${tasksCount / (allTaskCount / 100)}%`} />
      </div>
    </li>
  {/if}
  {#if divisions}
    <li class="section">
      <p>divisions</p>
      <ul class="names">
        {#each divisions as division (division.name)}
          <li class="name">
            <span>{division.name}</span>
            <span>{division.time}h</span>
          </li>
        {/each}
      </ul>
      <div class="graf">
        {#each divisions as division, i (division.name)}
          <span
            class={`graf__item graf__item--${i + 1}`}
            style={`width: ${division.time / (time / 100)}%`} />
        {/each}
      </div>
    </li>
  {/if}
  {#if types}
    <li class="section">
      <p>types</p>
      <ul class="names">
        {#each types as type (type.name)}
          <li class="name">
            <span>{type.name}</span>
            <span>{type.time}h</span>
          </li>
        {/each}
      </ul>
      <div class="graf">
        {#each types as types, i (types.name)}
          <span
            class={`graf__item graf__item--${i + 1}`}
            style={`width: ${types.time / (time / 100)}%`} />
        {/each}
      </div>
    </li>
  {/if}
</ul>
