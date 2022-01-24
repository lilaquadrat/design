<template>
  <section :class="[variant, {gap: gap}]" class="link-group">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class LinkGroupPartial extends ExtPartial {

  @Prop(Boolean) gap: boolean;

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.link-group {

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  justify-content: start;

  &.center {
    justify-content: center;
  }

  &.gap {
    gap: 20px;
  }

}
</style>
