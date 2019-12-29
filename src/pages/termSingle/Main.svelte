<script>
  // Svelte
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Components
  import SingleField from "../../components/single/Field.svelte";

  // Model
  let currentFieldIndex = -1;
  let msgError = false;
  export let fields = [];
  export let editField = false;

  $: currentField = fields[currentFieldIndex]
    ? fields[currentFieldIndex].type
    : false;

  $: if (fields) {
    editField = false;
    msgError = false;
  }

  //Events
  function onCange(e) {
    const { type, value } = e.detail;
    if ((type === `name` || type === `desc`) && !value.length) {
      msgError = `required field`;
      return;
    }
    dispatch(`change`, { type, value });
  }

  function onWindowKeydown(e) {
    switch (e.key) {
      case `ArrowDown`:
        e.preventDefault();
        if (currentFieldIndex < fields.length - 1) {
          currentFieldIndex = currentFieldIndex + 1;
        }
        break;
      case `ArrowUp`:
        e.preventDefault();
        if (currentFieldIndex > -1) {
          currentFieldIndex = currentFieldIndex - 1;
        }
        break;
      case `Enter`:
        if (!editField) {
          e.preventDefault();
          editField = currentField;
        }
        break;
    }
  }
</script>

<style>
  ul {
    position: relative;
    z-index: 10;
    margin: 0;
    padding: 20px 0;
    list-style: none;
  }

  li {
    margin: 0 0 10px;
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<ul>
  {#each fields as field, i (field.type)}
    <li>
      <SingleField
        type={field.type}
        text={field.value}
        isEdit={editField === field.type}
        isCurrent={currentField === field.type}
        on:change={onCange}
        {msgError} />
    </li>
  {/each}
</ul>
