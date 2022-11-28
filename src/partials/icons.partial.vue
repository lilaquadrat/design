<template>
    <span class="lila-icons-partial" :class="[type, colorScheme, size, rotateClass, {animate: animate}]">
    <svg v-if="type === 'arrow-right'"  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    <svg v-if="type === 'arrow-left'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>

    <svg v-if="type === 'mouse'" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 42.496">
    <g>
        <g>
            <path d=" M 12.5 0 C 5.607 0 0 5.607 0 12.5 L 0 29.996 C 0 36.889 5.607 42.496 12.5 42.496 C 19.393 42.496 25 36.889 25 29.996 L 25 12.5 C 25 5.607 19.393 0 12.5 0 Z  M 22.45 29.996 C 22.45 35.483 17.986 39.947 12.5 39.947 C 7.014 39.947 2.55 35.483 2.55 29.996 L 2.55 12.5 C 2.55 7.014 7.014 2.55 12.5 2.55 C 17.986 2.55 22.45 7.014 22.45 12.5 L 22.45 29.996 Z "/>
            <path class="scrollAnimation" d=" M 12.5 8.454 C 11.796 8.454 11.225 9.024 11.225 9.729 L 11.225 15.596 C 11.225 16.3 11.796 16.871 12.5 16.871 C 13.204 16.871 13.775 16.3 13.775 15.596 L 13.775 9.729 C 13.775 9.024 13.205 8.454 12.5 8.454 Z ">
            </path>
        </g>
    </g>
    </svg>

    <svg v-if="type === 'checked'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <svg v-if="type === 'close'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    <svg v-if="type === 'zoom-in'" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
    <svg v-if="type === 'zoom-out'" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
    </svg>
    </span>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class IconsPartial extends ExtPartial {

  @Prop(String) type: string;

  @Prop({ type: String, default: 'colorScheme1' }) colorScheme: string;

  @Prop({ type: String, default: 'medium' }) size: string;

  @Prop(Number) rotate: number;

  @Prop({ type: Boolean, default: false }) animate: string;

  get rotateClass() {

    if (!this.rotate) return null;
    return `rotate${this.rotate}`;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-icons-partial {
  display: grid;
  align-self: center;
  justify-content: center;

  svg {
    align-self: center;
    justify-self: center;
    stroke-width: 1.5;
  }

  &.rotate90 {

    svg {
      transform: rotate(90deg);
    }

  }

  &.rotate180 {

    svg {
      transform: rotate(180deg);
    }

  }

  &.animate {

    svg {
      .trans(tranform);
    }
  }

  &.big {
    width: 30px;
    height: 30px;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  &.larger {
    width: 26px;
    height: 26px;

    svg {
      width: 26px;
      height: 26px;
    }
  }

  &.large {
    width: 24px;
    height: 24px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &.xl {
    width: 60px;
    height: 60px;

    svg {
      width: 60px;
      height: 60px;
    }
  }

  &.medium {
    width: 20px;
    height: 20px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &.small {
    width: 16px;
    height: 16px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &.smaller {
    width: 10px;
    height: 10px;

    svg {
      width: 10px;
      height: 10px;
    }
  }

  &.colorScheme1 {

    svg {
      stroke: @color1;

      &.useFill {
        fill: @color1;
        stroke-width: 0;
      }
    }

  }

  &.colorScheme2 {

    svg {
      stroke: @color2;

      &.useFill {
        fill: @color2;
        stroke-width: 0;
      }
    }

  }

  &.colorScheme4 {

    svg {
      stroke: @color1;

      &.useFill {
        fill: @color1;
        stroke-width: 0;
      }
    }

  }

  &.white {

    svg {
      stroke: @white;

      &.useFill {
        fill: @white;
        stroke-width: 0;
      }
    }

  }

  &.grey {

    svg {
      stroke: @grey;

      &.useFill {
        fill: @grey;
        stroke-width: 0;
      }
    }

  }

  &.red {

    svg {
      stroke: @error;

      &.useFill {
        fill: @error;
        stroke-width: 0;
      }
    }

  }
}
</style>
