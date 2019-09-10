<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import {
    dbProjects,
    dbTasks,
    dbDivisions,
    dbTypes,
    dbLogs
  } from "../stores/db";
  import { viewMode } from "../stores/muthur";

  // Components
  import Input from "../components/Input.svelte";

  // Model
  let value = ``;
  export let log;
  export let project;
  export let type;
  export let division;
  export let task;
  export let isProjectNew;
  export let isTypeNew;
  export let isDivisionNew;
  export let isTaskNew;
  export let msgError;

  // Update
  const save = () => {
    msgError = false;
    switch (value.toLowerCase()) {
      case `yes`:
      case `y`:
        if (isProjectNew) {
          $dbProjects
            .insert(project)
            .then(res => (project = res))
            .catch(err => (msgError = err));
        }
        if (isTypeNew) {
          $dbTypes
            .insert(type)
            .then(res => (type = res))
            .catch(err => (msgError = err));
        }
        if (isDivisionNew) {
          $dbDivisions
            .insert(division)
            .then(res => (division = res))
            .catch(err => (msgError = err));
        }
        if (isTaskNew) {
          $dbTasks
            .insert(task)
            .then(res => (task = res))
            .catch(err => (msgError = err));
        }
        $dbLogs
          .insert(log)
          .then(res => (log = res))
          .catch(err => (msgError = err));
        break;
      case `no`:
      case `n`:
        return viewMode.set(`logs`);
      default:
        value = ``;
        msgError = `wrong command`;
    }
  };
</script>

<style>
  li {
    display: flex;
    align-items: baseline;
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: var(--f_med);
  }

  p {
    margin: 0;
    padding: 5px 20px;
    border-left: 1px solid var(--f_low);
  }

  .request p {
    color: var(--f_inv);
  }
</style>

<li class="request">
  <span>○</span>
  <p in:typewriter>Save?</p>
</li>
<li>
  <span>fin</span>
  <Input bind:value on:submit={save} placeholder="[y]es or [n]o" />
</li>
