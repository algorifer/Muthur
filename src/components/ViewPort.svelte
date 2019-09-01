<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { projects, divisions, types, tasks, logs } from "../stores/db";
  import { view } from "../stores/app";

  // Components
  import Header from "./Header.svelte";
  import Controls from "./Controls.svelte";
  import NonProjectLayout from "../layouts/NonProjectLayout.svelte";

  // State
  let projectCount;

  // Lifecycle
  onMount(() => $projects.count().then(res => (projectCount = res)));
</script>

<Header />
{#if projectCount === 0}
  <NonProjectLayout />
{/if}
<Controls />
