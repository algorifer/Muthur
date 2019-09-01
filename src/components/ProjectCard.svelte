<script>
  import db from "../data";

  export let name;

  $: project = db.projects.filter(project => project.name === name)[0];

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
    margin-bottom: 30px;
    padding-left: 20px;
    border-left: 1px solid var(--alt-text-color);
    cursor: pointer;
    transition: border-color 0.2s;
  }

  li:hover {
    border-color: var(--accent-color);
  }

  h3 {
    margin: 0;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 14px;
  }

  h3::after {
    content: "°";
    padding-left: 2px;
    font-weight: bold;
    font-size: 16px;
    line-height: 14px;
    transition: color 0.2s;
  }

  li:hover h3::after {
    color: var(--accent-color);
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 10px;
    font-size: 12px;
    background: var(--hover-bg-color);
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
  <h3>{name}</h3>
  <div class="meta">
    <span class="tasks">tasks {tasksCount}</span>
    <span class="date">{project.create} - {lastLog}</span>
    <span class="logs">{logTime}h ~ {logCount} logs</span>
  </div>
</li>
