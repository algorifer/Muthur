<script>
  // Utils
  const { DateTime } = require("luxon");

  // Models
  let daysCount = 90;
  let days = new Array(daysCount).fill({});
  let now = DateTime.local();
  export let logs;
  export let prop = false;
  export let active = false;

  $: daysLogs = logs
    ? days
        .map((day, i) =>
          logs.filter(
            log =>
              DateTime.fromISO(log.date).toISODate() ===
              now.minus({ days: i }).toISODate()
          )
        )
        .reverse()
    : [];

  $: data = prop ? getDataProp(daysLogs, prop) : getData(daysLogs);

  $: allTime = data.reduce(
    (all, day) => all + day.reduce((all, log) => all + log.time, 0),
    0
  );

  const getDataProp = (days, prop) => {
    const newData = [];
    days.forEach(day => {
      let newDay = [];
      day.forEach(log => {
        if (newDay.indexOf(log[prop]) < 0) {
          newDay.push(log[prop]);
        }
      });
      newDay = newDay.map(item => ({ name: item, time: 0 }));
      day.forEach(log =>
        newDay.forEach(item =>
          item.name === log[prop] ? (item.time = item.time + log.time) : null
        )
      );
      newData.push(newDay);
    });
    return newData;
  };

  const getData = days => {
    const newData = [];
    days.forEach(day => {
      const newDay = [{ time: 0 }];
      day.forEach(log => (newDay[0].time = newDay[0].time + log.time));
      newData.push(newDay);
    });
    return newData;
  };
</script>

<style>
  .graf {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    height: 72px;
    margin-bottom: 40px;
  }

  .day {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
    height: 100%;
    width: 100%;
    margin-right: 1px;
    padding: 1px 0 2px;
    background: var(--b_low);
  }

  .item {
    display: block;
    background: var(--b_med);
    margin-top: 1px;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  .item--active {
    background: var(--b_high);
  }

  .stat {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin: 0 0 10px;
  }
</style>

<section>
  <div class="stat">
    <p>{parseInt((allTime / daysCount) * 10) / 10} h/d</p>
    <p>{allTime} hours</p>
    <p>{daysCount} days</p>
  </div>
  <div class="graf">
    {#each data as day, i (i)}
      <div class="day">
        {#each day as log, i (i)}
          {#if prop}
            <span
              class={log.name === active ? 'item item--active' : 'item'}
              style={`height: ${log.time / (day.reduce((all, item) => all + item.time, 0) / 100)}%`} />
          {:else}
            <span
              class="item item--active"
              style={`height: ${log.time / (24 / 100)}%`} />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</section>
