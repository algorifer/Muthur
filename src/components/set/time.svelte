<script>
  // Components
  import CreateHelper from "../create/Helper.svelte";
  import CreateField from "../create/Field.svelte";

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
