<script lang="ts" setup>
import IconFacebook from '@/components/icons/IconFacebook.vue';
import IconInstagram from '@/components/icons/IconInstagram.vue';
import IconVk from '@/components/icons/IconVk.vue';
</script>

<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__content">
        <div class="footer__info">
          <p class="footer__about">
            Проект реализован в рамках стажировки для Frontend-разработчиков от компании
            <router-link :to="{ name: 'home' }" class="link-underline">Framework Team</router-link>
          </p>
          <p class="footer__name">Нагаева Анастасия, 2024</p>
        </div>
        <div class="footer__contacts">
          <router-link :to="{ name: 'home' }" class="footer__link">
            <icon-facebook class="icon" />
          </router-link>
          <router-link :to="{ name: 'home' }" class="footer__link">
            <icon-vk class="icon" />
          </router-link>
          <router-link :to="{ name: 'home' }" class="footer__link">
            <icon-instagram class="icon" />
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  color: var(--text-secondary);
  padding: 2rem 0;
  border-top: 1px solid var(--gray_9c);
  @include paragraphSmallLight;

  .link-underline {
    display: inline;
    @include paragraphSmallMedium;
  }

  @media screen and (min-width: $breakpoint-md) {
    @include paragraphBaseLight;
    .link-underline {
      @include paragraphBaseMedium;
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
  }

  &__name {
    color: var(--gray_9c);
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

  &__link {
    align-items: flex-start;
  }
}
</style>
