<template>
  <section :class="[view, variant]" class="module facts-module">
    <textblock-partial class="intro-textblock" v-bind="textblock" />

    <section class="complete-container">
      <section v-if="isVariant1" class="list-links">
        <ul>
          <li v-for="(element, index) in elements" :key="`elements-${index}`">
            <icons-partial size="small" type="arrow-right"></icons-partial>
            <button-partial noPadding :class="{ active: index === active }"  @click="setActive(index)">
              {{ element.textblock.subline }}
            </button-partial>
          </li>
        </ul>
      </section>

      <div v-if="isVariant1" class="facts-container">
        <fact-partial v-bind="elements[active]" />
      </div>

      <div v-if="!isVariant1" class="facts-container">
        <fact-partial v-for="(element, index) in elements" :key="`fact-index-${index}`" v-bind="element"/>
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

.module.facts-module {
  .module;
  .modulePadding();

  max-width: @moduleWidth_S;

  gap: 40px;

  figure {
    display: none;
  }

  .facts-container {
    display: grid;
    grid-row-gap: 40px;
  }

  @media @desktop {
    figure {
      display: grid;
    }
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
        line-height: 20px;

        display: grid;
        grid-template-columns: 20px auto;

        align-content: start;

        .icon {
          height: 20px;
          align-self: start;
        }
      }

      li {
        button {
          .font-bold;

          cursor: pointer;

          text-transform: uppercase;
          color: @textColor;

          text-align: left;

          .trans(opacity);

          &:hover {
            opacity: 0.5;
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

    .textblock {
      max-width: @moduleWidth_S;
      justify-self: center;
    }

    .facts-container {
      display: grid;
      justify-content: center;
    }

    @media @desktop {
      .facts-container {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
      }
    }
  }
}
</style>
