<script>
  // Components
  import GrafLine from "./GrafLine.svelte";

  // Model
  export let logs;
  export let selector;

  $: time = logs
    ? logs.reduce((hours, item) => {
        return hours + parseFloat(item.time);
      }, 0)
    : null;

  $: items = logs
    ? logs
        .reduce((arr, item) => {
          if (arr.indexOf(item[selector]) < 0) {
            return [...arr, item[selector]];
          }
          return arr;
        }, [])
        .map(item => ({
          name: item,
          time: logs.reduce((hours, log) => {
            if (log[selector] === item) {
              return hours + parseFloat(log.time);
            }
            return hours;
          }, 0)
        }))
    : [];
</script>

<style>
  li {
    padding: 0;
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .section {
    margin-bottom: 15px;
  }

  .name {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 5px;
  }
</style>

{#if items}
  <li class="section">
    <ul>
      {#each items as item (item.name)}
        <li class="name">
          <span>{item.name}</span>
          <span>{item.time}h</span>
        </li>
      {/each}
    </ul>
    <GrafLine items={items.map(item => item.time)} full={time} />
  </li>
{/if}
