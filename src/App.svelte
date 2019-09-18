<script>
  // Components
  import ViewPort from "./components/ViewPort.svelte";
</script>

<style type="text/scss">
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: "iosevka", "Courier New", Courier, monospace;
    font-size: 12px;
    line-height: 1.2;
    background: var(--bg);
    color: var(--f_high);
    -webkit-app-region: drag;
  }
</style>

<ViewPort />
