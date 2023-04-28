<template>
    <section class="lila-overlay-background" ref="background" :class="[backgroundMode]" @keydown="checkClose" @click="checkClose">
      <slot></slot>
    </section>
</template>
<script lang="ts">
import { Prop } from '@libs/lila-component';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class overlayBackgroundPartial extends Vue {

  // defines in which media mode the background will be visible
  @Prop(String) background: 'none' | 'mobile' | 'tablet' | 'desktop';

  get backgroundMode() {

    return this.background || 'mobile';

  }

  checkClose($e) {

    if (this.$refs.background !== $e.target) return;

    this.$emit('close');

  }

  mounted() {

    this.$nextTick(() => {

      if (this.$store) this.$store.dispatch('fullscreen', true);
      this.$emit('mounted');

    });

  }

  destroyed() {

    if (this.$store) this.$store.dispatch('fullscreen', false);

  }

}
</script>
<style lang="less">
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-overlay-background {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, .5);

  @media @tablet, @desktop {
    background-color: transparent;
  }
  .index(10);

  &.mobile {
    background-color: rgba(0, 0, 0, .5);

    @media @tablet, @desktop {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  &.none {
    background-color: transparent;

    @media @tablet, @desktop {
      background-color: transparent;
    }
  }

  &.tablet {

    @media @tablet {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  &.desktop {

    @media @tablet, @desktop {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  .content-container {
    .index(11);
    position: absolute;
  }

}
</style>
