<template>
  <button class="lila-button base" :disabled="disabled" :type="type" :class="[colorScheme, state, {doublecheck, showCheck, confirmed: confirmed, icon, noPadding, save}]" @click="confirm">
      <span v-if="save"></span>
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

  @Prop(Boolean) save: boolean;

  @Prop(String) colorScheme: string;

  @Prop(String) callId: string;

  @Prop(String) type: 'button' | 'submit' | 'reset';

  $props!: {
    icon?: boolean;
    requiredProp: string;
  };

  showCheck: boolean = false;

  timeout: number = null;

  confirmed: boolean = false;


  get state() {

    if (!this.callId) return null;

    return this.$store.state.Calls.calls[this.callId].state;

  }

  async confirm(): Promise<void> {

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
  .trans(background);

  @keyframes border {

    0% {
      bottom: calc(100% - 3px);
      left: -17px;
    }

    25% {
      bottom: calc(100% - 3px);
      left: calc(100% - 3px);
    }

    50% {
      bottom: -17px;
      left: calc(100% - 3px);
    }

    75% {
      bottom: -17px;
      left: -17px;
    }

    100% {
      bottom: calc(100% - 3px);
      left: -17px;
    }
  }
  display: grid;

  border: none;
  background: transparent;

  outline: none;

  white-space: nowrap;
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

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

  &.error {
    background-color: @error;
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

    display: grid;
    align-items: center;
    justify-items: center;
    width: 35px;
    height: 35px;
    padding: 0;
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

  &.save {

    position: relative;
    overflow: hidden;

    &.pending {

      background-color: transparent;
      color: @color1;

      span {

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;

          width: 20px;
          height: 20px;

          background-color: @color1;

          animation-name: border;
          animation-duration: 1.5s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      }
    }

    &.resolved {
      background-color: @success;
      color: @white;
    }

    &.rejected {
      background-color: @error;
      color: @white;
    }

  }
}
</style>
