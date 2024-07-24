<template>
  <article class="skeleton card">
    <div class="card__info">
      <div class="card__text">
        <p class="skeleton card__title"></p>
        <p class="skeleton card__date"></p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
$card-background--light: #eeeded;
$card-background--dark: #0d0d0d;
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: light-dark($card-background--light, $card-background--dark);

  &::before {
    content: '';
    position: absolute;
    animation: wave 2s ease infinite;
    height: 100%;
    width: 16.25rem;
    background: linear-gradient(
      90deg,
      rgba(18, 18, 18, 0) 6.82%,
      rgba(13, 13, 13, 0) 6.83%,
      rgba(87, 87, 87, 0.1) 58.56%,
      rgba(13, 13, 13, 0) 109.66%
    );
  }
}

.card {
  aspect-ratio: 98/65;

  @include descriptionMixin;

  &__info {
    bottom: 0;
    left: 0;
    padding: 0.5em 0;
    width: 85%;

    @media (min-width: $breakpoint-md) {
      padding: 0.75rem 0;
    }

    @media (min-width: $breakpoint-lg) {
      padding: 1.25rem 0;
      max-width: 18.75rem;
    }
  }

  &__text {
    padding: 0 0.75rem;

    @media (min-width: $breakpoint-lg) {
      padding: 0 1.25rem;
    }
    &::before {
      display: none;
    }
  }

  &__title,
  &__date {
    animation-delay: 0.2s;
  }

  &__title {
    height: 1rem;
    width: 10rem;
    @media (min-width: $breakpoint-md) {
      height: 1.25rem;
      width: 13.25rem;
    }
  }

  &__date {
    height: 0.5rem;
    width: 3rem;
    @media (min-width: $breakpoint-md) {
      height: 1rem;
      width: 4.25rem;
    }
  }
}

@keyframes wave {
  from {
    left: -50%;
  }
  to {
    left: 100%;
  }
}
</style>
