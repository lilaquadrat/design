<template>
  <figure
    :class="[
      loadImage,
      { notLoaded: !loading },
      { noLoadAnimation: noLoadAnimation },
      { fit },
    ]"

    class="lila-figure"
  >
    <picture>
      <template v-if="loadImage">
        <source
          v-for="(source, i) in sourceMedia"
          :key="`p-${i}`"
          :media="`${source.media}`"
          :srcset="source.src"
        />
        <img :src="src" :alt="alt" />
      </template>

      <template v-if="!loading">
        <img :alt="alt" />
      </template>
    </picture>

    <figcaption v-if="copyright">{{ copyright }}</figcaption>
  </figure>
</template>
<script lang="ts">

import Picture, { PictureMedia } from '@interfaces/picture.interface';
import inview from '@libs/lila-inview';
import {
  ExtPartial, Component, Prop, Watch,
} from '../libs/lila-partial';

@Component
export default class PicturePartial extends ExtPartial {

  @Prop(String) alt: string;

  @Prop(String) src: string;

  @Prop(String) copyright: string;

  @Prop(Array) source: Picture['source'];

  @Prop(Boolean) noLoadAnimation: boolean;

  @Prop(Boolean) fit: boolean;

  loading: boolean = false;

  loadImage: boolean = false;

  view: string;

  @Watch('loading')
  watchLoading(): void {

    if (!this.loadImage) this.loadImage = true;

  }

  constructor() {

    super();

    if (this.$store?.state?.data?.settings?.html?.preloadImages) {

      this.loading = true;
      this.loadImage = true;

    }

  }

  mounted(): void {

    if (!this.$el.querySelector) return;

    const image = this.$el.querySelector('picture img') as HTMLImageElement;

    image.onload = () => {

      this.$emit('loaded');

    };

    const imageObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((single) => {

          if (single.isIntersecting) {

            this.loading = true;
            imageObserver.unobserve(image);

          }

        });

      },
      {
        rootMargin: '250px 0px',
      },
    );

    imageObserver.observe(image);

  }

  checkInview(): void {

    window.addEventListener('scrolled', () => {

      if (!this.loading) inview.checkImage(this);

    });

  }

  get sourceMedia(): PictureMedia[] {

    const source = [];
    const settings = this.$store?.state?.settings;

    this.source?.forEach((single, index) => {

      let media: string;

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

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-link.logo > .lila-figure {

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
        width: 100%;
        height: 100%;

        object-fit: cover;
    }

    .element {
      grid-template-columns: 1fr;
    }

  }

  picture {
    transition: opacity 0.5s ease, transform 0.5s ease;
    display: grid;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  figcaption {
    font-size: @fontTextSmaller;
    position: absolute;

    justify-self: end;
    align-self: end;

    color: @white;
    text-shadow: 1px 1px 1px @black;

    .multi(padding, 1);
    .multi(padding-right, 2);
  }
}
</style>
