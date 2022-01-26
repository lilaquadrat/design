<template>
  <section class="lila-description-partial" :class="[type, { padding: padding, margin: margin, background: background }]">
    <h4 v-if="label">{{ label | translate }}</h4>
    <p><slot></slot></p>
  </section>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class DescriptionPartial extends ExtPartial {

  @Prop(String) label: string;

  @Prop(Boolean) padding: boolean;

  @Prop(Boolean) margin: boolean;

  @Prop(String) type: string;

  @Prop({ type: Boolean, default: true }) background: boolean;

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-description-partial {
  .font-bold;
  color: @color1;
  font-size: @fontTextSmaller;
  text-align: left;

  border-left: solid 2px @color1;

  .multi(padding, 2);

  display: grid;
  gap: 10px;

  h4 {
    text-transform: uppercase;
    font-size: @fontTextSmaller;
    .font-head;
  }

  p {
    font-size: @fontTextSmaller;
  }

  &.background {
    background-color: @grey1;
  }

  &.success {
    border-left-color: @success;
    background-color: @success;
    color: @white;

    h4 {
      color: @white;
    }
  }

  &.error {
    border-left-color: @error;
    background-color: @error;
    color: @white;

    h4 {
      color: @white;
    }
  }

  &.margin {
    .multi(margin-top, 4);
    .multi(margin-bottom, 4);
  }

  &.padding {
    .multi(padding, 4);
  }
}
</style>
