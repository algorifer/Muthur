<script>
  // Components
  import CreateField from "../create/Field.svelte";

  // Model
  let value = ``;
  export let obj;
  export let msgError;

  // Update
  const setDesc = () => {
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    msgError = false;
    obj.desc = value;
  };
</script>

<CreateField
  name="desc"
  prop={obj.desc}
  bind:value
  on:submit={setDesc}
  request="How do you describe?"
  placeholder="required" />
