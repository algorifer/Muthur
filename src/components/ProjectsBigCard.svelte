<script>
  import db from "../data";

  export let name;
  export let desc;
  export let create;

  $: tasksCount = db.tasks.reduce(
    (count, task) => (task.project === name ? count + 1 : count),
    0
  );

  $: logTime = db.tracker.reduce(
    (time, log) => (log.project === name ? time + log.time : time),
    0
  );

  $: logCount = db.tracker.reduce(
    (count, log) => (log.project === name ? count + 1 : count),
    0
  );

  $: lastLog = db.tracker.filter(log =>
    log.project === name ? true : false
  )[0].date;
</script>

<style>
  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40px;
  }

  article {
    flex-basis: 50%;
    padding: 20px;
    background: var(--bg-color);
  }

  h3 {
    margin: 0;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 16px;
  }

  h3::after {
    content: "°";
    padding-left: 2px;
    font-weight: bold;
    font-size: 16px;
    line-height: 14px;
    transition: color 0.2s;
  }

  p {
    padding: 10px 0 0;
    font-size: 14px;
    border-top: 1px solid var(--alt-bg-color);
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-basis: 50%;
    margin-left: 20px;
    padding: 10px 0;
    font-size: 14px;
  }

  .tasks {
    flex-basis: 20%;
    margin-right: 10px;
  }

  .date {
    margin: 0 auto;
  }

  .logs {
    flex-basis: 30%;
    margin-left: 10px;
    text-align: right;
  }
</style>

<li>
  <article>
    <h3>{name}</h3>
    <p>{desc}</p>
  </article>
  <div class="meta">
    <span class="tasks">tasks {tasksCount}</span>
    <span class="date">{create} - {lastLog}</span>
    <span class="logs">{logTime}h ~ {logCount} logs</span>
  </div>
</li>
