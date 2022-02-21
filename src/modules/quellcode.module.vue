<template>
  <section
    :class="[variant, view]"
    class="lila-module lila-quellcode-module"
  >
    <lila-textblock-partial v-bind="$props" :variant="textblockVariant" />
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

  get textblockVariant() {

    return this.variant.includes('notice') ? ['bright'] : [];

  }

}
</script>

<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-quellcode-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  &.center {
    text-align: center;
  }

  &.notice {
    .modulePadding("none");
    max-width: 100%;
    justify-content: center;

    .lila-textblock {
      .modulePadding("full");

      max-width: @moduleWidth_S;
      color: @white;

      h1,
      h2,
      h3,
      p {
        color: @white;
      }
    }

    background-color: @color1;
  }
}
</style>
