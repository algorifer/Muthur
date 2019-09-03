<script>
  // Stores
  import { controlMod } from "../stores/control";

  // Components
  import Input from "../elements/Input.svelte";
  import Helper from "../elements/Helper.svelte";
  import Error from "../elements/Error.svelte";
</script>

<style>
  div {
    position: sticky;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    padding: 20px 0;
  }

  p {
    display: flex;
    align-items: baseline;
    width: 100%;
    margin: 0;
  }

  span {
    margin-right: 10px;
    font-style: italic;
    text-transform: uppercase;
    color: var(--f_high);
    white-space: nowrap;
  }
</style>

<div>
  <p>
    <span>{$controlMod}</span>
    <Input />
  </p>
  <Helper />
  <Error />
</div>
