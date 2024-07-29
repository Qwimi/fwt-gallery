<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, onMounted, ref, watch } from 'vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import IconChangePic from '@/components/icons/IconChangePic.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import NoImage from '@/shared/ui/NoImage';
import { useAuthStore } from '@/stores/authStore';
import type { CardInterface } from '@/stores/types';
import 'swiper/css';

const props = defineProps<{
  slides: CardInterface[];
  openSlide: string | null;
  mainPainting?: string | null;
}>();

defineEmits(['close', 'makeTheCover', 'editPic', 'deletePic']);

const swiperInstanse = ref();
const currentSlide = computed(() => props.slides[swiperInstanse.value?.realIndex || 0]);
const currentIndex = computed(() => swiperInstanse.value?.realIndex + 1);

const isUserAuth = ref(useAuthStore().isUserAuth);
const buttonText = computed(() =>
  props.mainPainting === currentSlide.value.id ? 'Remove the cover' : 'Make the cover'
);

const onSwiper = (swiper: any) => {
  swiperInstanse.value = swiper;
};

const findIndex = (id: string | null) =>
  props.slides.findIndex((slide: CardInterface) => slide.id === id);

const onChangeSlide = (slideTo: number) => {
  if (slideTo === -1 || slideTo >= props.slides.length) {
    swiperInstanse.value.slideTo(props.slides.length - 1);

    return;
  }
  swiperInstanse.value.slideTo(slideTo);
};

watch(
  () => props.slides.length,
  () => onChangeSlide(currentIndex.value)
);

onMounted(() => onChangeSlide(findIndex(props.openSlide)));
</script>

<template>
  <Teleport to="body">
    <swiper class="swiper" @swiper="onSwiper" :loop="true">
      <div class="tools-row tools-row--top">
        <button-base
          variant="icon-always-light"
          v-if="isUserAuth"
          @click="$emit('makeTheCover', currentSlide.id)"
        >
          <template #icon><icon-change-pic class="icon" /></template>
          {{ buttonText }}
        </button-base>
        <button class="swiper__button tools-row__right-column" @click="$emit('close')">
          <icon-close class="icon" />
        </button>
      </div>
      <button class="swiper__button swiper__button--next" @click="swiperInstanse.slideNext()">
        <icon-arrow class="icon" />
      </button>
      <button class="swiper__button swiper__button--prev" @click="swiperInstanse.slidePrev()">
        <icon-arrow class="icon" />
      </button>

      <div class="tools-row tools-row--bottom">
        <div class="tools-row__buttons" v-if="isUserAuth">
          <button-base variant="icon-always-light" @click="$emit('editPic', currentSlide)">
            <icon-edit class="icon" />
          </button-base>
          <button-base variant="icon-always-light" @click="$emit('deletePic', currentSlide.id)">
            <icon-delete class="icon" />
          </button-base>
        </div>
        <div class="description__info">
          <div class="description__buttons" v-if="isUserAuth">
            <button-base variant="icon" @click="$emit('editPic', currentSlide)">
              <icon-edit class="icon" />
            </button-base>
            <button-base variant="icon" @click="$emit('deletePic', currentSlide.id)">
              <icon-delete class="icon" />
            </button-base>
          </div>
          <div class="description__text">
            <div class="description__date">{{ currentSlide?.date }}</div>
            <div class="description__title">{{ currentSlide?.name }}</div>
          </div>
        </div>
        <div class="pagination tools-row__right-column">
          {{ currentIndex }} / {{ slides.length }}
        </div>
      </div>

      <swiper-slide v-for="slide in slides" :key="slide.id">
        <img
          :src="slide.image2x || slide.image"
          alt="can't load the picture"
          v-if="slide.image"
          class="swiper__img"
        />
        <no-image v-else />
      </swiper-slide>
    </swiper>
  </Teleport>
</template>

<style lang="scss" scoped>
.swiper {
  position: fixed;
  inset: 0;
  background-color: var(--background-primary);
  z-index: 3;

  &__img {
    height: 100%;
  }

  &__button {
    @include buttonMixin;
    color: var(--gray_de);

    &:focus,
    &:hover {
      color: var(--white_ff);
    }

    &--next,
    &--prev {
      position: absolute;
      z-index: 1;
      top: 0;
      width: 2.5rem;
      height: 100%;
      display: none;
      .icon {
        width: 100%;
        height: auto;
      }
      @media (min-width: $breakpoint-md) {
        display: block;
      }
    }

    &--prev {
      left: 0;
      rotate: 180deg;
    }

    &--next {
      right: 0;
    }
  }
}

.description {
  @include descriptionMixin;
  &__info {
    bottom: 2.5rem;
    left: -1.5rem;
    padding: 1rem 0;
    width: calc(100vw - 3.75rem);
    max-width: 500px;
    @media (min-width: $breakpoint-md) {
      bottom: 0;
      left: 0;
      padding: 2.5rem 0;
    }
  }

  &__text {
    padding: 0 0.75rem;

    &::before {
      display: none;
    }

    @media (min-width: $breakpoint-md) {
      padding: 0 1.25rem;

      &::before {
        display: block;
      }
    }
  }

  &__buttons {
    position: absolute;
    gap: 1.25rem;
    top: 1.25rem;
    right: 1.25rem;
    display: none;
    @media (min-width: $breakpoint-md) {
      display: flex;
    }
  }
}

.tools-row {
  @include toolsRow;
  z-index: 2;
  transform: translateX(0);
  &--top {
    top: 1.25rem;

    @media (min-width: $breakpoint-md) and (max-width: calc($breakpoint-lg - 1px)) {
      top: 2.5rem;
      margin: 0 2.5rem;
    }
  }

  &--bottom {
    align-items: flex-end;
    bottom: 1.25rem;

    @media (min-width: $breakpoint-md) and (max-width: calc($breakpoint-lg - 1px)) {
      bottom: 3.75rem;
      margin: 0 2.5rem;
    }
  }

  &__buttons {
    display: flex;
    gap: 1.25rem;
    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }

  &__column-right {
    width: fit-content;
  }
}

.pagination {
  @include headingH5;
  color: var(--gray_de);

  @media (min-width: $breakpoint-md) {
    @include headingH3;
  }
}
</style>
