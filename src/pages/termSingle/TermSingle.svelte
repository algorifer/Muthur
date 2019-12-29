<script>
  // Svelte
  import { onMount, onDestroy } from "svelte";

  // Components
  import SingleHeader from "../../components/single/Header.svelte";
  import Main from "./Main.svelte";
  import Note from "./Note.svelte";

  // Stores
  import { viewPage, viewMode } from "../../stores/muthur";
  import { dbTerms } from "../../stores/db";

  // Model
  let page = `main`;
  let data = null;
  let editField = false;

  // Lifecycle
  onMount(() => updateData());

  onDestroy(() => viewPage.set(false));

  // Update
  function onChange(e) {
    console.log(e);
    const { type, value } = e.detail;
    $dbTerms
      .update({ _id: data._id }, { $set: { [type]: value } })
      .then(res => {
        console.log(res);
        updateData();
      })
      .catch(err => console.log(err));
  }

  const updateData = () =>
    $dbTerms
      .find({ _id: $viewPage })
      .then(res => (data = res[0]))
      .catch(err => console.log(err));

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Escape`:
        viewMode.set(`terms`);
        break;
      case `ArrowLeft`:
        if (!editField)
          switch (page) {
            case `main`:
              page = `note`;
              break;
            case `note`:
              page = `main`;
              break;
          }
        break;
      case `ArrowRight`:
        if (!editField)
          switch (page) {
            case `main`:
              page = `note`;
              break;
            case `note`:
              page = `main`;
              break;
          }
        break;
    }
  }
</script>

<style>
  main {
    padding: 0 10%;
  }

  @keyframes skew {
    0% {
      transform: skewX(20deg);
    }
    100% {
      transform: skewX(-20deg);
    }
  }

  main::before,
  main::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 55%;
    display: block;
    height: 100%;
    background-image: linear-gradient(to left, var(--f), var(--bg));
    opacity: 0.5;
    animation-name: skew;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  main::after {
    content: "";
    position: absolute;
    right: 0;
    left: 55%;
    background-image: linear-gradient(to right, var(--f), var(--bg));
    animation-direction: alternate-reverse;
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

{#if data}
  <SingleHeader {page} type="term" />
  <main>
    {#if page === `main`}
      <Main
        fields={[{ type: `name`, value: data.name }, { type: `desc`, value: data.desc }]}
        on:change={onChange}
        bind:editField />
    {:else if page === `note`}
      <Note note={data.note} on:change={onChange} bind:editField />
    {/if}
  </main>
{/if}
