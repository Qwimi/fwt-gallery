<script lang="ts" setup>
import type { Genre } from '@/stores/types'
import GenreLabel from '@/shared/ui/label/GenreLabel.vue'
import ButtonBase from '@/shared/ui/button/ButtonBase.vue'
import IconExpand from '@/components/icons/IconExpand.vue'
import { computed, ref, type Ref } from 'vue'

const props = defineProps<{
  name?: String
  yearsOfLife?: String
  biography?: String
  genres?: Genre[]
  theme?: string
}>()

const maxStrLenght = 265
const isExpanded: Ref<Boolean> = ref(false)
const biographyClass = computed(() => (isExpanded.value ? '' : 'text-short'))

const biographyText = computed(() =>
  isExpanded.value ? props.biography : `${props.biography?.slice(0, maxStrLenght)}...`
)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="biography" :class="`biography--${theme}`">
    <div class="biography__wrapper">
      <div class="biography__header">
        <p class="biography__header__date">
          {{ yearsOfLife }}
        </p>
        <p class="biography__header__name">
          {{ name }}
        </p>
      </div>
      <div class="biography__content">
        <div class="biography__content__main">
          <p class="biography__content__text" :class="biographyClass">
            {{ biographyText }}
          </p>
          <button-base
            :variant="'underline'"
            :theme="theme"
            class="biography__content__toggler"
            @click="toggleExpand"
          >
            <template v-if="isExpanded">read less</template>
            <template v-else>read more</template>
            <template #icon><icon-expand class="icon" /></template>
          </button-base>
        </div>
        <div class="biography__genres">
          <genre-label
            v-for="genre in genres"
            :key="genre._id"
            :theme="theme"
            :genre="genre"
            :deletable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.biography {
  position: relative;
  @media screen and (min-width: $breakpoint-lg) {
    position: absolute;
    inset: 0;
    max-width: 1240px;
    margin: 0 auto;

    &__wrapper {
      max-width: 604px;
      background-color: var(--primary-white);
      padding: 3.25rem 5rem;
      margin-top: 3.25rem;
    }
    &__content,
    &__header {
      padding: 0;
    }
  }
}

.biography__header {
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  width: calc(100% - 1.25rem);
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  background-color: var(--primary-white);

  &__date {
    color: var(--primary-gray-dark);
    @include captionMedium12;
    @media screen and (min-width: $breakpoint-md) {
      @include captionMedium16;
    }
  }

  &__name {
    @include headingH3;
    position: relative;
    color: var(--accent-red);
    @media screen and (min-width: $breakpoint-md) {
      @include headingH2;
      &::before {
        content: '';
        height: 100%;
        width: 2px;
        position: absolute;
        top: 0;
        left: -1.25rem;
        background: var(--accent-red);
      }
    }
    @media screen and (min-width: $breakpoint-lg) {
      @include headingH1;
      &::before {
        left: -5rem;
      }
    }
  }

  @media screen and (min-width: $breakpoint-md) {
    gap: 0.75rem;
  }

  @media screen and (min-width: $breakpoint-lg) {
    gap: 2rem;
    transform: translateY(0);
    position: static;
    width: 100%;
    max-width: none;
    margin-bottom: 3.25rem;
    padding: 0;
  }
}

.biography__content {
  padding: 1.25rem 1.25rem 0;
  position: relative;
  @media screen and (min-width: $breakpoint-lg) {
    padding: 0;
    &::before {
      content: '';
      position: absolute;
      top: -1.25rem;
      left: 0;
      height: 2px;
      width: 2rem;
      background-color: var(--primary-gray-dark);
    }
  }
  &__main {
    margin-bottom: 2rem;
  }
  &__text {
    @include paragraphBaseLight;
    color: var(--primary-gray-dark);
    &.text-short {
      @include textGradient(var(--primary-gray-dark));
      + .biography__content__toggler {
        .icon {
          rotate: 0deg;
        }
      }
    }
  }
  &__toggler {
    flex-direction: row-reverse;
    margin-top: 1.25rem;
    .icon {
      rotate: -180deg;
      height: fit-content;
      width: fit-content;
      transition: rotate 0.3s;
    }
  }
}

.biography__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media screen and (min-width: $breakpoint-md) {
    gap: 1.25rem;
  }
}

.biography--dark {
  .biography__wrapper,
  .biography__header {
    background-color: var(--primary-black);
    &__date {
      color: var(--secondary-gray);
    }
    &__name {
      color: var(--accent-gold);
      &::before {
        background-color: var(--accent-gold);
      }
    }
  }
  .biography__content {
    &::before {
      background-color: var(--primary-gray-light);
    }
    &__text {
      color: var(--primary-gray-light);
      &.text-short {
        @include textGradient(var(--primary-gray-light));
      }
    }
  }
}
</style>
