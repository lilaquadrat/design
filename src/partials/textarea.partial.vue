<template>
    <label class="lila-textarea" :class="{  }" tabindex="">
       <textarea
       name=""
       id=""

       :disabled="disabled"
       @input="input($event.target.value)"
       @keyup="checkInput($event)"
       ></textarea>
    </label>
</template>
<script lang="ts">
import { Component, ExtPartial, Prop } from '../libs/lila-partial';

@Component
export default class TextareaPartial extends ExtPartial {

  @Prop(Boolean) disabled:boolean;

  @Prop(String) value: string;

  @Prop(Number) debounce: number;


  checkInput($event: KeyboardEvent) {

    const input = this.$el.querySelector('textarea') as HTMLTextAreaElement;

    if ($event.key === 'Escape') { input.blur(); }

  }

  input(value: string) {

    if (this.debounce) return this.$emit('input', value);

    return value;

  }


}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

</style>
