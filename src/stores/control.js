import { DateTime } from 'luxon';

// Svelte
import { writable, derived, get } from 'svelte/store';

// Stores
import {
  viewMode,
  newProject,
  toAddProject,
  toTasks,
  setProjectField,
  updateProjectCount
} from './app';
import { addProjectDB } from './db';

// Data
export const ControlMods = {
  CMD: `CMD`,
  NAME: `name`,
  DESC: `desc`,
  NOTE: `note`,
  DATE: `date`,
  SAVE: `save`
};

export const commands = [
  { letters: `add `, desc: `add project or task` },
  { letters: `add project `, desc: `add project <name>` },
  { letters: `add tasks `, desc: `add task <name>` },
  { letters: `remove `, desc: `remove project or task` },
  { letters: `remove project `, desc: `add project <name>` },
  { letters: `remove task `, desc: `add task <id>` }
];

// Stores
export const controlValue = writable(``);
export const controlError = writable(null);

// SWITCH MODE
export const controlMod = derived(
  [viewMode, newProject],
  ([$viewMode, $newProject]) => {
    switch ($viewMode) {
      case `AddProject`:
        if (!$newProject.name) {
          return ControlMods.NAME;
        } else if (!$newProject.desc) {
          return ControlMods.DESC;
        } else if (!$newProject.note) {
          return ControlMods.NOTE;
        } else if (!$newProject.date) {
          controlValue.set(DateTime.local().toISODate());
          return ControlMods.DATE;
        } else {
          controlValue.set(`Yes`);
          return ControlMods.SAVE;
        }
      default:
        return ControlMods.CMD;
    }
  }
);

// CREATE HELPERS
export const controlHelpers = derived(
  [controlMod, controlValue],
  ([$controlMod, $controlValue]) =>
    $controlMod === ControlMods.CMD && $controlValue.length
      ? commands.filter(
          command =>
            !command.letters.indexOf($controlValue) &&
            command.letters !== $controlValue
        )
      : []
);

// Events
export const onCmdMod = () => controlMod.set(ControlMods.CMD);
export const onTxtMod = () => controlMod.set(ControlMods.TXT);
export const onHelperUse = () => {
  const helps = get(controlHelpers);
  if (helps.length) controlValue.set(helps[0].letters);
};

const onCmdSubmit = (view, value) => {
  const [cmd, trg, ...args] = value.split(` `);

  if (cmd === `add` && trg === `project`) {
    toAddProject(args.join(` `));
  } else {
    controlError.set(`wrong command`);
  }
};

export const onSubmit = () => {
  const mode = get(controlMod);
  const view = get(viewMode);
  const value = get(controlValue);

  controlValue.set(``);

  switch (mode) {
    case ControlMods.CMD:
      onCmdSubmit(view, value);
      break;
    case ControlMods.NAME:
      if (!value.length) return controlError.set(`wrong command`);
      switch (view) {
        case `AddProject`:
          setProjectField(view, `name`, value);
          break;
      }
      break;
    case ControlMods.DESC:
      if (!value.length) return controlError.set(`wrong command`);
      switch (view) {
        case `AddProject`:
          setProjectField(view, `desc`, value);
          break;
      }
      break;
    case ControlMods.NOTE:
      switch (view) {
        case `AddProject`:
          setProjectField(view, `note`, value.length ? value : `empty`);
          break;
      }
      break;
    case ControlMods.DATE:
      switch (view) {
        case `AddProject`:
          setProjectField(view, `date`, DateTime.fromISO(value).toString());
          break;
      }
      break;
    case ControlMods.SAVE:
      switch (view) {
        case `AddProject`:
          if (value.toLowerCase() === `yes` || value.toLowerCase() === `y`) {
            addProjectDB();
            updateProjectCount();
            toTasks();
            break;
          } else if (
            value.toLowerCase() === `no` ||
            value.toLowerCase() === `n`
          ) {
            break;
          } else {
            controlError.set(`wrong command`);
            break;
          }
      }
  }
};
