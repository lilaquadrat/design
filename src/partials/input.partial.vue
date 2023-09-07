<template>
   <label class="lila-input"  >
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="fieldSize"
      @input="onInput"
    />

   <div v-if="slotUsed || required || disabled ">
    <span>
       <slot />
    </span>
    <!-- <span v-if="required && ! disabled"></span> -->
   </div>

   <div v-if="error">
    <span>{{ error }}</span>
  +</div>

   </label>

</template>

<script lang="ts">
import { Component } from '@libs/lila-component';
import { ExtPartial, Prop } from '@libs/lila-partial';


@Component
export default class InputPartial extends ExtPartial {

  @Prop (String) type: string;

  @Prop(String) value: string;

  @Prop(String) placeholder: string;

  @Prop(String) size: string;

  @Prop(Number) length: number;

  @Prop(Boolean) disabled: boolean;

  @Prop(String) error : string;

  @Prop(String) keyword : string;

  @Prop(String) regex : string;

  @Prop([RegExp, String]) validation: RegExp | string;

  @Prop(String) required: string;


  $refs!: {
    input: HTMLInputElement
    };

  get slotUsed() {

    if (this.$slots.default) {

      return this.$slots.default?.length > 0 === true;

    }

    return false;

  }


  onInput($event: Event) {

    const eventTarget = $event.target as HTMLInputElement;
    const input = eventTarget.value;

    this.value = input;

    if (this.regex && this.regex.trim()) {

      if (!new RegExp(this.regex).test(input)) {

        $event.preventDefault();
        return;

      }

    }

    if (this.validate(input)) {

      $event.preventDefault();

    }

  }

  clearInput() {

    this.$refs.input.value = '';

  }

  validate(input: string) {

    if (this.validation) {

      return input.match(new RegExp(this.validation));

    }

    if (this.type === 'number') {

      return input.match(/^[0-9]*$/);

    }

    return true;

  }

  emitValue(value: string | number) {

    if (this.type === 'number') {

      const typeValue = +value;

      this.$emit('input', typeValue);

    } else {

      this.$emit('input', value);

    }

  }


  get fieldSize() {

    return this.size;

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-input{
   input{
    padding: 10px;
    color: @color1;

        &.disabled {
            background-color: @grey;
            opacity: 0.3;
            pointer-events: none;
        }
        &.small{
            width: 20vw - 3rem;
            font-weight: 300;
        }

        &.medium {
            width: 50vw - 3rem;
            font-weight: 500;
        }

        &.large {
            width: 100vw - 3rem;
            font-weight: 900;
        }

        &.error {
          color: red;
        }
   }
   input[disabled] {
    color: @grey;

   }
}

</style>
