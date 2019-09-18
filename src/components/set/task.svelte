<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbTasks } from "../../stores/db";

  // Components
  import CreateHelper from "../create/Helper.svelte";
  import CreateField from "../create/Field.svelte";

  // Model
  let value = ``;
  let tasks = [];
  export let obj;
  export let task;
  export let msgError;

  $: helpers = tasks.filter(
    t =>
      !t.name.toLowerCase().indexOf(value.toLowerCase()) &&
      t.name.toLowerCase() !== value.toLowerCase()
  );

  // Lifecycle
  onMount(() => {
    $dbTasks
      .find({ project: obj.project })
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
      obj.task = `none`;
      return;
    }
    const findTasks = tasks.filter(
      t => t.name.toLowerCase() === value.toLowerCase()
    );
    if (!findTasks.length) {
      task.name = value;
      task.project = obj.project;
      obj.task = value;
    } else {
      obj.task = findTasks[0].name;
    }
  };

  const help = () => {
    if (helpers.length) {
      value = helpers[0].name;
    }
  };
</script>

<CreateField
  name={task.name ? `newtask` : `task`}
  prop={obj.task}
  bind:value
  on:submit={setTask}
  on:help={help}
  request="Which task?"
  placeholder="required" />
{#if !obj.task}
  <CreateHelper {helpers} />
{/if}
