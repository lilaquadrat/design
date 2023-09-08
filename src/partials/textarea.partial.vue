<template>
<<<<<<< HEAD
    <label class="lila-textarea" tabindex="">
       <textarea
=======
    <label class="lila-textarea" :class="{  }" tabindex="">
       <textarea
       name=""
       id=""

>>>>>>> origin/feedForms
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

<<<<<<< HEAD

=======
  @Prop(Number) debounce: number;
>>>>>>> origin/feedForms


  checkInput($event: KeyboardEvent) {

    const input = this.$el.querySelector('textarea') as HTMLTextAreaElement;

    if ($event.key === 'Escape') { input.blur(); }

  }

<<<<<<< HEAD
=======
  input(value: string) {

    if (this.debounce) return this.$emit('input', value);

    return value;

  }

>>>>>>> origin/feedForms

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

</style>
