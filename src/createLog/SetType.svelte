<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { dbTypes } from "../stores/db";

  // Components
  import Input from "../components/Input.svelte";
  import CreateHelper from "../components/CreateHelper.svelte";

  // Model
  let value = ``;
  let types = [];
  export let log;
  export let type;
  export let msgError;
  export let isTypeNew;

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
      isTypeNew = true;
      type.name = value;
      log.type = value;
    } else {
      log.type = findTypes[0].name;
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
  <p in:typewriter>Which type?</p>
</li>
<li>
  <span>{isTypeNew ? `newType` : `type`}</span>
  {#if !log.type}
    <Input
      bind:value
      on:submit={setType}
      on:help={help}
      placeholder="required" />
  {:else}
    <p>{log.type}</p>
  {/if}
</li>
{#if !log.type}
  <CreateHelper {helpers} />
{/if}
