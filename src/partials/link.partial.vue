<template>
  <component
    v-if="link"
    :class="[variant, classes, {hasIcon: icon}]"
    class="lila-link"
    :is="type"
    :to="linkWithBase"
    :href="linkWithBase"
    @click="event"
    >
    <lila-icons-partial v-if="icon" :type="icon" size="small" />
    {{ text }}
    <slot v-if="!text"></slot>
  </component>
</template>
<script lang="ts">
import { InjectReactive } from 'vue-property-decorator';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class LinkPartial extends ExtPartial {

  @InjectReactive('linkBase') private linkBase!: string;

  @Prop(String) link: string;

  @Prop(String) text: string;

  @Prop(String) icon: string;

  @Prop(Array) attributes: string[];

  @Prop(Array) classes: string[];

  external: boolean = false;

  get linkWithBase() {

    return this.linkBase ? `${this.linkBase}/${this.link}` : this.link;

  }

  mounted(): void {

    this.analyse(this.link);

  }

  analyse(link: string): void {

    if (typeof link !== 'string') return;

    this.external = !!link?.match(/^http/i);

  }

  event($event) {

    if (this.attributes?.includes('event')) {

      $event.preventDefault();

      this.$emit(this.link.slice(1));
      this.$root.$emit(this.link.slice(1));

    }

  }

  get isEvent() {

    return this.attributes?.includes('event');

  }

  get static(): boolean {

    if (this.$store?.state.staticLinks) return true;

    return this.attributes?.includes('static');

  }

  get type(): 'router-link' | 'a' {

    return !this.external && !this.static && !this.isEvent
      ? 'router-link'
      : 'a';

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-link {

  color: @link;
  .font-normal;
  .trans(color);

  &:hover {
    color: @linkHover;
  }

  &.hasIcon {

    .lila-icon-partial {
      display: inline
    }
  }

  &.callToAction {
    .trans(background);

    display: inline-block;
    height: @buttonHeight;

    background-color: @color4;
    color: @white;

    font-size: @fontTextSmaller;

    line-height: @linkLineHeight;

    text-transform: uppercase;

    transition: background @aTime @aType;

    .font-head;
    .multi(padding, 0, 3);

    &:hover {
      background-color: @color5;
    }

    &.colorScheme2 {
      border-color: @color3;
      color: @color3;

      &:hover {
        border-color: @color1;
        color: @color1;
      }

      &.router-link-active {
        background-color: @grey;

        &:hover {
          background-color: @grey1;
          color: @textColor;
        }
      }
    }

    &.white {
      border-color: @white;
      background-color: transparent;
      color: @white;

      &:hover {
        border-color: @color1;
        color: @color1;
      }
    }
  }
}

</style>
