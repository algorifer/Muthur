<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbProjects } from "../stores/db";

  // Components
  import CreateHelper from "../components/CreateHelper.svelte";
  import CreateField from "../components/CreateField.svelte";

  // Model
  let value = ``;
  let projects = [];
  export let obj;
  export let project;
  export let msgError;

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
      project.name = value;
      obj.project = value;
    } else {
      obj.project = findProjects[0].name;
    }
  };

  const help = () => {
    if (helpers.length) {
      value = helpers[0].name;
    }
  };
</script>

<CreateField
  name={project.name ? `newProject` : `project`}
  prop={obj.project}
  bind:value
  on:submit={setProject}
  on:help={help}
  request="What project does it include?"
  placeholder="required" />
{#if !obj.project}
  <CreateHelper {helpers} />
{/if}
