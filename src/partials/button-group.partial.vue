<template>
  <section :class="{gap: gap}" class="lila-button-group">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class ButtonGroupPartial extends ExtPartial {

  @Prop(Boolean) gap: boolean;

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

}
</style>
