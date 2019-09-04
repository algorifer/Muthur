<script>
  // Svelte
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  // Utils
  import { DateTime } from "luxon";
  import typewriter from "../helpers/typewriter";

  // Stores
  import { message, newProject, newTask } from "../stores/muthur";

  // State
  let isInitTask = false;

  // LifeCycle
  onMount(() => {
    isInitTask = $newTask.name ? true : false;
    message.set(`Create a new task`);
  });
</script>

<style>
  main {
    width: 100%;
    margin: 0 auto;
  }

  p {
    font-size: 16px;
    margin: 0 0 24px;
    transition: font-size 0.2s;
  }

  .qustion {
    font-size: 14px;
    margin-bottom: 10px;
    color: var(--b_high);
  }

  p:last-child {
    font-size: 20px;
  }

  span {
    margin-right: 4px;
    color: var(--f_med);
  }
</style>

<main>
  {#if isInitTask}
    <p class="qustion" in:typewriter>°: Task set</p>
    <p transition:fly={{ y: 20, duration: 200 }}>
      <span>task</span>
      {$newTask.name}
    </p>
    <p class="qustion" in:typewriter>°: Enter project name</p>
  {:else}
    <p class="qustion" in:typewriter>°: Describe task</p>
    {#if $newTask.name}
      <p transition:fly={{ y: 20, duration: 200 }}>
        <span>task</span>
        {$newTask.name}
      </p>
      <p class="qustion" in:typewriter>°: Enter project name</p>
    {/if}
  {/if}
  {#if $newProject.desc}
    <p transition:fly={{ y: 20, duration: 200 }}>
      <span>desc</span>
      {$newProject.desc}
    </p>
    <p class="qustion" in:typewriter>°: Enter project note (optional)</p>
  {/if}
  {#if $newProject.note}
    <p transition:fly={{ y: 20, duration: 200 }}>
      <span>note</span>
      {$newProject.note}
    </p>
    <p class="qustion" in:typewriter>°: Enter project start date</p>
  {/if}
  {#if $newProject.date}
    <p transition:fly={{ y: 20, duration: 200 }}>
      <span>start date</span>
      {DateTime.fromISO($newProject.date).toLocaleString()}
    </p>
    <p class="qustion" in:typewriter>°: Save project? [Y]es or [N]o</p>
  {/if}
</main>
