<template>
  <label class="lila-checkbox">
    <input
      ref="input"
      type="checkbox"
      :disabled="disabled"
      :colorConfig="{ background: '#ffffff',border: '#0d0d0d', leftPlunk: '#8A8A8A',topPlunk: '#E0E0E0'}"
      @change="handleChange"
    />
      <p color="#8A8A8A" :fontSize="16" fontType="body" :fontWeight="400">
        I agree to terms & conditions
      </p>
  </label>
</template>
<script lang="ts">
import { Component } from '@libs/lila-component';
import { ExtPartial, Prop } from '@libs/lila-partial';


@Component
export default class InputPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;


  $refs!: {
    input: HTMLInputElement
    };

  handleChange($event: Event) {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.checked);

  }

  get slotUsed() {

    return this.$slots.default?.length;

  }


}

</script>

<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";
  .lila-checkbox{
    padding: 10px;

    input {
     accent-color: @color3;
     width: 1.5em;
     height: 1.5em;

     &:disabled {
            background-color: @grey;
            opacity: 0.3;
            border: 0;
            pointer-events: none;
          }
   }
    }

</style>
