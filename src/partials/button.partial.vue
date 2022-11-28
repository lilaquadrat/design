<template>
    <button class="lila-button base" :disabled="disabled"
    :class="[colorScheme, {doublecheck: doublecheck, showCheck: showCheck, confirmed: confirmed, icon, noPadding}]"
    @click="confirm"
    >

        <slot v-if="!showCheck && !confirmed"></slot>
        <span v-if="showCheck">Please confirm your action.</span>
        <span v-if="confirmed">confirmed</span>

    </button>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class buttonPartial extends ExtPartial {

  @Prop(Boolean) doublecheck: boolean;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) icon: boolean;

  @Prop(Boolean) noPadding: boolean;

  @Prop(String) colorScheme: string;

  showCheck: boolean = false;

  timeout: number = null;

  confirmed: boolean = false;

  confirm(): void {

    if (this.doublecheck) {

      this.check();

    } else {

      this.$emit('confirmed');
      this.$emit('click');

    }

  }

  check(): void {

    if (!this.showCheck) {

      this.showCheck = true;
      this.timeout = window.setTimeout(() => {

        this.showCheck = false;

      }, 5000);

    } else {

      this.showCheck = false;
      this.confirmed = true;
      clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {

        this.confirmed = false;

      }, 15000);

      this.$emit('confirmed');
      this.$emit('click');

    }

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-button {

  border: none;
  background: transparent;

  outline: none;

  white-space: nowrap;
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  .trans(background);

  &.base {
    height: @buttonHeight;
    font-size: @fontTextSmaller;

    line-height: @buttonLineHeight;

    text-transform: uppercase;

    .font-head;
    .multi(padding, 0, 3);
  }

  &.colorScheme1,
  &.colorScheme2 {

    &.save {

      &.init {
        background-color: transparent;
        color: @color1;

        span {

          &:after {
            background-color: @color1;
          }
        }
      }
    }

    &.success {
      background-color: @success;
      color: @white;
    }

  }

  &.colorScheme1 {
    background-color: @color3;
    color: @white;

    &:hover {
      background-color: @color1;
    }

  }

  &.colorScheme2 {
    background-color: @grey1;
    color: @textColor;

    &:hover {
      background-color: @color2;
    }

    &.router-link-active {
      background-color: @grey;

      &:hover {
        background-color: @grey1;
        color: @textColor;
      }

    }

  }

  &.transparent {
    padding: 0;
    background-color: transparent;
    color: @textColor;
    .trans(color);

    &:hover {
      color: @color1;
    }
  }

  &.hoverSchema1 {

    &:hover {
      background-color: @grey1;
      color: @textColor;
    }

  }

  &.icon {
    width: 35px;
    height: 35px;
    padding: 0;

    display: grid;
    align-items: center;
    justify-items: center;
  }

  &.noPadding {
    padding: 0;
  }

  &.full {
    width: 100%;
    text-align: center;
  }

  &:disabled {
    background-color: @grey;
    pointer-events: none;
    user-select: none;
  }

  &.callToAction {
    .base;
    .colorScheme1;
    .trans(background);
  }

  &.scrollButton {
    display: grid;
    text-align: center;
    .font-head;

    .icon {
      justify-self: center;
      margin-top: 5px;
    }
  }
}
</style>
