<template>
    <label class="lila-textarea" tabindex="">
       <textarea
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




  checkInput($event: KeyboardEvent) {

    const input = this.$el.querySelector('textarea') as HTMLTextAreaElement;

    if ($event.key === 'Escape') { input.blur(); }

  }


}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

</style>
