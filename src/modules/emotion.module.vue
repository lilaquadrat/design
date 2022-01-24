<template>
    <section :class="[view, fontVariant, variant, {hasImage: background}]" class="module emotion-module fullscreen">

        <picture-partial class="background" v-if="background" v-bind="background" />
        <video-partial class="background" v-if="video" v-bind="video" />

        <div class="position-container">

            <picture-partial class="picture" v-if="picture" v-bind="picture" />
            <textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />

            <ul v-if="filteredLinks" class="list-links">
                <li v-for="(single, index) in filteredLinks" :key="`emotion-link-${index}`">

                    <button-partial class="more" @click="scrollToNext" v-if="single.link === '#more'">{{single.text}}</button-partial>
                    <link-partial v-if="single.link !== '#more'" v-bind="single"></link-partial>

                </li>
            </ul>

            <slot></slot>

        </div>

        <button @click="scrollToNext" v-if="scrollNotice" class="scrollButton">
            <icons-partial colorScheme="white" size="large" type="mouse"></icons-partial>
        </button>

    </section>

</template>
<script lang="ts">
import Link from '@interfaces/link.interface';
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import Video from '@interfaces/video.interface';
import {
  ExtComponent, Component, Prop, Watch,
} from '@libs/lila-component';

@Component
export default class EmotionModule extends ExtComponent {

  @Prop(Array) fontVariant: string[];

  @Prop(Object) textblock: Textblock;

  @Prop(Object) video: Video;

  @Prop(Object) background: Video;

  @Prop(Object) picture: Picture;

  @Prop(Array) links: Link[];

  @Watch('content')
  contentFunction(): void {

    if (this.variant?.includes('align')) {

      this.fullscreen = true;

    }

    this.checkInview();

  }

  mounted(): void {

    if (this.variant?.includes('align')) {

      this.fullscreen = true;

    }

    this.checkInview();

  }

  scrollToNext(): void {

    const next = this.$el.nextSibling as Element;

    next.scrollIntoView({
      behavior: 'smooth',
    });

  }

  get scrollNotice(): boolean {

    return this.variant?.includes('scrollNotice');

  }

  get backgroundStyle(): string {

    let style: string;

    if (this.background) {

      style = `background-image: url(${this.background?.src});`;
      Object.keys(this.background).forEach((key) => {

        const single = this.background.source[key];

        style += `
        @media (${single.media}) {
          background-image: url(${single.source});
        }`;

      });

    }

    return style;

  }

  get filteredLinks() {

    let filteredLinks = this.links?.filter((link) => !!link.text);

    if (!Array.isArray(filteredLinks)) filteredLinks = null;

    return filteredLinks;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.module.emotion-module {
  .module;

  height: 100vh;
  width: 100%;

  .modulePadding('full');

  position: relative;
  overflow: hidden;

  display: grid;

  video,
  figure.background::v-deep {

    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    source {
      display: none;
    }

    img {
      height: 100%;
      width: 100%;
      overflow: hidden;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }

  }

  video {
    object-fit: cover;
  }

  .picture {
    justify-self: center;
  }

  &.height50 {
    height: 50vh;
  }

  &.height80 {
    height: 80vh;
  }

  .scrollButton {

    justify-self: center;
    display: grid;
    color: @white;

    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;

    margin: auto;
  }

  a, .more {
    line-height: @buttonLineHeight;
    &.callToAction {
      border: none;
    }
  }

  .more {
    .font-head;
    font-size: @fontText;
  }

  .textblock {
    max-width: @moduleWidth_S;
  }

  &.bright::v-deep {

    h1,
    h2,
    h3,
    p {
      color: @white;
    }

    h1 {
      &:after {
        background-color: @white;
      }
    }

    a:not(.callToAction), .more {
      .trans(color);
      color: @white;

      &:hover {
        color: @color2;
      }

    }
  }

  &.dark::v-deep {

    a:not(.callToAction), .more {
      .trans(color);
      color: @color1;

      &:hover {
        color: @color3;
      }
    }

  }

  .position-container {

    max-width: @desktopWidthExt;
    position: relative;
    align-self: end;
    justify-self: center;

    width: 100%;

    display: grid;
    gap: 20px;

    picture {
      img {
        max-height: 30vh;
      }
    }

  }

  &.picture-switch {

    .position-container {

      display: grid;

      picture {

        display: grid;
        justify-content: center;
        text-align: center;

        grid-row-start: 3;
      }

    }

  }

  &.content-inline {

    height: auto;
    .multi(padding, 16, 8);

    .position-container {

      position: relative;
      left: auto;
      bottom: auto;

      max-width: @desktopWidthExt;
      width: 100%;

      h1, h2, h3, p {
        max-width: 70%;
      }

      @media @desktop {
        h1, h2, h3, p {
          max-width: 60%;
        }
      }

    }

  }

  &.variant1 {
    text-align: center;

    .position-container {

      position: absolute;
      display: grid;
      align-self: center;
      justify-self: center;

      .textblock {

        justify-self: center;

        h1, h2, h3, p {
          max-width: 100%;
        }

        h1 {
          font-size: @headline_L;
          line-height: @headlineLineHeight_L;

          @media @desktop {
            font-size: @headline_XL;
            line-height: @headlineLineHeight_XL;
          }

        }

      }

      .multi(padding, 8);
      gap: 40px;

      ul {
        justify-content: center;
      }
    }

    &.content-inline {

      .position-container {

        position: relative;
        .multi(padding, 0);

        .textblock {

          grid-template-columns: 1fr;

          justify-items: center;

          h1, h2, h3 {
            display: grid;
          }

        }

      }

    }

  }

  &.textBackground {

    .textblock {

      background-color: rgba(255, 255, 255, .8);
      .multi(padding, 4);

      width: auto;

    }

  }

  ul {

    display: flex;
    gap: 10px 20px;
    justify-content: start;
    flex-wrap: wrap;

  }
}
</style>
