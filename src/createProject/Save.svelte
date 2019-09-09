<script>
  // Utils
  import typewriter from "../helpers/typewriter";

  // Stores
  import { dbProjects } from "../stores/db";
  import { viewMode } from "../stores/muthur";

  // Components
  import Input from "../components/Input.svelte";

  // Model
  let value = ``;
  export let project;
  export let msgError;
  export let isSuccess;

  // Update
  const save = () => {
    msgError = false;
    switch (value.toLowerCase()) {
      case `yes`:
      case `y`:
        return $dbProjects
          .insert(project)
          .then(res => {
            project = res;
            isSuccess = true;
          })
          .catch(err => (msgError = err));
      case `no`:
      case `n`:
        return viewMode.set(`projects`);
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
