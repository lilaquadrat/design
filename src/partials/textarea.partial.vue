<template>
  <label class="lila-textarea" tabindex="">
    <span class="textarea-placement-container">
      <textarea ref="textarea" :disabled="disabled" :read-only="readonly" @input="input($event.target.value)" @keyup="checkInput($event)" :placeholder="placeholder" />
      <div class="length">
        {{ length }}
        <span v-if="maxLength">/ {{ maxLength }}</span>
      </div>
    </span>

    <lila-input-labels-partial :required="required" :error="error" :disabled="disabled"><slot/></lila-input-labels-partial>

  </label>
</template>
<script lang="ts">
import { ParsedError } from '@libs/ActionNotice';
import { Component, ExtPartial, Prop } from '../libs/lila-partial';

@Component
export default class TextareaPartial extends ExtPartial {

  @Prop(Boolean) disabled: boolean;

  @Prop(String) value: string;

  @Prop(String) placeholder: string;

  @Prop(Boolean) required: boolean;

  @Prop(Object) error: ParsedError;

  @Prop(Number) maxLength: number;

  @Prop(Boolean) readonly: boolean;

  @Prop(Number) debounce: number;

  length: number = 0;

  timeout: any;

  $refs!: {
    textarea: HTMLTextAreaElement
  };

  get slotUsed() {

    return this.$slots.default?.length;

  }


  checkInput($event: KeyboardEvent) {

    const input: HTMLTextAreaElement = this.$el.querySelector('textarea');

    this.updateLength(input.value.length, +this.maxLength);

    if ($event.key === 'Escape') {

      input.blur();

    }

  }

  updateLength(currentLength: number, maxLength: number) {

    this.length = currentLength;

    if (maxLength) {

      if (currentLength > maxLength) {

        this.$el.querySelector('textarea').value = this.$el.querySelector('textarea').value.substring(0, maxLength);
        this.input(this.$el.querySelector('textarea').value);

      }

    }

  }

  input(value: string) {

    if (!this.debounce) return this.$emit('input', value);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.$emit('input', value);

    }, +this.debounce);

    return value;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-textarea {

  display: grid;
  gap: 10px;

  .textarea-placement-container {

    display: grid;

    textarea {
      display: grid;

      width: 100%;
      min-height: 200px;
      padding: 5px;
      border: solid 1px @color1;

      background-color: transparent;

      color: @textColor;

      outline: none;

      font-size: @fontText;

      &::selection {
        background: @color1;
        color: @white;
      }

      .trans(border);

      &:focus {
        border: solid 1px @color1;
      }

      &:hover {
        border: solid 1px @grey;
      }

      &:disabled {
        pointer-events: none;

        &:hover {
          border: solid 1px @color1;
        }
      }

    }

    .length {
      position: absolute;
      align-self: end;
      justify-self: end;
      background-color: @grey1;
      opacity: .8;
      pointer-events: none;
      .multi(padding, 1);

      .multi(margin, 2);
    }
  }

}
</style>
