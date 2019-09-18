<script>
  // Svelte
  import { afterUpdate } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Model
  let listHeight;
  export let logs;
  export let currentIndex;

  // Lifecycle
  afterUpdate(() => {
    window.scrollTo({
      top: currentIndex * (listHeight / logs.length) - 50,
      left: 0,
      behavior: "smooth"
    });
  });
</script>

<style>
  ul {
    width: 100%;
    margin: 0;
    padding: 20px;
    list-style: none;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-bottom: 1px dotted var(--f_dark);
  }

  .active {
    background: var(--f);
    color: var(--bg);
  }

  p {
    margin: 0;
    padding: 5px 0;
    display: flex;
    align-items: baseline;
  }

  .section {
    padding-bottom: 5px;
  }

  .meta {
    justify-content: space-between;
    padding: 5px 0;
    margin: 0;
    flex-grow: 2;
  }

  .time {
    width: 50px;
    flex-shrink: 0;
    font-weight: bold;
    margin-right: 10px;
  }

  .date {
    width: 100px;
    font-style: italic;
  }

  .project {
    font-weight: bold;
    margin: 0 auto 0 0;
  }
</style>

<ul bind:clientHeight={listHeight}>
  {#each logs as log, i (log._id)}
    <li class={i === currentIndex ? `active` : ``}>
      <p class="meta">
        <span class="time">{log.time}h</span>
        <span class="date">{DateTime.fromISO(log.date).toLocaleString()}</span>
        <span class="project">{log.project}</span>
      </p>
      <p class="section">{log.type} / {log.division}</p>
    </li>
  {/each}
</ul>
