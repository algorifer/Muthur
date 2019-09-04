<script>
  // Svelet
  import { onMount } from "svelte";

  // Utils
  import { DateTime } from "luxon";

  // Stores
  import {
    controlValue,
    controlError,
    controlMod,
    controlHelpers,
    ControlMods
  } from "../stores/control";
  import {
    viewMode,
    message,
    newProject,
    newTask,
    projectsCount
  } from "../stores/muthur";
  import { projects } from "../stores/db";

  // State
  let input;

  // Lifecycle
  onMount(() => input.focus());

  // Methods
  const inputResize = () => {
    input.style.height = `auto`;
    input.style.height = `${input.scrollHeight +
      (input.offsetHeight - input.clientHeight)}px`;
  };

  $: if ($controlValue) inputResize();

  // Events
  const onCmdSubmit = ([cmd, trg, ...args]) => {
    console.log(cmd, trg);
    switch (cmd) {
      case `add`:
        switch (trg) {
          case `project`:
            if (args.length) newProject.set({ name: args.join(` `) });
            return viewMode.set(`AddProject`);
          case `task`:
            if (args.length) newTask.set({ name: args.join(` `) });
            return viewMode.set(`AddTask`);
        }
        break;
      default:
        controlError.set(`wrong command`);
    }
  };

  const onSubmit = () => {
    const value = $controlValue;
    controlValue.set(``);

    switch ($controlMod) {
      case ControlMods.NAME:
        if (!value.length) return controlError.set(`required`);
        return newProject.set({ name: value });
        // TODO: check name
        break;
      case ControlMods.DESC:
        if (!value.length) return controlError.set(`required`);
        return newProject.update(p => ({ ...p, desc: value }));
        break;
      case ControlMods.NOTE:
        return newProject.update(p => ({
          ...p,
          note: value.length ? value : `empty`
        }));
        break;
      case ControlMods.TASK:
        return newTask.set({ name: value });
      case ControlMods.SAVE:
        switch ($viewMode) {
          case `AddProject`:
            if (value.toLowerCase() === `yes` || value.toLowerCase() === `y`) {
              $projects
                .insert($newProject)
                .then(res =>
                  $projects.count().then(res => {
                    projectsCount.set(res);
                    viewMode.set(`Tasks`);
                    newProject.set({});
                  })
                )
                .catch(err => console.log(err));
            } else if (
              value.toLowerCase() === `no` ||
              value.toLowerCase() === `n`
            ) {
              newProject.set(null);
              viewMode.set(`Tasks`);
            } else {
              controlError.set(`wrong command`);
            }
            break;
        }
        break;
      default:
        onCmdSubmit(value.split(` `));
    }
  };

  function onKeydown(evt) {
    controlError.set(null);
    if (evt.key === `Tab`) {
      evt.preventDefault();
      controlValue.set($controlHelpers[0].letters);
      return;
    } else if (evt.key === `Escape`) {
      evt.preventDefault();
      controlValue.set(``);
    } else if (evt.key === `Enter`) {
      evt.preventDefault();
      // if (!$controlValue.length) return; /// Запрет пустого значения
      onSubmit();
    }
  }
</script>

<style>
  textarea {
    width: 100%;
    margin: 0;
    padding: 8px;
    font-family: inherit;
    font-size: 14px;
    white-space: pre-wrap;
    color: var(--background);
    background: var(--f_inv);
    border: none;
    resize: none;
    border-radius: 5px;
  }
</style>

<textarea
  rows="1"
  bind:this={input}
  bind:value={$controlValue}
  on:keydown={onKeydown}
  on:blur={() => input.focus()} />
