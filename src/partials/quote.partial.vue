<template>
  <figure class="lila-quote">
    <blockquote :class="[variant, textSize]" v-if="notEmpty">
      "{{ quote }}"
    </blockquote>
    <figcaption ref='checkPartialSize' :class="variant">
      <span v-if="citation || linkExists">{{ citation }}</span><span v-if="citation && linkExists">,</span>
        <cite v-if="linkExists">
          <lila-link-partial v-bind="link"></lila-link-partial>
        </cite>

    </figcaption>
  </figure>
</template>

<script lang="ts">
import Link from '@interfaces/link.interface';
import {
  Component, ExtPartial, Prop, Watch,
} from '../libs/lila-partial';


@Component
export default class quotePartial extends ExtPartial {

  @Prop(String) quote: string;

  @Prop(Object) link?: Link;

  @Prop(String) citation: string;

  textSize: string = '';

  @Watch('quote')
  contentFunction(): void {

    this.setTextSize();

  }

  @Watch('variant')
  function(): void {

    this.setTextSize();

  }

  get notEmpty(): boolean {

    return !!this.quote;

  }

  setTextSize(): void {


    this.$nextTick().then(() => {

      const element = this.$refs.checkPartialSize as HTMLInputElement;

      // Small Sized Partial
      if (this.quote.length && element.classList.contains('small')) {

        if (this.quote.length <= 20) this.textSize = 'headline_XL';

        else if (this.quote.length <= 65) this.textSize = 'headline_L';

        else if (this.quote.length <= 125) this.textSize = 'headline_M';

        else if (this.quote.length <= 170) this.textSize = 'headline_S';

        else this.textSize = 'headline_XS';

      }

      // Normal Sized Partial
      else if (this.quote.length) {


        if (this.quote.length <= 45) this.textSize = 'headline_XL';

        else if (this.quote.length <= 100) this.textSize = 'headline_L';

        else if (this.quote.length <= 150) this.textSize = 'headline_M';

        else if (this.quote.length <= 390) this.textSize = 'headline_S';

        else this.textSize = 'headline_XS';

      }

    });

  }

  mounted() {

    this.setTextSize();

  }

  get linkExists() {

    return this.link?.text && this.link?.link;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-quote {

  display: grid;
  gap: 15px;

  blockquote {
    .font-head;
    color: @color1;

    &.headline_XL {
      font-size: @headline_XL;
      line-height: @headlineLineHeight_XL;

      @media @smartphone {
        font-size: @headline_L;
        line-height: @headlineLineHeight_XL;
      }
    }

    &.headline_L {
      font-size: @headline_L;
      line-height: @headlineLineHeight_XL;
    }

    &.headline_M {
      font-size: @headline_M;
      line-height: @headlineLineHeight_L;
    }

    &.headline_S {
      font-size: @headline_S;
      line-height: @headlineLineHeight_M;
    }

    &.headline_XS {
      font-size: @headline_XS;
      line-height: @headlineLineHeight_S;
    }

    &.quoteRight{
      text-align: right;
    }

    &.quoteCenter{
      text-align: center;
    }

  }

  figcaption {

    font-size: @fontTextSmaller;
    &.authCenter{
      text-align: center;
    }
    &.authRight{
      text-align: right;
    }
  }

}
</style>
