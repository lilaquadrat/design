<template>
    <section :id="id" :class="[view, fontVariant, variant, {hasImage: background}]" class="lila-module emotion-module fullscreen">

        <lila-picture-partial class="background" v-if="background" v-bind="background" />
        <lila-video-partial class="background" v-if="video" v-bind="video" />

        <div class="position-container">

            <lila-picture-partial class="picture" v-if="picture" v-bind="picture" />
            <lila-textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />

            <ul v-if="filteredLinks" class="list-links">
                <li v-for="(single, index) in filteredLinks" :key="`emotion-link-${index}`">

                    <lila-button-partial class="more" @click="scrollToNext" v-if="single.link === '#more'">{{single.text}}</lila-button-partial>
                    <lila-link-partial v-if="single.link !== '#more'" v-bind="single"></lila-link-partial>

                </li>
            </ul>

            <slot></slot>

        </div>

        <lila-button-partial @click="scrollToNext" v-if="scrollNotice" class="scrollButton">
            <lila-icons-partial colorScheme="white" size="large" type="mouse"></lila-icons-partial>
        </lila-button-partial>

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
    if (!filteredLinks?.length) filteredLinks = null;

    return filteredLinks;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-module.emotion-module {
  .module;

  position: relative;

  display: grid;
  overflow: hidden;
  width: 100%;

  height: 100vh;

  .modulePadding('full');

  @media @tablet, @desktop {
    padding: 40px @modulePaddingExt;
  }

  video,
  figure.background::v-deep {
    position: absolute;
    top: 0;
    left: 0;

    z-index: 0;
    width: 100%;
    height: 100%;

    source {
      display: none;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      overflow: hidden;
      width: 100%;
      height: 100%;
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

    position: absolute;
    right: 0;
    bottom: 50px;
    left: 0;
    display: grid;

    justify-self: center;

    margin: auto;
    color: @white;
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

  .lila-textblock {
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
    position: relative;

    display: grid;
    gap: 20px;
    align-self: end;
    justify-self: center;

    width: 100%;

    max-width: @desktopWidthExt;

    picture {

      img {
        max-height: 30vh;
      }
    }

  }

  &.picture-switch {

    .position-container {

      display: grid;

      .lila-figure {

        display: grid;

        grid-row-start: 3;
        justify-content: center;
        text-align: center;
      }

    }

  }

  &.content-inline {

    height: auto;
    .multi(padding, 16, 8);

    .position-container {

      position: relative;
      bottom: auto;
      left: auto;
      width: 100%;

      max-width: @desktopWidthExt;

      @media @desktop {

        h1, h2, h3, p {
          max-width: 60%;
        }
      }

      h1, h2, h3, p {
        max-width: 70%;
      }

    }

  }

  &.variant1 {
    text-align: center;

    .position-container {

      .multi(padding, 8);

      position: absolute;
      display: grid;
      gap: 40px;
      align-self: center;
      justify-self: center;

      .lila-textblock {

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

      ul {
        justify-content: center;
      }
    }

    &.content-inline {

      .position-container {

        position: relative;
        .multi(padding, 0);

        .lila-textblock {

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

    .lila-textblock {

      width: auto;

      background-color: rgba(255, 255, 255, .8);
      .multi(padding, 4);

    }

  }

  ul {

    display: flex;
    flex-wrap: wrap;
    gap: 10px 20px;
    justify-content: start;

  }
}
</style>
