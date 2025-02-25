<template>
  <section :id="id" :class="[variant, view]" class="lila-location-module lila-module">

      <section class="map-container">
        <lila-location-partial ref="iframeElement" class="iframe" :src="map" />
      </section>

      <section class="text-container">
        <lila-textblock-partial v-bind="textblock" />

        <lila-list-partial class="list-container" v-if="list" v-bind="list"></lila-list-partial>
        <lila-list-partial class="link-container" v-bind="links" />

    </section>
  </section>
</template>
<script lang="ts">

import Link from '@interfaces/link.interface';
import Textblock from '@interfaces/textblock.interface';
import {
  Component, ExtComponent, Prop,
} from '@/libs/lila-component';

@Component
export default class LocationModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(String) map: string;

  @Prop(Object) links: Link[];

  @Prop(Object) list: string[];

  $refs: {
    iframeElement: HTMLIFrameElement;
  };

  mounted(): void {

    this.checkInview();

  }


}
</script>
<style lang="less">


.lila-location-module {
  display: grid;
  gap: 40px;
  width: 100%;

  @media @desktop {
    .module;
    max-width: @moduleWidth_M;
  }

  .map-container {
    grid-row-start: 2;
  }

  .text-container {
    .modulePadding;
    display: grid;
    grid-column-start: 1;
    grid-auto-rows: max-content;
    gap: 20px;
    align-items: start;

    @media @desktop {
      padding: 0;
    }
  }

  @media @desktop {
    grid-template-columns: 2fr 1fr;
    gap: 0 40px;

    .map-container {
      grid-row-start: 1;
    }

    .text-container {
      grid-column-start: 2;
    }

  }

  &.textLeft {

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
</style>
