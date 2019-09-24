<script>
  // Utils
  import typewriter from "../../utils/typewriter";

  // Model
  export let importRes;
</script>

<style>
  ul {
    margin: 40px 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 0 10px;
    text-transform: uppercase;
  }

  .error {
    color: var(--error);
  }
</style>

<ul>
  {#if importRes === `error`}
    <li in:typewriter class="error">Wrong data</li>
  {:else if importRes}
    {#if importRes.user}
      <li in:typewriter>User Imported</li>
    {/if}
    {#if importRes.terms !== `error`}
      <li in:typewriter>Terms Imported</li>
    {:else}
      <li in:typewriter class="error">Terms Not Imported</li>
    {/if}
    {#if importRes.divisions !== `error`}
      <li in:typewriter>Divisions Imported</li>
    {:else}
      <li in:typewriter class="error">Divisions Not Imported</li>
    {/if}
    {#if importRes.types !== `error`}
      <li in:typewriter>Types Imported</li>
    {:else}
      <li in:typewriter class="error">Types Not Imported</li>
    {/if}
    {#if importRes.tasks !== `error`}
      <li in:typewriter>Tasks Imported</li>
    {:else}
      <li in:typewriter class="error">Tasks Not Imported</li>
    {/if}
    {#if importRes.logs !== `error`}
      <li in:typewriter>Logs Imported</li>
    {:else}
      <li in:typewriter class="error">Logs Not Imported</li>
    {/if}
  {/if}
</ul>
