<script>
  // Components
  import CreateField from "../components/CreateField.svelte";

  // Model
  let value = ``;
  export let obj;
  export let msgError;

  // Update
  const setNote = () => {
    msgError = false;
    obj.note = value.length ? value : `empty`;
  };
</script>

<CreateField
  name="note"
  prop={obj.note}
  bind:value
  on:submit={setNote}
  request="Want to add notes?"
  placeholder="empty" />
