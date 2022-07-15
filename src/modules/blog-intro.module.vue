<template>
<article :id="id" :class="[view,{hasImage: picture}]" class="lila-blog-intro-module lila-module">

  <header>
    <template v-if="!linkExists">
      <time v-if="date">{{date}}</time>
      <lila-textblock-partial class="top" v-bind="textTop" />
    </template>

    <lila-link-partial v-if="linkExists" v-bind="link">
      <time v-if="date">{{date}}</time>
      <lila-textblock-partial class="top" v-bind="textTop" />
    </lila-link-partial>
  </header>

  <lila-link-partial v-bind="link" v-if="linkExists">
    <lila-picture-partial v-if="picture" v-bind="picture" />
  </lila-link-partial>
  <lila-picture-partial v-else-if="picture" v-bind="picture" />

  <lila-textblock-partial class="bottom" v-bind="textBottom" />

  <address v-if="author">Von {{author}}</address>

  <slot></slot>

</article>

</template>
<script lang="ts">
import Link from '@interfaces/link.interface';
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class BlogIntroModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) picture: Picture;

  @Prop(Object) link: Link;

  @Prop(String) author: string;

  @Prop(String) date: string;

  mounted() {

    this.checkInview();

  }

  get textTop() {

    return {
      headline: this.textblock?.headline,
      subline: this.textblock?.subline,
    };

  }

  get textBottom() {

    return {
      intro: this.textblock?.intro,
      text: this.textblock?.text,
    };

  }

  get linkExists() {

    return !!this.link?.link;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-blog-intro-module {
  .module;

  display: grid;
  gap: 20px;
  justify-items: center;

  max-width: @moduleWidth_M;

  background: transparent;
  .modulePadding('none');

  header {
    display: grid;
    gap: 10px;
    width: 100%;
    max-width: @moduleWidth_S;

    a {
      display: grid;
      gap: 10px;
    }

  }

  .lila-textblock {

    gap: 10px;

    width: 100%;

    max-width: @moduleWidth_S;

    .modulePadding();

    &.top {
      display: grid;

      h2 {
        grid-row-start: 1;
      }

    }

  }

  picture {

    justify-self: center;

    max-width: 100%;

    img {
      max-width: 100%;
    }

  }

  h1, h2 {
    margin-left: -2px;
  }

  .lila-link {
    display: grid;
    justify-items: center;
    width: 100%;

    h1 {
      .trans(color);
    }

    &:hover {

      h1 {
        color: @color2;
      }

    }

  }

  time, address {

    display: grid;

    width: 100%;
    max-width: @moduleWidth_S;
    color: @textColor;
    .modulePadding();
  }

  time {
    .font-bold;
  }

}

</style>
