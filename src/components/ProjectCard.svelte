<script>
  // import db from "../data";
  // Utils
  import { DateTime } from "luxon";

  // State
  export let name;
  export let desc;
  export let date;

  // $: tasksCount = db.tasks.reduce(
  //   (count, task) => (task.project === name ? count + 1 : count),
  //   0
  // );

  // $: logTime = db.tracker.reduce(
  //   (time, log) => (log.project === name ? time + log.time : time),
  //   0
  // );

  // $: logCount = db.tracker.reduce(
  //   (count, log) => (log.project === name ? count + 1 : count),
  //   0
  // );

  // $: lastLog = db.tracker.filter(log =>
  //   log.project === name ? true : false
  // )[0].date;
</script>

<style>
  li {
    margin-bottom: 30px;
  }

  article {
    flex-basis: 50%;
    padding: 20px 0 0;
    background: var(--b_low);
  }

  h3 {
    margin: 0;
    margin-bottom: 10px;
    padding: 0 20px;
    font-weight: normal;
    font-size: 20px;
  }

  h3::after {
    content: "°";
    padding-left: 2px;
    font-size: 20px;
    line-height: 20px;
    color: var(--f_inv);
  }

  p {
    margin: 0;
    padding: 0 20px;
    font-size: 16px;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 20px;
    padding: 5px 20px;
    font-size: 14px;
    background: var(--b_med);
  }

  .tasks {
    flex-basis: 20%;
    margin-right: 10px;
  }

  .date {
    margin: 0 0 0 auto;
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
    <div class="meta">
      <!-- <span class="tasks">tasks {tasksCount}</span> -->
      <!-- <span class="date">{date} - {lastLog}</span> -->
      <span class="date">{DateTime.fromISO(date).toLocaleString()}</span>
      <!-- <span class="logs">{logTime}h ~ {logCount} logs</span> -->
    </div>
  </article>
</li>
