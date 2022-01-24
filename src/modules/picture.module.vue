<template>
<section :class="[variant, view]" class="module picture-module">
  <picture-partial v-bind="picture" />

  <div v-if="showText" class="position-container">
    <textblock-partial v-bind="textblock" />
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

.module.picture-module {
  .module;
  max-width: @moduleWidth_L;
  .modulePadding('none');

  picture {

    img {
      min-width: 100%;
      max-width: 100%;
      display: block;
    }

  }

  &.small {
    max-width: @moduleWidth_S;
  }

  &.middle {
    max-width: @moduleWidth_M;
  }

  &.fullscreen {
    width: 100%;
    max-width: 100%;

    .position-container {

      position: absolute;
      align-self: end;

    }

  }

  .position-container {

    width: 100%;
    background-color: rgba(255, 255, 255, .9);

    .textblock {
      .multi(padding, 4, 8);

      h3 {
        color: @textColor;
      }

    }

  }

  &.variant1 {

    position: relative;

    .position-container {

      @media @tablet,  @desktop {

        position: absolute;
        max-width: 50%;
        top: 0;
        right: 0;
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
