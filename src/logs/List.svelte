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
      top: currentIndex * (listHeight / logs.length),
      left: 0,
      behavior: "smooth"
    });
  });
</script>

<style>
  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: 20px;
  }

  .active .meta {
    border-color: var(--f_inv);
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
    border-bottom: 1px solid var(--b_high);
  }

  .time {
    font-weight: bold;
    margin-right: 10px;
  }

  .date {
    font-style: italic;
  }

  .project {
    font-weight: bold;
    margin-left: auto;
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
