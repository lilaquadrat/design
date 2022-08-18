<template>
<section :id="id" :class="[variant, view]" class="lila-faq-module lila-module">

    <lila-textblock-partial v-if="textblock" v-bind="textblock" />
    <lila-accordion-partial v-if="accordion" v-bind="accordion" />

</section>

</template>
<script lang="ts">
import Textblock from '@interfaces/textblock.interface';
import Accordion from '@interfaces/Accordion.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class FaqModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) accordion: Accordion;


}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-faq-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  &.medium {
    max-width: @moduleWidth_M;
  }

}

</style>
