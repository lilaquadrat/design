<template>
   <label class="lila-input">
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="noHover"
    />
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
import { Component } from '@libs/lila-component';
import { ExtPartial, Prop } from '@libs/lila-partial';



@Component
export default class InputPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(String) placeholder: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;

  @Prop(String) label: string;

  @Prop(Boolean) noHover: string;


  $refs!: {
    input: HTMLInputElement
    };

  get slotUsed() {

    return this.$slots.default?.length;

  }


}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-input{
   input{
    padding: 10px;
    color: @color1;
    outline: transparent 2px solid;
    border: 0;
    border-bottom: 0.3px @grey solid;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      border-bottom: 2px @grey solid;
    }

    &:focus {
      top : -20px;
      border-bottom: @color3 2px solid;
      outline: none;
      background-color: @white;
    }

&:disabled {
            background-color: @grey;
            opacity: 0.3;
            border: 0;
            pointer-events: none;
          }
   }
   
}

</style>
