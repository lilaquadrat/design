<template>
<section :id="id" :class="[variant, view]" class="lila-picturegroup-module lila-module">

  <section class="content-container">
    <lila-textblock-partial :variant="[brightText]" v-if="textblock" v-bind="textblock" />

    <section class="elements-container">

      <component v-for="(element, index) in elements" :key="`picturegroup-element-${index}`" class="element" :is="componentType(element.link)" v-bind="element.link">
        <lila-picture-partial v-if="element.picture" center :fit="fitVariant" v-bind="element.picture" />
        <lila-textblock-partial :variant="[brightText]" v-if="element.textblock" v-bind="element.textblock" />
        <lila-list-partial :variant="['noStyle']" v-bind="element.list"></lila-list-partial>
        <lila-list-partial :variant="linkVariant" v-bind="element.links"></lila-list-partial>
      </component>

    </section>

  </section>
</section>

</template>
<script lang="ts">
import Link from '@interfaces/link.interface';
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import PictureGroupElement from '@interfaces/PictureGroupElement.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class PicturegroupModule extends ExtComponent {

  @Prop(Array) elements: PictureGroupElement[];

  @Prop(Object) picture: Picture;

  @Prop(Object) textblock: Textblock;

  mounted(): void {

    this.checkInview();

  }

  // eslint-disable-next-line class-methods-use-this
  componentType(link: Link): 'lila-link-partial' | 'section' {

    return link?.link?.length
      ? 'lila-link-partial'
      : 'section';

  }

  // eslint-disable-next-line class-methods-use-this
  getLink(link: Link): string {

    return link?.link?.length
      ? link.link
      : 'section';

  }

  get linkVariant() {

    if (this.variant.includes('product')) return ['actions', 'center'];

    return ['noStyle'];

  }

  get fitVariant() {

    return this.variant.includes('fit');

  }

  get brightText() {

    return this.variant.includes('color1') || this.variant.includes('color3') ? 'bright' : undefined;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-picturegroup-module {
  .module;
  .modulePadding();

  width: 100%;

  word-break: break-word;

  picture {

    img {
      align-content: center;
      justify-content: center;
    }
  }

  &.noText {

    .lila-textblock {
      display: none;
    }
  }

  &.centerText {

    .lila-textblock {
      text-align: center;
    }
  }

  &.color1 {
    background-color: @color1;
  }

  &.color3 {
    background-color: @color3;
  }

  &.color1,
  &.color3 {

    .modulePadding('full');

    color: @white;

    h1, h2, h3 {
      color: @white;
    }

  }

  .lila-textblock {
    justify-self: center;

    width: 100%;
    max-width: @moduleWidth_S;
    text-align: left;
  }

  .content-container {

    .elements-container {
      justify-self: center;
      width: 100%;
      max-width: @desktopWidthExt;
    }

  }

  &.small {

    .content-container {

      .elements-container {
        max-width: @desktopWidth;
      }

    }
  }

  &.variant1,
  &.variant4 {

    .content-container {
      display: grid;
      gap: 40px;

      .elements-container {
        display: grid;
        gap: 40px;

        @media @tablet,
          @desktop {
          grid-template-rows: max-content max-content;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px 2%;
        }
      }

      a {
        .basicHover;
      }

      .element {
        display: grid;

        grid-template-rows: min-content max-content;

        gap: 20px;
        align-content: start;
        justify-content: center;

        @media @desktop {
          justify-content: start;
        }

        picture::v-deep {
          overflow: hidden;
          max-width: 100%;

        }

        .lila-textblock {
          align-content: start;
          text-align: center;

          h2 {
            font-size: 1.4em;
          }
        }
      }

    }

  }

  &.variant4 {

    .content-container {

      .element {
        grid-template-rows: auto;
        grid-template-columns: 1fr;
      }

      .elements-container {
        display: grid;
        gap: 40px;

        @media @tablet {
          grid-template-rows: max-content;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 40px;
        }

        @media @desktop {
          grid-template-rows: max-content;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 40px;
        }

      }

    }

  }

  &.variant2, &.variant5 {

    .content-container {
      display: grid;
      gap: 40px;

      text-align: center;

      .elements-container {
        display: grid;

        grid-template-rows: max-content max-content max-content max-content;
        grid-template-columns: 1fr;
        gap: 40px;

        @media @tablet,
          @desktop {
          grid-template-rows: max-content max-content;
          grid-template-columns: 1fr 1fr 1fr;
        }
      }

      a {
        .basicHover;
      }

      .element {

        display: grid;

        @media @tablet,
          @desktop {

          &:first-child {
            grid-column-start: 1;
            grid-column-end: 4;

          }
        }

      }

    }

  }

  &.variant5 {

    .content-container {
      display: grid;
      gap: 40px;

      .elements-container {
        display: grid;

        grid-template-rows: max-content max-content max-content max-content max-content;
        grid-template-columns: 1fr;
        gap: 40px;

        @media @tablet,
          @desktop {
          grid-template-rows: max-content max-content;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
      }

      a {
        .basicHover;
      }

      .element {

        @media @tablet,
          @desktop {

          &:first-child {
            grid-column-start: 1;
            grid-column-end: 5;

          }
        }

      }

    }

  }

  &.variant3 {

    .content-container {
      display: grid;
      gap: 40px;

      text-align: center;

      .elements-container {
        position: relative;
        display: grid;

        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr;
        gap: 40px;

        @media @tablet,
          @desktop {
          grid-template-columns: 2fr 1fr;
        }
      }

      .element {

        display: grid;

        @media @tablet,
          @desktop {

          grid-column-start: 2;

          &:first-child {
            display: grid;

            grid-row-start: 1;
            grid-row-end: 4;

            grid-column-start: 1;
            grid-column-end: 2;

            picture {
              img {
                object-fit: cover;
              }
            }
          }
        }
      }

    }

  }

  &.contact {

    text-align: left;

    .content-container {

      .elements-container {

        .element {

          display: grid;

          grid-template-columns: 100%;
          gap: 20px;
          align-content: start;
          justify-content: start;
          text-align: left;

          .lila-list-links, .lila-textblock {
            .multi(padding, 0, 4)
          }

          .lila-textblock::v-deep {
            gap: 5px;
            text-align: left;

            h1 {
              font-size: @headline_S;

              @media @tablet,
                @desktop {
                font-size: @headline_S;
              }
            }

            h2 {
              font-size: @headline_XS;
            }

            .link-list {

              a {
                .font-head;
              }
            }
          }

        }
      }
    }

  }

  &.product {

    .content-container {

      display: grid;

      .elements-container {
        position: relative;
        display: grid;

        grid-template-columns: 1fr;
        gap: 40px;
        align-items: center;

        justify-items: center;

        .element {

          display: grid;
          gap: 40px;
          align-content: center;
          align-self: center;
          justify-content: center;
          justify-self: center;

          .lila-list-links, .lila-textblock {
            .multi(padding, 0, 4)
          }

          .lila-textblock::v-deep {
            gap: 5px;
            max-width: @moduleWidth_XS;
            text-align: center;

            h1 {
              font-size: @headline_S;

              @media @tablet,
                @desktop {
                font-size: @headline_S;
              }
            }

          }

        }
      }

    }

  }

}
</style>
