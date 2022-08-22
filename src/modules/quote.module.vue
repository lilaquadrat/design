<template>
  <section :class="[variant, view]" class="lila-module lila-quote-module">
    <lila-quote-partial v-bind="$props"></lila-quote-partial>
  </section>
</template>

<script lang="ts">
import Link from '@interfaces/link.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class QuoteModule extends ExtComponent {

  @Prop(String) quote: string;

  @Prop(Object) link: Link;

  @Prop(String) citation: string;

}
</script>

<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-quote-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_M;

  &.small {
    max-width: @moduleWidth_S;
  }
}
</style>
