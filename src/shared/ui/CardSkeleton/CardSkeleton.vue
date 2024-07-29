<template>
  <article class="card card--skeleton">
    <div class="card__info">
      <div class="card__text">
        <p class="card__title"></p>
        <p class="card__date"></p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card--skeleton {
  position: relative;
  overflow: hidden;
  background-color: var(--background-card);

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    animation: wave 2s ease infinite;
    height: 100%;
    width: 16.25rem;
    background-image: linear-gradient(
      90deg,
      color-mix(in srgb, var(--background-primary) 0%, transparent) 0%,
      color-mix(in srgb, var(--background-primary) 50%, transparent) 50%,
      color-mix(in srgb, var(--background-primary) 0%, transparent) 100%
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
    background-color: var(--background-card);
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
