<template>
  <section :id="id" :class="[variant, view]" class="lila-prices-module lila-module">

    <lila-textblock-partial v-bind="textblock"></lila-textblock-partial>

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

          <lila-link-partial class="button base callToAction" :class="{colorScheme1: highlight(element), colorScheme2: !highlight(element)}"
          v-if="element.callToAction" v-bind="element.callToAction" />
          <lila-link-partial v-if="element.more" v-bind="element.more" />

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

.lila-prices-module {
  .module;

  display: grid;
  gap: 80px;
  justify-items: center;

  .headlines;

  .lila-textblock,
  .prices-container {
    width: 100%;

    max-width: @moduleWidth_S;

    @media @desktop {
      .modulePadding();
    }

  }

  .prices-container {
    display: grid;
    gap: 80px;
    max-width: @moduleWidth_M;

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

      grid-template-rows: minmax(60px, max-content) minmax(300px, 1fr) max-content;
      gap: 20px;

      header {

        h1 {
          font-size: @headline_S;
        }
      }

      .content {
        display: grid;
        gap: 20px;
        align-content: start;

        align-items: start;

        .price-container {

          .multi(padding, 4, 0);

          display: grid;

          grid-template-columns: max-content max-content;
          gap: 10px;

          align-items: end;

          border-top: solid 2px @grey;
          border-bottom: solid 2px @grey;

          .price {

            color: @textColor;
            font-size: 3em;
            line-height: .9em;
          }

          .interval {
            .multi(padding-top, 1);
          }

        }

      }

      &.highlight {

        grid-row-start: 1;

        @media @tablet,
          @desktop {
          grid-row-start: auto;
        }

        .price-container {

          border-top: solid 2px @color1;
          border-bottom: solid 2px @color1;

          .price {
            color: @color1;
          }
        }

      }

      header {
        display: grid;
      }

      footer {

        a {

          display: block;

          line-height: 35px;
          text-align: center;

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
