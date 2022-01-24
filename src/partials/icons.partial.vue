<template>
    <span class="icon-partial" :class="[type, colorScheme, size, rotateClass, {animate: animate}]">
        <svg v-if="type === 'arrow-right'" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
        <g>
            <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/>
        </g>
        </svg>

        <svg v-if="type === 'arrow-left'" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
        <g>
            <path d="M88.5,7.7c0.8-0.8,1.8-1.2,2.9-1.2s2.1,0.4,2.9,1.2c1.6,1.6,1.6,4.2,0,5.8l-51,51l51,51c1.6,1.6,1.6,4.2,0,5.8
            c-1.6,1.6-4.2,1.6-5.8,0L34.6,67.4c-1.6-1.6-1.6-4.2,0-5.8L88.5,7.7z"/>
        </g>
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

        <svg v-if="type === 'checked'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 283.5" width="283.5pt" height="283.5pt">
            <defs>
                <clipPath id="_clipPath_ZX2hk5idgJQijbLJNu8xpxhH46s4GiyP">
                    <rect width="283.5" height="283.5"/>
                </clipPath>
            </defs>
            <g clip-path="url(#_clipPath_ZX2hk5idgJQijbLJNu8xpxhH46s4GiyP)">
                <path d=" M 3.192 153.32 C 1.064 151.192 0 147.823 0 145.695 C 0 143.567 1.064 140.198 3.192 138.07 L 18.442 122.82 C 22.875 118.387 29.436 118.387 33.692 122.82 L 34.756 123.884 L 94.692 188.254 C 96.82 190.382 100.189 190.382 102.317 188.254 L 248.611 36.64 L 249.675 36.64 L 249.675 36.64 C 254.108 32.207 260.669 32.207 264.925 36.64 L 280.175 51.89 C 284.608 56.323 284.608 62.884 280.175 67.14 L 280.175 67.14 L 105.509 248.367 C 103.381 250.495 101.076 251.559 97.884 251.559 C 94.692 251.559 92.387 250.495 90.259 248.367 L 5.142 156.69 L 3.192 153.32 L 3.192 153.32 Z "/>
            </g>
        </svg>

        <svg v-if="type === 'close'" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="357px" height="357px" viewBox="0 0 357 357" style="enable-background: new 0 0 357 357" xml:space="preserve">
          <g>
            <polygon
              points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3
                    214.2,178.5"
            />
          </g>
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

.icon-partial {
  display: grid;
  align-self: center;
  justify-content: center;

  svg {
    align-self: center;
    justify-self: center;
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
    width: 20px;
    height: 20px;

    svg {
      width: 20px;
      height: 20px;
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
    width: 16px;
    height: 16px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &.small {
    width: 10px;
    height: 10px;

    svg {
      width: 10px;
      height: 10px;
    }
  }

  &.smaller {
    width: 5px;
    height: 5px;

    svg {
      width: 5px;
      height: 5px;
    }
  }

  &.colorScheme1 {

    svg {
      fill: @color1;

      &.useStroke {
        fill: none;
        stroke: @color1;
      }
    }
  }

  &.colorScheme2 {

    svg {
      fill: @color2;

      &.useStroke {
        fill: none;
        stroke: @color2;
      }
    }
  }

  &.colorScheme4 {

    svg {
      fill: @color1;

      &.useStroke {
        fill: none;
        stroke: @color1;
      }
    }
  }

  &.white {

    svg {
      fill: @white;

      &.useStroke {
        fill: none;
        stroke: @white;
      }
    }
  }

  &.grey {

    svg {
      fill: @grey;

      &.useStroke {
        fill: none;
        stroke: @grey;
      }
    }
  }

  &.red {

    svg {
      fill: @error;

      &.useStroke {
        fill: none;
        stroke: @error;
      }
    }
  }
}
</style>
