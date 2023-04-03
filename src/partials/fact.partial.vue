<template>
<section class="lila-fact-partial" :class="[variant, {hasPicture}]">

    <lila-picture-partial v-if="hasPicture" v-bind="picture" />

    <lila-textblock-partial v-bind="textblock" />

    <slot></slot>

</section>
</template>
<script lang="ts">
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class FactPartial extends ExtPartial {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) picture: Picture;

  get hasPicture() {

    return !!this.picture?.src?.length;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-fact-partial {
  display: grid;

  @media @desktop {

    &.hasPicture {
      grid-template-columns: 15% 1fr;
      grid-column-gap: 40px;
    }

    .lila-figure::v-deep {
      display: grid;
    }
  }

  .lila-figure {
    display: none;

    @media @desktop {
      display: grid;
    }
  }

  .lila-figure::v-deep {

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }

  &.variant2 {

    display: grid;
    grid-template-rows: min-content;

    grid-template-columns: 1fr;

    gap: 20px;
    align-content: start;

    justify-content: start;

    max-width: 500px;
    text-align: center;

    // &.hasPicture {
    //   grid-template-rows: 1fr;
    //   grid-template-columns: 1fr;
    // }

    .lila-textblock::v-deep {
      width: 100%;
      // background-color: @grey1;
      // .multi(padding, 12, 4, 4, 4);
      // margin-top: -40px;
    }

    .lila-figure::v-deep {
      position: relative;
      display: grid;
      justify-self: center;

      .index(2);

      img {

        min-width: 80px;

        max-width: 150px;
        min-height: 80px;

      }
    }

  }

}

</style>
