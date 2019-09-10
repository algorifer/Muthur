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
    border-bottom: 1px solid var(--f_low);
    margin-bottom: 20px;
  }

  .active {
    border-color: var(--f_inv);
  }

  p {
    margin: 0;
    padding: 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .date_time {
    font-weight: bold;
    padding-bottom: 5px;
  }

  .meta {
    padding: 10px;
    margin: 0;
    background: var(--b_low);
  }

  .meta span {
    width: 33%;
  }

  .type {
    text-align: left;
  }

  .project {
    text-align: center;
    text-transform: uppercase;
  }

  .division {
    text-align: right;
  }
</style>

<ul bind:clientHeight={listHeight}>
  {#each logs as log, i (log._id)}
    <li class={i === currentIndex ? `active` : ``}>
      <p class="date_time">
        <span class="time">{log.time}h</span>
        <span>{DateTime.fromISO(log.date).toLocaleString()}</span>
      </p>
      <p class="meta">
        <span class="type">{log.type}</span>
        <span class="project">{log.project}</span>
        <span class="division">{log.division}</span>
      </p>
    </li>
  {/each}
</ul>
