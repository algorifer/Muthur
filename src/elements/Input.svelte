<script>
  // Svelet
  import { onMount } from "svelte";

  // Stores
  import {
    controlValue,
    controlError,
    controlHelpers,
    onHelperUse,
    onSubmit
  } from "../stores/control";

  // State
  let input;

  // Lifecycle
  onMount(() => input.focus());

  // Methods
  const inputResize = () => {
    input.style.height = `auto`;
    input.style.height = `${input.scrollHeight +
      (input.offsetHeight - input.clientHeight)}px`;
  };

  $: if ($controlValue) inputResize();

  // Events
  function onKeydown(evt) {
    controlError.set(null);
    if (evt.key === `Tab`) {
      evt.preventDefault();
      onHelperUse();
      return;
    } else if (evt.key === `Escape`) {
      evt.preventDefault();
      controlValue.set(``);
    } else if (evt.key === `Enter`) {
      evt.preventDefault();
      // if (!$controlValue.length) return; /// Запрет пустого значения
      onSubmit();
    }
  }
</script>

<style>
  textarea {
    width: 100%;
    margin: 0;
    padding: 8px;
    font-family: inherit;
    font-size: 14px;
    white-space: pre-wrap;
    color: var(--background);
    background: var(--f_inv);
    border: none;
    resize: none;
    border-radius: 5px;
  }
</style>

<textarea
  rows="1"
  bind:this={input}
  bind:value={$controlValue}
  on:keydown={onKeydown}
  on:blur={() => input.focus()} />
