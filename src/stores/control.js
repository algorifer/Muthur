import { DateTime } from 'luxon';

// Svelte
import { writable, derived } from 'svelte/store';

// Stores
import { viewMode, newProject } from './muthur';

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
