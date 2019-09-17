<script>
  // Components
  import CreateHelper from "../components/CreateHelper.svelte";
  import CreateField from "../components/CreateField.svelte";

  // Model
  let value = ``;
  let helpers = [{ name: `integer or floating number`, desc: `format` }];
  export let obj;
  export let msgError;

  // Update
  const setTime = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    if (parseFloat(value)) {
      obj.time = parseFloat(value);
    } else {
      value = ``;
      msgError = `inValid format`;
    }
  };
</script>

<CreateField
  name="time"
  prop={obj.time}
  bind:value
  on:submit={setTime}
  request="How many hours?"
  placeholder="required" />
{#if !obj.time}
  <CreateHelper {helpers} />
{/if}
