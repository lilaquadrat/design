<template>
  <label class="lila-textarea" tabindex="">
    
    <textarea ref="textarea" :disabled="disabled" @keyup="checkInput($event)" :placeholder="placeholder"></textarea>
    <!--  -->
    <div class="label-container">
      <span class="label"> <slot /> </span>
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

  $refs!: {
    textarea: HTMLTextAreaElement
  };

  get slotUsed() {

    return this.$slots.default?.length;

  }


  checkInput($event: KeyboardEvent) {

    const input = this.$refs.textarea;

    if ($event.key === 'Escape') {

      input.blur();

    }

    this.$emit('input', input.value);

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-textarea {

  textarea {
    min-width: 200px;
    padding: 10px;
    border: .5px @grey solid;
    background: transparent;
    outline: none;
    resize: none;

    &:hover {
      border: 2px @grey solid;
      cursor: pointer;
    }

    &:focus {
      border: 2px @color3 solid;
      background: white;
      cursor: default;
    }

    &:disabled {
      border: 0;
      background-color: @grey;
      opacity: .3;
      pointer-events: none;
    }
  }
}
</style>
