<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { message } from "../stores/app";

  // Lifecycle
  onMount(() => message.set(`You need to create the first project`));
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  svg {
    width: 100%;
    max-width: 400px;
  }

  p {
    font-style: italic;
  }
</style>

<main>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 330 330"
    fill="none"
    baseProfile="full">
    <path
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="10"
      d="M15 135A120 120 0 0 1 135 15a120 120 0 0 1 120 120 120 120 0 0 1-120
      120A120 120 0 0 1 15 135m240-90a30 30 0 0 1 30-30 30 30 0 0 1 30 30 30 30
      0 0 1-30 30 30 30 0 0 1-30-30" />
  </svg>
  <p>Type `add project` to do this</p>
</main>
