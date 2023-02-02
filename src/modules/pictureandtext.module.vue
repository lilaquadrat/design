<template>
  <section :id="id" :class="[view, { hasImage: picture }, variant]" class="lila-pictureandtext-module lila-module">
    <lila-picture-partial :fit="fitVariant" v-bind="picture" />

    <section class="grid-container">

      <lila-textblock-partial v-bind="textblock" />

      <lila-list-partial v-if="list" v-bind="list"></lila-list-partial>
      <lila-list-partial v-if="links" v-bind="links"></lila-list-partial>

      <lila-legend-partial v-if="legend" v-bind="legend"></lila-legend-partial>

    </section>

  </section>
</template>
<script lang="ts">
import Link from '@interfaces/link.interface';
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class PictureAndTextModule extends ExtComponent {

  @Prop(Object) picture: Picture;

  @Prop(Object) textblock: Textblock;

  @Prop(Object) legend: string[];

  @Prop(Object) links: Link[];

  @Prop(Object) list: string[];

  mounted(): void {

    this.checkInview();

  }


  get fitVariant() {

    return this.variant.includes('fit');

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-pictureandtext-module {
  .module;
  .modulePadding('none');

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  @media @desktop {

    .modulePadding();
    max-width: @moduleWidth_M;

  }

  @media @desktop {
    display: grid;
    grid-template-columns: minmax(min-content, 40%) 1fr;

    &.focusImage {
      grid-template-columns: minmax(min-content, 60%) 1fr;
    }
  }

  .grid-container {
    display: grid;
    gap: 40px;

    .modulePadding();

    align-content: center;

    @media @desktop {
      .modulePadding('none');
    }

  }

  &.fit {

    img {

      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &.variant1 {

    @media @desktop {
      grid-template-columns: 1fr minmax(min-content, 40%);

      &.focusImage {
        grid-template-columns: 1fr minmax(min-content, 60%);
      }

      .textblock {
        grid-row: 1;
        grid-column: 1;
      }

      figure {
        grid-row: 1;
        grid-column: 2;
      }
    }
  }
}
</style>
