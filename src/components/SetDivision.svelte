<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbDivisions } from "../stores/db";

  // Components
  import CreateHelper from "../components/CreateHelper.svelte";
  import CreateField from "../components/CreateField.svelte";

  // Model
  let value = ``;
  let divisions = [];
  export let obj;
  export let division;
  export let msgError;

  $: helpers = divisions.filter(
    d =>
      !d.name.toLowerCase().indexOf(value.toLowerCase()) &&
      d.name.toLowerCase() !== value.toLowerCase()
  );

  // Lifecycle
  onMount(() => {
    $dbDivisions
      .find()
      .exec()
      .then(res => {
        divisions = res.map(r => ({ name: r.name, desc: r.desc }));
      })
      .catch(err => console.log(err));
  });

  // Update
  const setDivision = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    const findDivisions = divisions.filter(
      d => d.name.toLowerCase() === value.toLowerCase()
    );
    if (!findDivisions.length) {
      division.name = value;
      obj.division = value;
    } else {
      obj.division = findDivisions[0].name;
    }
  };

  const help = () => {
    if (helpers.length) {
      value = helpers[0].name;
    }
  };
</script>

<CreateField
  name={division.name ? `newDivision` : `division`}
  prop={obj.division}
  bind:value
  on:submit={setDivision}
  on:help={help}
  request="Which division?"
  placeholder="required" />
{#if !obj.division}
  <CreateHelper {helpers} />
{/if}
