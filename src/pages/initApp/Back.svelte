<style>
  div {
    position: relative;
    height: 100%;
    margin-left: 40px;
    width: 100%;
  }

  @keyframes skew {
    0% {
      transform: skewX(5deg);
    }
    100% {
      transform: skewX(-5deg);
    }
  }

  div::before,
  div::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    height: 100%;
    background-image: linear-gradient(to right, var(--f), var(--bg));
    opacity: 0.5;
    animation-name: skew;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  div::after {
    content: "";
    position: absolute;
    animation-direction: alternate-reverse;
  }
</style>

<div />
