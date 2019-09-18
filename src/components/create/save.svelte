<script>
  // Utils
  import typewriter from "../../helpers/typewriter";

  // Stores
  import {
    dbProjects,
    dbTasks,
    dbDivisions,
    dbTypes,
    dbLogs
  } from "../../stores/db";
  import { viewMode } from "../../stores/muthur";

  // Components
  import Input from "./input.svelte";
  import CreateField from "./field.svelte";

  // Model
  let value = ``;
  export let log = {};
  export let project = {};
  export let type = {};
  export let division = {};
  export let task = {};
  export let msgError;

  // Update
  const save = () => {
    msgError = false;
    switch (value.toLowerCase()) {
      case `yes`:
      case `y`:
        if (project.name) {
          $dbProjects
            .insert(project)
            .then(res => (project = res))
            .catch(err => (msgError = err));
        }
        if (type.name) {
          $dbTypes
            .insert(type)
            .then(res => (type = res))
            .catch(err => (msgError = err));
        }
        if (division.name) {
          $dbDivisions
            .insert(division)
            .then(res => (division = res))
            .catch(err => (msgError = err));
        }
        if (task.name) {
          $dbTasks
            .insert(task)
            .then(res => (task = res))
            .catch(err => (msgError = err));
        }
        if (log.date) {
          $dbLogs
            .insert(log)
            .then(res => (log = res))
            .catch(err => (msgError = err));
        }
        break;
      case `no`:
      case `n`:
        return viewMode.set(`tasks`);
      default:
        value = ``;
        msgError = `wrong command`;
    }
  };
</script>

<CreateField
  name="fin"
  prop={false}
  bind:value
  on:submit={save}
  request="Save?"
  placeholder="[y]es or [n]o" />
