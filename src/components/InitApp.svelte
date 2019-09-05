<style>
  @keyframes hello {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  main {
    margin: 100px auto auto;
    text-align: center;
  }

  p {
    margin: 40px 0;
    font-size: 20px;
    line-height: 1.2;
    text-transform: uppercase;
  }

  h1 {
    font-size: 50px;
    color: var(--f_inv);
  }

  h1 span {
    opacity: 0;
    animation-name: show;
    animation-delay: 1.5s;
    animation-duration: 2s;
    animation-fill-mode: forwards;
  }

  .hello {
    font-size: 30px;
    animation-name: hello;
    animation-delay: 0.5s;
    animation-duration: 3s;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  .desc {
    opacity: 0;
    animation-name: show;
    animation-delay: 3s;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
</style>

<main>
  <p class="hello">Hello, I am</p>
  <h1>
    <span>MU</span>
    °
    <span>TH</span>
    °
    <span>UR</span>
  </h1>
  <p class="desc">
    I follow what you do and
    <br />
    what you need to do
  </p>
</main>
