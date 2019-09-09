<script>
  // Svelte
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  // State
  let input;
  export let value;
  export let placeholder = ``;

  // Lifecycle
  onMount(() => input.focus());
  onDestroy(() => document.body.focus());

  // Methods
  const inputResize = () => {
    input.style.height = `auto`;
    input.style.height = `${input.scrollHeight +
      (input.offsetHeight - input.clientHeight)}px`;
  };
  const dispatch = createEventDispatcher();

  // Events
  $: if (value) inputResize();

  function onKyedown(e) {
    if (e.key === `Enter` && !e.shiftKey) {
      e.preventDefault();
      dispatch(`submit`);
    } else if (e.key === `Tab`) {
      e.preventDefault();
      dispatch(`help`);
    }
  }
</script>

<style>
  textarea {
    width: 100%;
    margin: 0;
    padding: 5px 20px;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.2;
    color: inherit;
    background: none;
    border: none;
    border-left: 1px solid var(--f_low);
    resize: none;
  }
</style>

<textarea
  rows="1"
  bind:value
  {placeholder}
  on:keydown={onKyedown}
  bind:this={input} />
