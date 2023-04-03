<template>
  <section :id="id" :class="[view, variant]" class="lila-facts-module lila-module">
    <lila-textblock-partial class="intro-textblock" v-bind="textblock" />

    <section class="complete-container">
      <section v-if="isVariant1" class="list-links">
        <ul>
          <li v-for="(element, index) in elements" :key="`elements-${index}`">
            <lila-icons-partial size="small" type="arrow-right"></lila-icons-partial>
            <lila-button-partial noPadding :class="{ active: index === active }"  @click="setActive(index)">
              {{ element.textblock.subline }}
            </lila-button-partial>
          </li>
        </ul>
      </section>

      <section v-if="isVariant3" class="list-links">
        <ul>
          <li v-for="(element, index) in elements" :key="`elements-${index}`">
            <lila-icons-partial size="small" type="arrow-right"></lila-icons-partial>
            <h2 :class="{ active: index === active }" @keypress="setActive(index)"  @click="setActive(index)">
              {{ element.textblock.subline }}
            </h2>
          </li>
        </ul>
      </section>

      <div v-if="isVariant1 || isVariant3" class="facts-container">
        <lila-fact-partial v-bind="elements[active]" />
      </div>

      <div v-if="!isVariant1 && !isVariant3" class="facts-container">
        <lila-fact-partial v-for="(element, index) in elements" :variant="variant" :key="`fact-index-${index}`" v-bind="element"/>
      </div>

      <slot></slot>
    </section>
  </section>
</template>
<script lang="ts">

import Textblock from '@interfaces/textblock.interface';
import Fact from '@interfaces/Fact.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class FactsModule extends ExtComponent {

  @Prop(Object) content;

  @Prop(Object) textblock: Textblock;

  @Prop(Array) elements: Fact[];

  active: number = 0;

  get isVariant1() {

    return this.variant?.includes('variant1');

  }

  get isVariant3() {

    return this.variant?.includes('variant3');

  }

  mounted() {

    this.checkInview();

  }

  setActive(index: number) {

    this.active = index;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-facts-module {
  .module;
  .modulePadding();

  gap: 40px;

  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  @media @desktop {

    figure {
      display: grid;
    }
  }

  figure {
    display: none;
  }

  .facts-container {
    display: grid;
    grid-row-gap: 40px;
  }

  .complete-container {
    display: grid;
    gap: 40px 0;
  }

  &.variant1 {

    @media @desktop {

      .complete-container {
        display: grid;
        grid-template-columns: min-content 1fr;
        gap: 40px;
      }
    }

    ul {
      display: grid;
      align-content: start;

      li {

        display: grid;
        grid-template-columns: 20px auto;

        align-content: start;
        line-height: 20px;

        .icon {
          align-self: start;
          height: 20px;
        }

        .lila-button::v-deep {
          .font-bold;
          height: 30px;
          color: @textColor;
          line-height: 30px;

          text-align: left;

          text-transform: uppercase;

          cursor: pointer;

          .trans(opacity);

          &:hover {
            opacity: .5;
          }

          &.active {
            color: @color1;
          }
        }
      }
    }
  }

  &.variant2 {
    max-width: @moduleWidth_M;

    @media @desktop {

      .facts-container {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
      }
    }

    .lila-textblock {
      justify-self: center;
      max-width: @moduleWidth_S;
    }

    .facts-container {
      display: grid;
      justify-content: center;
    }
  }

  &.variant3 {
    max-width: @moduleWidth_M;
    .headlines;

    .complete-container {
      gap: 60px;

      @media @desktop {
        grid-template-columns: 1fr 2fr;
        gap: 80px;
      }

      h2 {
        color: @grey;
        font-size: @headline_S;
        line-height: @headlineLineHeight_S;
        cursor: pointer;
        .trans(color);

        &:hover {
          color: @color1;
        }

        &.active {
          color: @color1;
        }
      }

      ul {
        display: grid;
        gap: 10px;

        li {
          display: grid;
          grid-template-columns: min-content 1fr;
          gap: 10px;

          .lila-icons-partial {
            align-self: start;
            .multi(margin-top, 1);
          }
        }
      }

      .lila-fact-partial::v-deep {

        grid-template-rows: min-content;

        h2 {
          display: none;
        }
      }

    }
  }

  &.threeRow {

    @media @desktop {

      .facts-container {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 40px;
      }
    }
  }

}
</style>
