<template>
  <figure class="lila-quote">
    <blockquote :class="[variant, textSize]" v-if="notEmpty">
        <p v-for="(singleText, index) in quote" :key="`quote-${index}`">
          <template v-if="index==0">"</template>
          {{ singleText }}
          <template v-if="index==quote.length-1">"</template>
        </p>
    </blockquote>
    <figcaption :class="variant">
      <span v-if="citation || linkExists">{{ citation }}</span><span v-if="citation && linkExists">,</span>
        <cite v-if="link.text">
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

  @Prop(Array) quote: string[];

  @Prop(Object) link: Link;

  @Prop(String) citation: string;

  textSize: string = '';

  @Watch('quote')
  contentFunction(): void {

    this.setTextSize();

  }

  get notEmpty(): boolean {

    return !!this.quote;

  }

  setTextSize(): void {

    const textLength = this.getTextLength();

    if (textLength) {

      if (textLength <= 10) this.textSize = 'headline_XL';

      else if (textLength <= 20) this.textSize = 'headline_L';

      else if (textLength <= 75) this.textSize = 'headline_M';

      else if (textLength <= 150) this.textSize = 'headline_S';

      else this.textSize = 'headline_XS';

    }

  }

  getTextLength(): number {

    let textLen = 0;

    this.quote.forEach((line) => {

      textLen += line.length;

    });
    return textLen;

  }

  mounted() {

    this.setTextSize();

  }

  get linkExists() {

    return this.link.text && this.link.link;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-quote {

  display: grid;
  gap: 15px;

  blockquote {
    p {
      .font-head;
      color: @color1;
    }

    &.headline_XL {
      font-size: @headline_XL;
      line-height: @headlineLineHeight_XL;
    }

    &.headline_L {
      font-size: @headline_L;
      line-height: @headlineLineHeight_L;
    }

    &.headline_M {
      font-size: @headline_M;
      line-height: @headlineLineHeight_M;
    }

    &.headline_S {
      font-size: @headline_S;
      line-height: @headlineLineHeight_S;
    }

    &.headline_XS {
      font-size: @headline_XS;
      line-height: @headlineLineHeight_XS;
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
