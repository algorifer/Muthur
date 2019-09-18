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
  section {
    position: sticky;
    bottom: 0;
    margin-top: auto;
    /* padding: 10px 0 0; */
    background: #eeefee;
    border-top: 1px solid rgba(0, 0, 0, 0.6);
  }

  .graf {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    height: 50px;
    margin: 0 0 10px;
    padding: 0 2px;
  }

  .day {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
    height: 100%;
    width: 100%;
    padding: 0px 1px;
    border-right: 1px solid rgba(0, 0, 0, 0.6);
  }

  .item {
    display: block;
    background: rgba(0, 0, 0, 0);
    transition: background-color 0.2s;
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  }

  .item:first-child {
    margin: 0;
  }

  .item--active {
    background: rgba(0, 0, 0, 1);
  }

  .stat {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }

  p {
    margin: 0 0 10px;
  }
</style>

<section>
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
  <div class="stat">
    <p>{parseInt((allTime / daysCount) * 10) / 10} h/d</p>
    <p>{allTime} hours</p>
    <p>{daysCount} days</p>
  </div>
</section>
