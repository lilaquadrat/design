<template>
<section :id="id" :class="[view, position, variant]" class="lila-index-module lila-module">
  <section class="index-container">
    <lila-list-partial mode="links" v-bind="useLinks" :variant="listVariant" />
  </section>
</section>

</template>
<script lang="ts">
import LinkListWithTitle from '@interfaces/LinkListWithTitle.interface';
import Textblock from '@interfaces/textblock.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class IndexModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) links: LinkListWithTitle;

  @Prop(Object) legend: string[];

  mounted() {

    this.checkInview();

  }

  get useLinks() {

    if (this.variant.includes('auto')) {

      return {
        title: this.links?.title,
        value: this.additional.index.map((single) => ({
          text: single?.title,
          link: `#${single.anchor}`,
          attributes: ['static'],
        })),
      };


    }

    return this.links;

  }

  get listVariant() {

    const variants = [];

    if (this.variant.includes('backgroundColor1') || this.variant.includes('backgroundColor3')) variants.push('white');
    if (this.variant.includes('numbered')) variants.push('numbered');

    return variants;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-index-module {
  .module;

  display: grid;
  gap: 20px;

  .index-container {
    display: grid;
    justify-self: center;
    width: 100%;
    max-width: @moduleWidth_S;
  }

  &.medium {

    .index-container {

      max-width: @moduleWidth_M;
    }
  }

  &.top {
    .multi(padding-top, 8);
    .multi(padding-bottom, 8);
  }

  &.backgroundGrey {
    background-color: @grey1;
  }

  &.backgroundColor1 {
    background-color: @color1;
  }

  &.backgroundColor3 {
    background-color: @color3;
  }
}
</style>
