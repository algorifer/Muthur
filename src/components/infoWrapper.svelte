<script>
  // Model
  export let title;
</script>

<style>
  article {
    position: fixed;
    top: 50px;
    bottom: 85px;
    right: 0;
    width: 50%;
    padding: 20px 20px 0;
  }

  article::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -20px;
    display: block;
    width: 1px;
    height: 50px;
    background: var(--f_med);
  }

  p {
    position: absolute;
    top: 0;
    left: -40px;
    padding: 5px 4px;
    writing-mode: vertical-lr;
    border-right: 1px solid var(--f_dark);
    border-left: 1px solid var(--f_med);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<article>
  <p># {title}</p>
  <ul>
    <slot />
  </ul>
</article>
