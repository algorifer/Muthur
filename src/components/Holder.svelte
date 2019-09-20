<style>
  section {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: calc(100% - 135px);
    width: 40%;
    margin-left: 20px;
  }

  @keyframes skew {
    0% {
      transform: skewX(5deg);
    }
    100% {
      transform: skewX(-5deg);
    }
  }

  section::before,
  section::after {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    display: block;
    height: 100%;
    background-image: linear-gradient(to left, var(--f), var(--bg));
    opacity: 0.5;
    animation-name: skew;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  section::after {
    content: "";
    position: absolute;
    animation-direction: alternate-reverse;
  }

  h2 {
    position: relative;
    z-index: 100;
    margin: auto;
    font-size: inherit;
    padding: 5px 10px;
    text-transform: uppercase;
    background: var(--f);
    color: var(--bg);
  }
</style>

<section>
  <h2>empty</h2>
</section>
