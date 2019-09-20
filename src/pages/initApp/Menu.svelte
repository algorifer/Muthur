<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

  // Model
  let isNew = false;
  let select = `new`;

  const dispatch = createEventDispatcher();

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `Enter`:
        e.preventDefault();
        if (select === `new`) {
          dispatch(`new`);
        }
        break;
      case `ArrowDown`:
      case `ArrowUp`:
        if (select === `new`) {
          select = `import`;
          break;
        }
        select = `new`;
        break;
    }
  }
</script>

<style>
  ul {
    margin: 40px 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 5px 10px;
    margin-bottom: 5px;
    text-transform: uppercase;
    transition: 0.2s;
  }

  li::before {
    content: "○ ";
    color: var(--bg);
  }

  .active {
    color: var(--bg);
    background: var(--f);
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<ul>
  <li class:active={select === `new`}>Create new</li>
  <li class:active={select === `import`}>Import data</li>
</ul>
