<template>
<section :class="[variant, view]" class="lila-picture-module lila-module">
  <lila-picture-partial v-bind="picture" />

  <div v-if="showText" class="position-container">
    <lila-textblock-partial v-bind="textblock" />
  </div>

</section>

</template>
<script lang="ts">
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class PictureModule extends ExtComponent {

  @Prop(Object) picture: Picture;

  @Prop(Object) textblock: Textblock;

  mounted(): void {

    this.checkInview();

  }

  get showText(): boolean {

    if (!this.textblock) return false;

    return Object.keys(this.textblock).some((single) => this.textblock[single].length);

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-picture-module {
  .module;
  max-width: @moduleWidth_L;
  .modulePadding('none');

  picture {

    img {
      display: block;
      min-width: 100%;
      max-width: 100%;
    }

  }

  &.small {
    max-width: @moduleWidth_S;
  }

  &.middle {
    max-width: @moduleWidth_M;
  }

  .position-container {

    width: 100%;
    background-color: rgba(255, 255, 255, .9);

    .lila-textblock::v-deep {
      .multi(padding, 4, 8);

      h3 {
        color: @textColor;
      }

    }

  }

  &.fullscreen {
    width: 100%;
    max-width: 100%;

    .position-container {

      position: absolute;
      align-self: end;

    }

  }

  &.variant1 {

    position: relative;

    .position-container {

      @media @tablet,  @desktop {

        position: absolute;
        top: 0;
        right: 0;
        max-width: 50%;
        height: 100%;
        background-color: rgba(255, 255, 255, .9);

      }

      @media @desktop {
        max-width: 30%;
      }

    }

  }

}

</style>
