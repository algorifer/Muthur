<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { dbDivisions } from "../stores/db";

  // Components
  import Input from "../components/Input.svelte";
  import CreateHelper from "../components/CreateHelper.svelte";

  // Model
  let value = ``;
  let divisions = [];
  export let log;
  export let division;
  export let msgError;
  export let isDivisionNew;

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
      isDivisionNew = true;
      division.name = value;
      log.division = value;
    } else {
      log.division = findDivisions[0].name;
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
  <p in:typewriter>Which division?</p>
</li>
<li>
  <span>{isDivisionNew ? `newDivision` : `division`}</span>
  {#if !log.division}
    <Input
      bind:value
      on:submit={setDivision}
      on:help={help}
      placeholder="required" />
  {:else}
    <p>{log.division}</p>
  {/if}
</li>
{#if !log.division}
  <CreateHelper {helpers} />
{/if}
