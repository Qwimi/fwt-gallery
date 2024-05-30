<script lang="ts" setup>
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconVk from '@/components/icons/IconVk.vue'
</script>

<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer_content">
        <div class="footer_info">
          <p class="footer_info_about">
            Проект реализован в рамках стажировки для Frontend-разработчиков от компании
            <router-link to="/" class="link-underline">Framework Team</router-link>
          </p>
          <p class="footer_info_name">Нагаева Анастасия, 2024</p>
        </div>
        <div class="footer_contacts">
          <router-link to="/">
            <icon-facebook class="icon" />
          </router-link>
          <router-link to="/">
            <icon-vk class="icon" />
          </router-link>
          <router-link to="/">
            <icon-instagram class="icon" />
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  color: var(--primary-text-dafault);
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

  &_info {
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
    &_name {
      color: var(--secondary-gray);
    }
  }

  &_content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    justify-content: space-between;
    @media screen and (min-width: $breakpoint-md) {
      flex-direction: row;
    }
  }

  &_contacts {
    display: flex;
    gap: 1.25rem;
  }
}
</style>
