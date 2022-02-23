<template>
  <section
    :class="[variant, view]"
    class="lila-module lila-quellcode-module"
  >
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

  display: grid;
  gap: 40px;

  justify-items: center;
  padding: 0;


  max-width: @moduleWidth_M;

  .lila-textblock
  {
    max-width: @moduleWidth_S;
    padding: 0 40px;
    &.center {
      text-align: center;
    }

  }


}
</style>
