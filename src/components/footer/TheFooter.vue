<script lang="ts" setup>
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconVk from '@/components/icons/IconVk.vue'
defineProps<{ theme: string }>()
</script>

<template>
  <footer class="footer" :class="`footer--${theme}`">
    <div class="wrapper">
      <div class="footer__content">
        <div class="footer__info">
          <p class="footer__info__about">
            Проект реализован в рамках стажировки для Frontend-разработчиков от компании
            <router-link :to="{ name: 'home' }" class="link-underline">Framework Team</router-link>
          </p>
          <p class="footer__info__name">Нагаева Анастасия, 2024</p>
        </div>
        <div class="footer__contacts">
          <router-link :to="{ name: 'home' }">
            <icon-facebook class="icon" />
          </router-link>
          <router-link :to="{ name: 'home' }">
            <icon-vk class="icon" />
          </router-link>
          <router-link :to="{ name: 'home' }">
            <icon-instagram class="icon" />
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  color: var(--primary-gray-dark);
  padding: 2rem 0;
  border-top: 1px solid var(--secondary-gray);
  @include paragraphSmallLight;
  .link-underline {
    @include paragraphSmallMadium;
  }

  @media screen and (min-width: $breakpoint-md) {
    @include paragraphBaseLight;
    .link-underline {
      @include paragraphBaseMadium;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 435px;
    @media screen and (min-width: $breakpoint-md) {
      gap: 0.75rem;
    }
    @media screen and (min-width: $breakpoint-lg) {
      gap: 1.25rem;
    }
    &__name {
      color: var(--secondary-gray);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    justify-content: space-between;
    @media screen and (min-width: $breakpoint-md) {
      flex-direction: row;
    }
  }

  &__contacts {
    display: flex;
    gap: 1.25rem;
  }

  &--dark {
    color: var(--primary-gray-light);
  }
}
</style>
