<script>
  // Libs
  import { controlBlock } from "../libs/key";

  // Components
  import ControlsHelper from "./ControlsHelper.svelte";

  // State
  let input = ``;
  let selectedHelp = ``;
  // Events
  function handleKeydown(evt) {
    if (controlBlock.indexOf(evt.key) >= 0 || evt.keyCode === 20) return;
    if (evt.key === "Tab" && selectedHelp) {
      input = selectedHelp.letters;
    } else if (evt.key === "Tab") {
      return;
    } else if (evt.key === "Backspace" || evt.key === "Delete") {
      input = input.substring(0, input.length - 1);
    } else if (evt.key === "Escape") {
      input = ``;
    } else {
      input = `${input}${evt.key}`;
    }
  }
</script>

<style>
  @keyframes splash {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  div {
    position: sticky;
    bottom: 0;
    padding: 20px;
  }

  .input {
    display: inline-block;
    margin: 0;
    padding: 10px;
    font-size: 14px;
    background: var(--text-color);
    color: var(--bg-color);
    border-radius: 5px;
    white-space: pre-wrap;
  }

  .input::after {
    content: "_";
    animation-name: splash;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<div>
  <ControlsHelper {input} bind:selectedHelp />
  <p class="input">{input}</p>
</div>
