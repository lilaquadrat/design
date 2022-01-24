<template>
  <fieldset>

    <div class="legend-container">
      <legend v-if="legend">{{legend}}</legend>
    </div>

    <slot></slot>

  </fieldset>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class FieldsetPartial extends ExtPartial {

  @Prop(String) legend: string;

  @Prop(({ type: Boolean, default: true })) background: boolean;

}
</script>
<style lang="less">
@import (reference) "@{projectPath}/source/less/shared.less";

fieldset {

  display: grid;

}
</style>
