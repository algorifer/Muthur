<script>
  // Utils
  import typewriter from "../../utils/typewriter";

  // Stores
  import {
    dbTerms,
    dbTasks,
    dbDivisions,
    dbTypes,
    dbLogs,
    dbUser
  } from "../../stores/db";
  import { viewMode } from "../../stores/muthur";

  // Components
  import Input from "./Input.svelte";
  import CreateField from "./Field.svelte";

  // Model
  let value = ``;
  export let log = {};
  export let term = {};
  export let type = {};
  export let division = {};
  export let task = {};
  export let user = {};
  export let msgError;

  // Update
  const save = () => {
    msgError = false;
    switch (value.toLowerCase()) {
      case `yes`:
      case `y`:
        if (term.name) {
          $dbTerms
            .insert(term)
            .then(res => (term = res))
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
        if (user.name) {
          console.log($dbUser);
          $dbUser
            .insert(user)
            .then(res => (user = res))
            .catch(err => (msgError = err));
        }
        break;
      case `no`:
      case `n`:
        if (user.name) {
          return viewMode.set(`init`);
        }
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
