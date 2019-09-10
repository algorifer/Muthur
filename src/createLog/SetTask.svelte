<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { dbTasks } from "../stores/db";

  // Components
  import Input from "../components/Input.svelte";
  import CreateHelper from "../components/CreateHelper.svelte";

  // Model
  let value = ``;
  let tasks = [];
  export let log;
  export let task;
  export let msgError;
  export let isTaskNew;

  $: helpers = tasks.filter(
    t =>
      !t.name.toLowerCase().indexOf(value.toLowerCase()) &&
      t.name.toLowerCase() !== value.toLowerCase()
  );

  // Lifecycle
  onMount(() => {
    $dbTasks
      .find({ project: log.project })
      .exec()
      .then(res => {
        tasks = res.map(r => ({ name: r.name }));
      })
      .catch(err => console.log(err));
  });

  // Update
  const setTask = () => {
    msgError = false;
    if (!value.length) {
      log.task = `none`;
      return;
    }
    const findTasks = tasks.filter(
      t => t.name.toLowerCase() === value.toLowerCase()
    );
    if (!findTasks.length) {
      isTaskNew = true;
      task.name = value;
      task.project = log.project;
      log.task = value;
    } else {
      log.task = findTasks[0].name;
    }
  };

  const help = () => {
    if (helpers.length) {
      value = helpers[0].name;
    }
  };
</script>

<style>
  li {
    display: flex;
    align-items: baseline;
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: var(--f_med);
  }

  p {
    margin: 0;
    padding: 5px 20px;
    border-left: 1px solid var(--f_low);
  }

  .request p {
    color: var(--f_inv);
  }
</style>

<li class="request">
  <span>○</span>
  <p in:typewriter>Which task?</p>
</li>
<li>
  <span>task</span>
  {#if !log.task}
    <Input bind:value on:submit={setTask} on:help={help} placeholder="none" />
  {:else}
    <p>{log.task}</p>
  {/if}
</li>
{#if !log.task}
  <CreateHelper {helpers} />
{/if}
