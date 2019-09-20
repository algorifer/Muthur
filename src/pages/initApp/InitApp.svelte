<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { dbUser } from "../../stores/db";
  import { viewMode } from "../../stores/muthur";

  // Components
  import InitMenu from "./Menu.svelte";

  // Model
  let user = null;
  let isHiShow = false;
  let isNameShow = false;
  let isDescShow = false;
  let isCreate = false;
  export let isInit;

  // Lifecycle
  onMount(() => {
    $dbUser
      .find()
      .then(res => (user = res[0]))
      .catch(err => console.log(err));

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

    const checkTimeout = setTimeout(() => {
      if (user) {
        isInit = true;
        return;
      }
      isCreate = true;
    }, 3500);
  });

  // Update
  const toNewUser = () => {
    isInit = true;
    viewMode.set(`createUser`);
  };
</script>

<style>
  main {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    margin: 20px;
  }

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

  .back {
    position: relative;
    height: 100%;
    margin-left: 40px;
    width: 100%;
  }

  @keyframes skew {
    0% {
      transform: skewX(5deg);
    }
    100% {
      transform: skewX(-5deg);
    }
  }

  .back::before,
  .back::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    height: 100%;
    background-image: linear-gradient(to right, var(--f), var(--bg));
    opacity: 0.5;
    animation-name: skew;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  .back::after {
    content: "";
    position: absolute;
    animation-direction: alternate-reverse;
  }
</style>

<main>
  <div class="content">
    <p class:active={isHiShow}>Hello, I am</p>
    <h1 class:active={isNameShow}>
      <span class:active={isNameShow}>MU</span>
      ○
      <span class:active={isNameShow}>TH</span>
      ○
      <span class:active={isNameShow}>UR</span>
    </h1>
    <p class:active={isDescShow}>
      I follow what you do and what you need to do
    </p>
    {#if isCreate}
      <InitMenu on:new={toNewUser} />
    {/if}
  </div>
  <div class="back" />
</main>
