<template>
   <label class="lila-input"  >
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
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

        &.disabled {
            background-color: @grey;
            opacity: 0.3;
            pointer-events: none;
        }
<<<<<<< HEAD
   }
   input[disabled] {
    color: @grey;
=======
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

>>>>>>> origin/feedForms
   }
}

</style>
