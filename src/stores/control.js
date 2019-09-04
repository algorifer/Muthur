import { DateTime } from 'luxon';

// Svelte
import { writable, derived } from 'svelte/store';

// Stores
import { viewMode, newProject, newTask } from './muthur';
import { projects } from './db';

// Data
export const ControlMods = {
  CMD: `CMD`,
  NAME: `name`,
  DESC: `desc`,
  NOTE: `note`,
  DATE: `date`,
  SAVE: `save`,
  TASK: `task`,
  PROJECT: `proj`
};

export const commands = [
  { letters: `add `, desc: `add project or task` },
  { letters: `add project `, desc: `add project <name>` },
  { letters: `add task `, desc: `add task <name>` },
  { letters: `remove `, desc: `remove project or task` },
  { letters: `remove project `, desc: `add project <name>` },
  { letters: `remove task `, desc: `add task <id>` }
];

// Stores
export const controlValue = writable(``);
export const controlError = writable(null);

// SWITCH MODE
export const controlMod = derived(
  [viewMode, newProject, newTask],
  ([$viewMode, $newProject, $newTask]) => {
    switch ($viewMode) {
      case `AddProject`:
        if (!$newProject.name) {
          return ControlMods.NAME;
        } else if (!$newProject.desc) {
          return ControlMods.DESC;
        } else if (!$newProject.note) {
          return ControlMods.NOTE;
        } else {
          controlValue.set(`Yes`);
          return ControlMods.SAVE;
        }
      case `AddTask`:
        if (!$newTask.name) {
          return ControlMods.TASK;
        } else if (!$newTask.project) {
          return ControlMods.PROJECT;
        }
      default:
        return ControlMods.CMD;
    }
  }
);

// CREATE HELPERS
export const controlHelpers = derived(
  [controlMod, controlValue, projects],
  ([$controlMod, $controlValue, $projects]) => {
    if ($controlMod === ControlMods.CMD && $controlValue.length) {
      return commands.filter(
        command =>
          !command.letters.indexOf($controlValue) &&
          command.letters !== $controlValue
      );
    } else if ($controlMod === ControlMods.PROJECT) {
      let projectsList;
      $projects
        .find()
        .exec()
        .then(res => {
          projectsList = resfilter(
            p => !p.name.indexOf($controlValue) && p.name !== $controlValue
          );
        });
      return projectsList;
    } else {
      return [];
    }
  }
);
