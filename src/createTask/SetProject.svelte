<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { dbProjects } from "../stores/db";

  // Components
  import Input from "../components/Input.svelte";
  import CreateHelper from "../components/CreateHelper.svelte";

  // Model
  let value = ``;
  let projects = [];
  export let task;
  export let project;
  export let msgError;
  export let isProjectNew;

  $: helpers = projects.filter(
    p =>
      !p.name.toLowerCase().indexOf(value.toLowerCase()) &&
      p.name.toLowerCase() !== value.toLowerCase()
  );

  // Lifecycle
  onMount(() => {
    $dbProjects
      .find()
      .exec()
      .then(res => {
        projects = res.map(r => ({ name: r.name, desc: r.desc }));
      })
      .catch(err => console.log(err));
  });

  // Update
  const setProject = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    const findProjects = projects.filter(
      p => p.name.toLowerCase() === value.toLowerCase()
    );
    if (!findProjects.length) {
      isProjectNew = true;
      project.name = value;
      task.project = value;
    } else {
      task.project = findProjects[0].name;
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
  <p in:typewriter>What project does the task include?</p>
</li>
<li>
  <span>{isProjectNew ? `newProject` : `project`}</span>
  {#if !task.project}
    <Input
      bind:value
      on:submit={setProject}
      on:help={help}
      placeholder="required" />
  {:else}
    <p>{task.project}</p>
  {/if}
</li>
<CreateHelper {helpers} />
