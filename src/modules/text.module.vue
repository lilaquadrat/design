<template>
  <section :class="[variant, view, {fullscreen: isNotice}]" class="lila-text-module lila-module">

    <textblock-partial v-bind="$props" :variant="textblockVariant" />

    <list-partial v-bind="list" mode="list" :variant="listVariant('list')"></list-partial>
    <list-partial v-bind="links" mode="links" :variant="listVariant('links')"></list-partial>

    <slot></slot>

  </section>
</template>
<script lang="ts">
import Link from '@interfaces/link.interface';
import Picture from '@interfaces/picture.interface';
import {
  ExtComponent, Component, Prop,
} from '@libs/lila-component';

@Component
export default class TextModule extends ExtComponent {

  @Prop(String) headline: string;

  @Prop(String) subline: string;

  @Prop(String) intro: string;

  @Prop(String) picture: Picture;

  @Prop(Array) text: string[];

  @Prop(Object) links: Link[];

  @Prop(Object) list: string[];

  @Prop({ type: Array, default: () => [] }) variant: string[];

  get isNotice() {

    return this.variant.includes('notice');

  }

  get isCenter() {

    return this.variant.includes('center');

  }

  get textblockVariant() {

    return this.variant.includes('notice') ? ['bright'] : [];

  }

  listVariant(type: string) {

    const base = this[type]?.variant || [];

    if (this.variant.includes('center')) {

      base.push('noStyle');
      base.push('center');

    }

    if (this.variant.includes('actions') && type !== 'list') {

      base.push('actions');

    }

    return base;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-text-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  &.center {
    text-align: center;
  }

  &.notice {

    .modulePadding('none');
    justify-content: center;
    max-width: 100%;

    background-color: @color1;

    .lila-textblock {
      .modulePadding('full');

      max-width: @moduleWidth_S;
      color: @white;

      h1, h2, h3, p {

        color: @white;
      }
    }

  }
}

</style>
