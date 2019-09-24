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
        } else {
          dispatch(`import`);
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

  p {
    margin: 0 0px 15px;
    color: var(--f_med);
  }

  b {
    display: inline-block;
    min-width: 16px;
    padding: 2px;
    font-weight: normal;
    text-align: center;
    color: var(--f);
    background: var(--bg);
    border-radius: 3px;
    box-shadow: 1px 3px 0 var(--f);
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<ul>
  <li class:active={select === `new`}>Create new user</li>
  <li class:active={select === `import`}>Import data</li>
</ul>

<div>
  <p>use keyboard</p>
  <p>
    <b>↑</b>
    or
    <b>↓</b>
    switch items
  </p>
  <p>
    <b>Enter</b>
    select
  </p>
</div>
