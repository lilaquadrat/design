<template>
  <label class="lila-textarea" tabindex="" rows="20" cols="20">
    <textarea :disabled="disabled" @keyup="checkInput($event)" :placeholder="placeholder"></textarea>

    <span v-if="slotUsed" class="label">
      <slot />
    </span>

    <div class="label-container">
      <span class="required" v-if="required && !disabled"> required </span>
      <span class="required" v-if="disabled"> disabled </span>
    </div>
  </label>
</template>
<script lang="ts">
import { Component, ExtPartial, Prop } from '../libs/lila-partial';

@Component
export default class TextareaPartial extends ExtPartial {

  @Prop(Boolean) disabled:boolean;

  @Prop(String) value: string;

  @Prop(String) placeholder: string;

  @Prop(Boolean) required: boolean;

  get slotUsed() {

    return this.$slots.default?.length;

  }


  checkInput($event: KeyboardEvent) {

    const input = this.$el.querySelector('textarea') as HTMLTextAreaElement;

    if ($event.key === 'Escape') { input.blur(); }

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";
 .lila-textarea {
  textarea {
    min-width: 200px;
    padding: 10px;
    border: 0.5px @grey solid;
    outline: none;
    background: transparent;
    resize:none;

    &:hover {
      border: 2px @grey solid;
    }
    &:focus {
      border: 2px @color3 solid;
      background: white;
    }
  }
  &.disabled {
            background-color: @grey;
            pointer-events: none;
            opacity: 0.3;
    }
 }
</style>
