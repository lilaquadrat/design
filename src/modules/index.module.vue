<template>
<section :class="[view]" class="lila-index-module lila-module">
  <lila-list-partial v-bind="index"></lila-list-partial>
  <slot></slot>
  <lila-legend-partial v-bind="legend"></lila-legend-partial>
</section>

</template>
<script lang="ts">
import Textblock from '@interfaces/textblock.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class IndexModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) index: string[];

  @Prop(Object) legend: string[];

  mounted() {

    this.checkInview();

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-index-module {
  .module;

  display: grid;
  gap: 20px;

  max-width: @moduleWidth_S;
}
</style>
