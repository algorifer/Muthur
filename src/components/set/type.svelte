<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbTypes } from "../../stores/db";

  // Components
  import CreateHelper from "../create/Helper.svelte";
  import CreateField from "../create/Field.svelte";

  // Model
  let value = ``;
  let types = [];
  export let obj;
  export let type;
  export let msgError;

  $: helpers = types.filter(
    t =>
      !t.name.toLowerCase().indexOf(value.toLowerCase()) &&
      t.name.toLowerCase() !== value.toLowerCase()
  );

  // Lifecycle
  onMount(() => {
    $dbTypes
      .find()
      .exec()
      .then(res => {
        types = res.map(r => ({ name: r.name, desc: r.desc }));
      })
      .catch(err => console.log(err));
  });

  // Update
  const setType = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    const findTypes = types.filter(
      t => t.name.toLowerCase() === value.toLowerCase()
    );
    if (!findTypes.length) {
      type.name = value;
      obj.type = value;
    } else {
      obj.type = findTypes[0].name;
    }
  };

  const help = () => {
    if (helpers.length) {
      value = helpers[0].name;
    }
  };
</script>

<CreateField
  name={type.name ? `newType` : `type`}
  prop={obj.type}
  bind:value
  on:submit={setType}
  on:help={help}
  request="Which type?"
  placeholder="required" />
{#if !obj.type}
  <CreateHelper {helpers} isTab={true} />
{/if}
