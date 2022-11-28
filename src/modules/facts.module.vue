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

      <div v-if="isVariant1" class="facts-container">
        <lila-fact-partial v-bind="elements[active]" />
      </div>

      <div v-if="!isVariant1" class="facts-container">
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
      }

      li {

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
