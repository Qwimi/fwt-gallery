<template>
  <div class="spinner--container">
    <div class="spinner--wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" class="spinner" viewBox="0 0 50 50">
        <circle class="spinner__path spinner__path--four" cx="25" cy="25" r="20" />
        <circle class="spinner__path spinner__path--third" cx="25" cy="25" r="20" />
        <circle class="spinner__path spinner__path--second" cx="25" cy="25" r="20" />
        <circle class="spinner__path spinner__path--first" cx="25" cy="25" r="20" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin transparentColor($color, $percent) {
  stroke: color-mix(in srgb, $color, transparent $percent);
}

.spinner {
  animation: rotate 2s infinite;
  &--container {
    position: fixed;
    inset: 0;
    background: var(--background-primary);
    z-index: 7;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &--wrapper {
    height: 600px;
    width: 600px;
  }
  &__path {
    stroke-dasharray: 0 127; // 127 -длина окружности
    stroke-dashoffset: calc(127 / 4 * (-1)); // начальная точка, анимация начинается снизу
    fill: none;
    stroke-width: 5;
    stroke-linecap: round;

    &--first {
      animation: spinFirst 2s infinite linear;
      @include transparentColor(light-dark(var(--text-primary), var(--text-secondary)), 80%);
    }
    &:not(&--first) {
      @include transparentColor(light-dark(var(--text-primary), var(--text-secondary)), 35%);
    }
    &--second {
      animation: spinSecond 2s infinite linear;
    }
    &--third {
      animation: spinThird 2s infinite linear;
    }
    &--four {
      animation: spinFour 2s infinite linear;
    }
  }
}

@keyframes spinFirst {
  50% {
    stroke-dasharray: calc(127 / 2) calc(127 / 2);
    stroke-dashoffset: calc(127 / 2 * (-1));
  }
  to {
    stroke-dasharray: 0 127;
    stroke-dashoffset: calc(127 * 5 / 4 * (-1));
  }
}

@keyframes spinSecond {
  50% {
    stroke-dasharray: calc(127 * 7 / 12) calc(127 * 5 / 12);
    stroke-dashoffset: calc(127 * 5 / 12 * (-1));
  }
  to {
    stroke-dasharray: 0 127;
    stroke-dashoffset: calc(127 * 5 / 4 * (-1));
  }
}

@keyframes spinThird {
  50% {
    stroke-dasharray: calc(127 * 8 / 12) calc(127 * 4 / 12);
    stroke-dashoffset: calc(127 / 3 * (-1));
  }
  to {
    stroke-dasharray: 0 127;
    stroke-dashoffset: calc(127 * 5 / 4 * (-1));
  }
}

@keyframes spinFour {
  50% {
    stroke-dasharray: calc(127 * 9 / 12) calc(127 * 3 / 12);
    stroke-dashoffset: calc(127 / 4 * (-1));
  }
  to {
    stroke-dasharray: 0 127;
    stroke-dashoffset: calc(127 * 5 / 4 * (-1));
  }
}

@keyframes rotate {
  to {
    rotate: 360deg;
  }
}
</style>
