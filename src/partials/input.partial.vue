<template>
   <label class="lila-input" :class="{ error: hasError }">
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="noHover"
      :value="value"
      @keydown="checkInput($event)"
      @keyup="update"
    />
    <lila-input-labels-partial :error="hasError" :required="required" :disabled="disabled"><slot/></lila-input-labels-partial>

    <notice-partial v-if="errorMessage" type="error">
      {{errorMessage}}
    </notice-partial>

  </label>
</template>

<script lang="ts">
import { ParsedError } from '@libs/ActionNotice';
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

  @Prop(Object) error: ParsedError;

  $refs!: {
    input: HTMLInputElement
  };

  whitelistedKeys = ['Escape', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Delete', 'Tab'];

  get slotUsed() {

    return this.$slots.default?.length;

  }

  get errorMessage() {

    return this.error?.keyword !== 'required' ? this.error?.error : null;

  }

  get hasError() {

    return !!this.error?.error;

  }

  update($event?: KeyboardEvent) {

    if (!$event) {

      this.$emit('input', '');
      return;

    }

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target?.value);

  }

  checkInput($event: KeyboardEvent) {

    const input = this.$refs.input;


    if ($event.key === 'Enter') {

      this.$emit('enter');
      $event.preventDefault();

    } else {

      this.$emit('keydown', $event);

    }


    if (['Backspace', 'Enter'].includes($event.key)) return;

    if ($event.key === 'Escape') {

      if (input.value.length > 0) {

        this.clear();

      } else if (input.value.length === 0) {

        input.blur();

      }

    }

  }

  clear() {

    const input = this.$refs.input as HTMLInputElement;

    input.value = '';
    this.update();

  }


}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-input{
  display: grid;
  gap: 5px;

  &.error {

    input {
      border-color: @error;
    }

  }

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
