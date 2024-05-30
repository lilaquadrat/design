<template>
  <section :class="{ gap: gap, left: left, center: center }" class="lila-button-group">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class ButtonGroupPartial extends ExtPartial {

  @Prop(Boolean) gap: boolean;

  @Prop(Boolean) left: boolean;

  @Prop(Boolean) center: boolean;

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-button-group {

  display: flex;
  gap: 10px;

  justify-content: end;
  flex-direction: row-reverse;
  flex-wrap: wrap;

  &.gap {
    gap: 10px 20px;
  }

  &.left {
    justify-content: start;
  }

  &.center {
    justify-content: center;
  }

}
</style>
