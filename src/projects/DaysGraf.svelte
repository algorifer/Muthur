<script>
  // Utils
  const { DateTime, Interval } = require("luxon");

  // Model
  export let start;
  export let end;
  export let logs;

  $: days =
    start && end
      ? new Array(Interval.fromDateTimes(start, end).length("days") + 1).fill(0)
      : [];

  $: active = days.map(
    (item, i) =>
      logs.filter(item => item.date === start.plus({ days: i }).toISO()).length
  );
</script>

<style>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5px;
    margin-bottom: 5px;
    background: var(--b_low);
  }

  span {
    height: 100%;
    border-right: 2px solid var(--b_low);
    flex-grow: 2;
  }

  span:last-child {
    border: none;
  }

  .active {
    background: var(--stat_1);
  }
</style>

<div>
  {#each active as day, i}
    <span class={day > 0 ? `active` : ``} />
  {/each}
</div>
