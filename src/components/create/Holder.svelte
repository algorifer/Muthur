<script>
  // Model
  export let name;
</script>

<style>
  li {
    display: flex;
    align-items: baseline;
    color: var(--f_med);
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
  }

  p {
    margin: 0;
    padding: 10px 20px;
    border-left: 1px solid var(--f_med);
  }
</style>

<li>
  <span>⊡</span>
  <p>{name}</p>
</li>
