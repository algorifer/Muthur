<script>
  // Components
  import ViewPort from "./components/ViewPort.svelte";
</script>

<style type="text/scss">
  :global(body) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    font-family: "iosevka", "Courier New", Courier, monospace;
    background: var(--background);
    color: var(--f_high);
    -webkit-app-region: drag;
  }

  :global(.btn_link) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: none;
    background: none;
    font-size: 12px;
    cursor: pointer;
  }

  :global(.btn_link::after) {
    content: "°";
    padding-left: 2px;
    font-weight: bold;
    font-size: 14px;
    line-height: 12px;
    transition: color 0.2s;
  }

  :global(.btn_link:hover::after) {
    color: var(--accent-color);
  }
</style>

<ViewPort />
