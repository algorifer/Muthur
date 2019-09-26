<script>
  // Utils
  const { DateTime, Interval } = require("luxon");

  // Model
  export let start;
  export let end;
  export let selectLogs;

  $: days =
    start && end
      ? new Array(
          parseInt(Interval.fromDateTimes(start, end).length("days")) + 1
        ).fill(0)
      : [];

  $: active = days.map(
    (item, i) =>
      selectLogs.filter(
        item =>
          DateTime.fromISO(item.date).toISODate() ===
          start.plus({ days: i }).toISODate()
      ).length
  );
</script>

<style>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 7px;
    margin-bottom: 5px;
    padding-bottom: 1px;
    border-bottom: 1px solid var(--f_med);
  }

  span {
    height: 100%;
    flex-grow: 2;
    margin: 0 1px;
  }

  span:last-child {
    border: none;
  }

  .active {
    background: var(--f);
  }
</style>

<div>
  {#each active as day, i}
    <span class={day > 0 ? `active` : ``} />
  {/each}
</div>
