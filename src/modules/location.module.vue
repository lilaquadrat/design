<template>
  <section :id="id" :class="[variant, view]" class="lila-location-module lila-module">
    <section class="content-container">

      <section class="map-container">
        <lila-location-partial ref="iframeElement" class="iframe" v-bind="map" />
      </section>


      <section class="text-container">
        <lila-textblock-partial v-bind="textblock" />

        <lila-list-partial class="list-container" v-if="list" v-bind="list"></lila-list-partial>
        <lila-list-partial class="link-container" v-bind="links" />

      </section>
    </section>
  </section>
</template>
<script lang="ts">

import Iframemap from '@interfaces/Iframemap.interface';
import Link from '@interfaces/link.interface';
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import {
  Component, ExtComponent, Prop,
} from '@libs/lila-component';

@Component
export default class LocationModule extends ExtComponent {

  @Prop(Object) picture: Picture;

  @Prop(Object) textblock: Textblock;

  @Prop(Object) map: Iframemap;

  @Prop(Object) links: Link[];

  @Prop(Object) list: string[];

  $refs: {
    iframeElement: HTMLIFrameElement;
  };

  mounted(): void {

    this.checkInview();

    console.log('iframe', this.$refs.iframeElement);

  }


}
</script>
<style lang="less">
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-location-module {
  .module;

  max-width: @moduleWidth_S;

  @media @desktop {
    max-width: @moduleWidth_M;
  }

  .content-container {
    display: grid;
    grid-template-columns: repeat(1, minmax(auto, 1fr));
    padding: 0 20px;
    gap: 20px;

    .map-container {
      grid-row-start: 2;
    }

    .text-container {
      grid-column-start: 1;
<<<<<<< Updated upstream
=======
      gap: 20px;
>>>>>>> Stashed changes

      .link-container,
      .list-container {
        padding: 20px 0;
      }
    }

    @media @desktop {
      grid-template-columns: 2fr 1fr;
      gap: 0 30px;

      .map-container {
        grid-row-start: 1;

      }

      .text-container {
        grid-column-start: 2;
      }
    }
  }

  &.textLeft {

    .content-container {

      .map-container {
        grid-row-start: 1;
      }

      .text-container {
        grid-row-start: 2;
      }

      @media @desktop {
        grid-template-columns: 1fr 2fr;

        .map-container {
          grid-row-start: 2;
          grid-column-start: 2;


        }

        .text-container {
          grid-column-start: 1;
        }
      }
    }
  }

}
</style>
