<script lang="ts" setup>
import type { Genre } from '@/stores/types'
import TheLabel from '@/components/label/TheLabel.vue'
import ButtonUnderline from '@/components/button/ButtonUnderline.vue'
import IconExpand from '@/components/icons/IconExpand.vue'
import { ref, type Ref } from 'vue'

const props = defineProps({
  name: String,
  yearsOfLife: String,
  biography: String,
  genres: Array<Genre>
})

const maxStrLenght = 265
const isExpandable: Ref<Boolean> = ref(true)
const isExpanded: Ref<Boolean> = ref(!isExpandable.value)
const biographyClass: Ref<String> = ref(isExpanded.value ? '' : 'text-short')

const biographyText = () => {
  return isExpanded.value ? props.biography : `${props.biography?.slice(0, maxStrLenght)}...`
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  biographyClass.value = isExpanded.value ? '' : 'text-short'
}
</script>

<template>
  <div class="biography">
    <div class="biography_wrapper">
      <div class="biography_header">
        <p class="biography_header_date">
          {{ yearsOfLife }}
        </p>
        <p class="biography_header_name">
          {{ name }}
        </p>
      </div>
      <div class="biography_content">
        <div class="biography_content_main">
          <p class="biography_content_main_text" :class="biographyClass">
            {{ biographyText() }}
          </p>
          <button-underline
            class="biography_content_main_btn"
            :class="biographyClass"
            v-if="isExpandable"
            @click="toggleExpand"
          >
            <template v-if="isExpanded">read less</template>
            <template v-else>read more</template>
            <template #icon><icon-expand class="icon" /></template>
          </button-underline>
        </div>
        <div class="biography_genres">
          <the-label v-for="genre in genres" :key="genre._id">{{ genre.name }}</the-label>
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

    &_wrapper {
      max-width: 604px;
      background-color: var(--background);
      padding: 3.25rem 5rem;
      margin-top: 3.25rem;
    }
    &_content,
    &_header {
      padding: 0;
    }
  }
}

.biography_header {
  background-color: var(--background);
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  width: calc(100% - 1.25rem);
  max-width: 560px;
  color: var(--primary-gray-d);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;

  &_date {
    @include captionMedium12;
    @media screen and (min-width: $breakpoint-md) {
      @include captionMedium16;
    }
  }

  &_name {
    @include headingH3;
    color: var(--accent);
    position: relative;
    @media screen and (min-width: $breakpoint-md) {
      @include headingH2;
      &::before {
        content: '';
        height: 100%;
        width: 2px;
        position: absolute;
        top: 0;
        left: -1.25rem;
        background: var(--accent);
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

.biography_content {
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
      background-color: var(--primary-text-dafault);
    }
  }
  &_main {
    margin-bottom: 2rem;
    &_text {
      max-width: 265ch;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      color: var(--primary-text-dafault);
      @include paragraphBaseLight;

      &.text-short {
        @include textGradient(var(--primary-text-dafault));
        .button_icon {
          transform: rotate(180deg);
        }
      }
    }
    &_btn {
      flex-direction: row-reverse;
      margin-top: 1.25rem;

      .icon {
        height: fit-content;
        width: fit-content;
        transition: transform 0.3s;
        transform: rotate(-180deg);
      }
      &.text-short {
        .icon {
          transform: rotate(0);
        }
      }
    }
  }
}

.biography_genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media screen and (min-width: $breakpoint-md) {
    gap: 1.25rem;
  }
}
</style>
