<template>
   <label class="lila-input">
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="noHover"
      :value="value"
      @keydown="update"
    />
    <lila-input-labels-partial :required="required" :disabled="disabled"><slot/></lila-input-labels-partial>

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

  update($event: KeyboardEvent) {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target?.value);

  }


}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-input{
  display: grid;
  gap: 5px;

  input{
    padding: 5px 0;
    border: 0;
    border-bottom: 1px @color1 solid;
    background-color: transparent;
    color: @textColor;
    font-size: @fontText;
    line-height: 18px;
    outline: none;

    .trans(border-color);

    &:hover {
      border-bottom: 1px @grey solid;
    }

    &:disabled {
      pointer-events: none;

      &:hover {
        border-bottom: 1px @color1 solid;
      }
    }
  }

}

</style>
