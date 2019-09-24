<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbTerms } from "../../stores/db";

  // Components
  import CreateHelper from "../create/Helper.svelte";
  import CreateField from "../create/Field.svelte";

  // Model
  let value = ``;
  let terms = [];
  export let obj;
  export let term;
  export let msgError;

  $: helpers = terms.filter(
    p =>
      !p.name.toLowerCase().indexOf(value.toLowerCase()) &&
      p.name.toLowerCase() !== value.toLowerCase()
  );

  // Lifecycle
  onMount(() => {
    $dbTerms
      .find()
      .exec()
      .then(res => {
        terms = res.map(r => ({ name: r.name, desc: r.desc }));
      })
      .catch(err => console.log(err));
  });

  // Update
  const setTerm = () => {
    msgError = false;
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    const findTerms = terms.filter(
      p => p.name.toLowerCase() === value.toLowerCase()
    );
    if (!findTerms.length) {
      term.name = value;
      obj.term = value;
    } else {
      obj.term = findTerms[0].name;
    }
  };

  const help = () => {
    if (helpers.length) {
      value = helpers[0].name;
    }
  };
</script>

<CreateField
  name={term.name ? `newTerm` : `term`}
  prop={obj.term}
  bind:value
  on:submit={setTerm}
  on:help={help}
  request="Which term to attach?"
  placeholder="required" />
{#if !obj.term}
  <CreateHelper {helpers} isTab={true} />
{/if}
