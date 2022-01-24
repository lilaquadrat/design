<template>
  <section
    :class="[view, { hasImage: picture }, variant]"
    class="module pictureandtext-module"
  >
    <picture-partial :fit="fitVariant" v-bind="picture" />

    <section class="grid-container">

      <textblock-partial v-bind="textblock" />

      <list-partial v-if="list" v-bind="list"></list-partial>
      <list-partial v-if="links" v-bind="links"></list-partial>

      <legend-partial v-if="legend" v-bind="legend"></legend-partial>

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

.module.pictureandtext-module {
  .module;

  .modulePadding('none');

  // @media @wide {

  //   .modulePadding('none');

  // }

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  @media @desktop {

    .modulePadding();
    max-width: @moduleWidth_M;

  }

  @media @desktop {
    display: grid;
    grid-template-columns: minmax(min-content, 40%) 1fr;

    // &.focusImage {
    //   grid-template-columns: 40% 56%;
    // }
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

      // &.focusImage {
      //   grid-template-columns: 56% 40%;
      // }

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
