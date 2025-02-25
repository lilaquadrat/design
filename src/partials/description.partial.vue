<template>
  <section class="lila-description-partial" :class="[type, { padding: padding, margin: margin, background: background }]">
    <h4 v-if="label">{{ $translate(label) }}</h4>
    <p>
      <slot />
    </p>
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


.lila-description-partial {
  .font-bold;

  display: grid;
  gap: 10px;

  border-left: solid 2px @color1;
  color: @color1;
  font-size: @fontTextSmaller;
  text-align: left;

  .multi(padding, 2);

  h4 {
    font-size: @fontTextSmaller;
    text-transform: uppercase;
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
