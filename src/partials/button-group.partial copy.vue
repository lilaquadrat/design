<template>
  <section :class="{gap, left, center, noGap, alignCenter}" class="button-group">
    <slot />
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ButtonGroupPartial extends Vue {

  @Prop(Boolean) gap: boolean;

  @Prop(Boolean) left: boolean;

  @Prop(Boolean) center: boolean;

  @Prop(Boolean) alignCenter: boolean;

  @Prop(Boolean) noGap: boolean;

}
</script>
<style lang="less">

.button-group {

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  gap: 10px;

  justify-content: end;
  clear: both;

  &.gap {
    gap: 20px;
  }

  &.noGap {
    gap: 0;
  }

  &.left {
    flex-direction: row;
    justify-content: start;
  }

  &.center {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;

    .next {
      grid-column-start: -1;
    }
  }

  &.alignCenter {
    display: grid;
    grid-auto-flow: column;
    align-content: center;
  }

}
</style>
