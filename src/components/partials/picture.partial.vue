<template>
  <figure :class="[loadImage,{ notLoaded: !loading },{ noLoadAnimation: noLoadAnimation },{ fit, center }]" class="lila-figure" ref="root">
    <picture>
      <template v-if="loadImage">
        <source v-for="(source, i) in sourceMedia" :key="`p-${i}`" :media="`${source.media}`" :srcset="source.src" />
        <img :src="src" :alt="alt" />
      </template>

      <template v-if="!loading">
        <img :alt="alt" />
      </template>
    </picture>

    <figcaption v-if="copyright">{{ copyright }}</figcaption>
  </figure>
</template>
<script setup lang="ts">

import type Picture from '@interfaces/picture.interface';
import type { PictureMedia } from '@interfaces/picture.interface';
import { computed, onMounted, ref, watch, type Ref } from 'vue';

const props = defineProps<{
  alt: string;

  src: string;

  copyright?: string;
  source: Picture['source'];

  noLoadAnimation?: boolean;

  fit?: boolean;

  center?: boolean;


}>();
let emit = defineEmits<{
    (e: string): void
}>();
const root = ref(null);
let loading: Ref<boolean> = ref(false);
let loadImage: boolean = false;
let view: string;
// const store = useCounterStore();

watch(loading, (state, prevState) => {

  if (!loadImage) loadImage = true;
});


// const settings = computed(() => {

//   return JSON.stringify(this.$store?.state?.settings);

// });


// if (this.$store?.state?.settings?.preloadImages) {

loading = ref(true);
loadImage = true;

// }

onMounted((): void => {

  if (!(root.value as unknown as HTMLBaseElement).querySelector) return;

  const image = root.value.querySelector('picture img') as HTMLImageElement;

  image.onload = () => {

    emit('loaded');

  };

  const imageObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((single) => {

        if (single.isIntersecting) {

          loading.value = true;
          imageObserver.unobserve(image);

        }

      });

    },
    {
      rootMargin: '250px 0px',
    },
  );

  imageObserver.observe(image);

});


const sourceMedia = computed((): PictureMedia[] => {

  const source: { media: string; src: any; }[] = [];
  // const settings = this.$store?.state?.settings;
  const settings = {};

  props.source?.forEach((single: { media: string; src: any; }, index: number) => {

    let media: string = '';

    if (!single.media) {

      if (settings) {

        if (index === 0 && settings?.breakpointTablet?.length) media = settings.breakpointTablet;
        if (index === 1 && settings?.breakpointDesktop?.length) media = settings.breakpointDesktop;
        if (index === 2 && settings?.breakpointWide?.length) media = settings.breakpointWide;

      }

    } else {

      media = single.media;

    }

    if (media && single.src) {

      source.push({ media, src: single.src });

    }

  });

  return source.reverse();

});

</script>
<style lang="less" scoped>

.lila-link.logo>.lila-figure {

  picture {
    mix-blend-mode: normal;
  }

  &:hover {
    background-color: transparent;
  }

}

.lila-figure {
  position: relative;
  display: grid;

  &.notLoaded {

    picture {
      opacity: 0;
      transform: translateY(5px);
    }
  }

  &.noLoadAnimation {

    picture {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.fit {

    img {

      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .element {
      grid-template-columns: 1fr;
    }

  }

  &.center {

    img {
      justify-self: center;
    }

  }

  picture {
    display: grid;
    transition: opacity .5s ease, transform .5s ease;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  figcaption {
    position: absolute;
    align-self: end;

    justify-self: end;

    color: @white;
    font-size: @fontTextSmaller;
    text-shadow: 1px 1px 1px @black;

    .multi(padding, 1);
    .multi(padding-right, 2);
  }
}
</style>
