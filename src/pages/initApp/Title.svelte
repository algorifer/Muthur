<script>
  // Svelte
  import { onMount } from "svelte";

  // Model
  let isHiShow = false;
  let isNameShow = false;
  let isDescShow = false;

  // Lifecycle
  onMount(() => {
    const hiTimeout = setTimeout(() => {
      isHiShow = true;
      clearTimeout(hiTimeout);
    }, 300);

    const nameTimeout = setTimeout(() => {
      isNameShow = true;
      clearTimeout(nameTimeout);
    }, 1000);

    const descTimeout = setTimeout(() => {
      isDescShow = true;
      clearTimeout(descTimeout);
    }, 2000);
  });
</script>

<style>
  p {
    margin: 0 0 10px;
    font-size: inherit;
    text-transform: uppercase;
    opacity: 0;
    transition: 1s;
  }

  h1 {
    margin: 0 0 10px;
    padding: 5px 10px;
    font-size: inherit;
    transition: 1s;
  }

  span {
    color: var(--bg);
  }

  .active {
    opacity: 1;
  }

  h1.active {
    background: var(--f);
  }
</style>

<p class:active={isHiShow}>Hello, I am</p>
<h1 class:active={isNameShow}>
  <span class:active={isNameShow}>MU</span>
  ○
  <span class:active={isNameShow}>TH</span>
  ○
  <span class:active={isNameShow}>UR</span>
</h1>
<p class:active={isDescShow}>I follow what you do and what you need to do</p>
