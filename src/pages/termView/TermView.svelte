<script>
  // Svelte
  import { onMount, onDestroy } from "svelte";

  // Utils
  import birker from "../../utils/birker";

  // Components
  import PageHelp from "../../components/PageHelp.svelte";
  import Input from "../../components/create/Input.svelte";
  import Error from "../../components/create/Error.svelte";

  // Stores
  import { viewPage, viewMode } from "../../stores/muthur";
  import { dbTerms } from "../../stores/db";

  // Model
  let data = null;
  let currentField = `name`;
  let editField = false;
  let value;
  let msgError = false;
  let scrollY;
  let outerHeight;
  let innerHeight;
  let clientHeight;

  // Lifecycle
  onMount(() => updateData());

  onDestroy(() => viewPage.set(false));

  // Update
  const updateData = () =>
    $dbTerms
      .find({ _id: $viewPage })
      .then(res => (data = res[0]))
      .catch(err => console.log(err));

  const changeName = () => {
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    msgError = false;

    $dbTerms
      .update({ _id: data._id }, { $set: { name: value } })
      .then(res => {
        updateData();
        editField = false;
      })
      .catch(err => console.log(err));
  };

  const changeDesc = () => {
    if (!value.length) {
      msgError = `required field`;
      return;
    }
    msgError = false;

    $dbTerms
      .update({ _id: data._id }, { $set: { desc: value } })
      .then(res => {
        updateData();
        editField = false;
      })
      .catch(err => console.log(err));
  };

  const changeNote = () =>
    $dbTerms
      .update(
        { _id: data._id },
        { $set: { note: value.length ? value : `empty` } }
      )
      .then(res => {
        updateData();
        editField = false;
      })
      .catch(err => console.log(err));

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`terms`);
        break;
      case `Enter`:
        if (!editField) {
          e.preventDefault();
          value = data[currentField];
          editField = currentField;
        }
        break;
      case `ArrowDown`:
        if (!editField) {
          e.preventDefault();
          switch (currentField) {
            case `name`:
              currentField = `desc`;
              break;
            case `desc`:
              currentField = `note`;
              break;
            case `note`:
              if (scrollY + innerHeight >= clientHeight) {
                currentField = `name`;
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth"
                });
              } else {
                window.scrollTo({
                  top: scrollY + 50,
                  left: 0,
                  behavior: "smooth"
                });
              }
              break;
          }
        }
        break;
      case `ArrowUp`:
        if (!editField) {
          e.preventDefault();
          switch (currentField) {
            case `name`:
              currentField = `note`;
              break;
            case `desc`:
              currentField = `name`;
              break;
            case `note`:
              if (scrollY !== 0) {
                window.scrollTo({
                  top: scrollY - 50,
                  left: 0,
                  behavior: "smooth"
                });
              } else {
                currentField = `desc`;
              }
              break;
          }
        }
        break;
    }
  }
</script>

<style>
  .list {
    display: flex;
    align-items: flex-start;
  }

  article {
    width: 60%;
    margin: 20px;
  }

  h1 {
    margin: 0;
    padding: 5px 10px;
    font-size: inherit;
    transition: 0.2s;
  }

  section {
    margin: 20px 0 10px;
  }

  h2 {
    margin: 0 0 10px;
    font-size: inherit;
    text-transform: uppercase;
    color: var(--f_med);
  }

  p,
  .note {
    margin: 0;
    padding: 5px 10px;
    transition: 0.2s;
    overflow: hidden;
  }

  .active {
    background: var(--f);
    color: var(--bg);
  }
</style>

<svelte:window
  on:keydown={onWindowKeydown}
  bind:scrollY
  bind:outerHeight
  bind:innerHeight />

{#if data}
  <div class="list" bind:clientHeight>
    <article>
      {#if editField === `name`}
        <Input bind:value on:submit={changeName} />
        {#if msgError}
          <Error {msgError} isEdit={true} />
        {/if}
      {:else}
        <h1 class:active={currentField === `name`}>{data.name}</h1>
      {/if}
      <section>
        <h2>Description</h2>
        {#if editField === `desc`}
          <Input bind:value on:submit={changeDesc} />
          {#if msgError}
            <Error {msgError} isEdit={true} />
          {/if}
        {:else}
          <p class:active={currentField === `desc`}>{data.desc}</p>
        {/if}
      </section>
      <section>
        <h2>Notes</h2>
        {#if editField === `note`}
          <Input bind:value on:submit={changeNote} />
        {:else}
          <div class="note" class:active={currentField === `note`}>
            {@html birker(data.note)}
          </div>
        {/if}
      </section>
    </article>
    <PageHelp />
  </div>
{/if}
