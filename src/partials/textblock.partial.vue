<template>
  <section :class="[variant]" v-if="notEmpty" class="lila-textblock">
    <h1 v-if="headline">{{ headline }}</h1>
    <h2 v-if="subline">{{ subline }}</h2>

    <h3 v-if="intro">{{ intro }}</h3>
    <p v-for="(singleText, index) in text" :key="`text-${index}`">
      {{ singleText }}
    </p>

    <slot></slot>
  </section>
</template>
<script lang="ts">
import Picture from '@interfaces/picture.interface';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class textblockPartial extends ExtPartial {

  @Prop(String) headline: string;

  @Prop(String) subline: string;

  @Prop(String) intro: string;

  @Prop(String) picture: Picture;

  @Prop(Array) text: string[];

  @Prop(Array) variant: string[];

  get notEmpty(): boolean {

    return !!(this.headline || this.subline || this.intro || this.picture || this.text);

  }

}
</script>
<style lang="less" scoped>
@import (reference) '@{projectPath}/source/less/shared.less';

.lila-textblock {
  display: grid;
  gap: 15px;
  width: 100%;
  word-break: break-word;

  .headlines;

  p {
    .font-normal;
    color: @textColor;
    font-size: @fontText;
  }

  h2 + h3 {
    .multi(margin-top, 2);
  }

  &.bright {

    h1, h2, h3, h4, h5, p {
      color: @white;
    }
  }

  &:empty {
    display: none;
  }
}
</style>
