<template>
  <section :class="[variant, view]" class="module prices-module">

    <textblock-partial v-bind="textblock"></textblock-partial>

    <div class="prices-container">

      <section class="single-price"
      v-for="(element, elementIndex) in elements"
      :class="[variant, element.variant]"
      :key="`price-${elementIndex}`" >

        <header>
          <h1 v-if="element.textblock.headline">{{element.textblock.headline}}</h1>
          <h2 v-if="element.textblock.subline">{{element.textblock.subline}}</h2>

          <h3 v-if="element.textblock.intro">{{element.textblock.intro}}</h3>
        </header>

        <section class="content">

          <div class="price-container">
            <h2 class="price" v-if="element.price">{{element.price}}</h2>
            <h3 class="interval" v-if="element.interval">{{element.interval}}</h3>
          </div>

          <p v-for="(singleText, index) in element.textblock.text" :key="`text-${index}-${elementIndex}`">
            {{singleText}}
          </p>

          <li v-for="(single, index) in element.facts" :key="`list-element-${elementIndex}-${index}`">
            {{ single }}
          </li>

        </section>

        <footer>

          <link-partial class="button base"
          :class="{colorScheme1: highlight(element), colorScheme2: !highlight(element)}"
          v-if="element.callToAction" v-bind="element.callToAction"></link-partial>
          <link-partial v-if="element.more" v-bind="element.more"></link-partial>

        </footer>

      </section>

    </div>
  </section>
</template>
<script lang="ts">
import Textblock from '@interfaces/textblock.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';
import PricesElementModel from '@interfaces/PricesElement.interface';

@Component
export default class PricesModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Array) elements: PricesElementModel[];

  // eslint-disable-next-line class-methods-use-this
  highlight(element) {

    return element.variant?.includes('highlight');

  }

  mounted() {

    this.checkInview();

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.module.prices-module {
  .module;

  display: grid;
  gap: 80px;
  justify-items: center;

  .headlines;

  .textblock,
  .prices-container {

    max-width: @moduleWidth_S;
    width: 100%;

    @media @desktop {
      .modulePadding();
    }

  }

  .prices-container {
    display: grid;
    max-width:  @moduleWidth_M;
    gap: 80px;

    @media @tablet,
    @desktop {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 40px;
    }

    h3 {
      color: @textColor;
    }

    .single-price {

      display: grid;
      gap: 20px;

      grid-template-rows: minmax(60px, max-content) minmax(300px, 1fr) max-content;

      header {
        h1 {
          font-size: @headline_S;
        }
      }

      .content {
        display: grid;
        gap: 20px;

        align-items: start;
        align-content: start;

        .price-container {

          .multi(padding, 4, 0);

          display: grid;

          grid-template-columns: max-content max-content;
          gap: 10px;

          .price {
            font-size: 3em;
            line-height: .9em;

            color: @textColor;
          }

          .interval {
            .multi(padding-top, 1);
          }

          align-items: end;

          border-top: solid 2px @grey;
          border-bottom: solid 2px @grey;

        }

      }

      &.highlight {

        grid-row-start: 1;

        @media @tablet,
        @desktop {
          grid-row-start: auto;
        }

        .price-container {
          .price {
            color: @color1;
          }

          border-top: solid 2px @color1;
          border-bottom: solid 2px @color1;
        }

      }

      header {
        display: grid;
      }

      footer {
        a {

          display: block;
          text-align: center;

          line-height: 35px;

          &+a {
            .multi(margin-top, 2);
          }

        }
      }

    }

  }

  &:nth-child(even) {
    background: none;
  }

}
</style>
