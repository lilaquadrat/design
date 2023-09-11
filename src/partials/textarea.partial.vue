<template>
  <label class="lila-textarea" tabindex="">
    <textarea :disabled="disabled" @keyup="checkInput($event)"></textarea>
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
  &.disabled {
            background-color: @grey;
            pointer-events: none;
            opacity: 0.3;
    }
 }
</style>
