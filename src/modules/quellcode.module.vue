<template>
  <section :class="[variant, view]" class="lila-module lila-quellcode-module"  >
    <lila-textblock-partial v-bind="$props" />
    <lila-highlight-partial v-bind="$props" />
  </section>
</template>
<script lang="ts">
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class QuellcodeModule extends ExtComponent {

  @Prop(Array) text: string[];

  @Prop(String) code: string;

  @Prop(String) headline: string;

  @Prop(String) subline: string;

  @Prop(String) intro: string;

}
</script>

<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-quellcode-module {
  .module;
  .modulePadding('none');

  display: grid;
  gap: 40px;
  justify-items: center;
  max-width: @desktopWidthExt;

  .lila-textblock {
    .modulePadding();
    max-width: @desktopWidth;
    &.center {
      text-align: center;
    }

  }

}
</style>
