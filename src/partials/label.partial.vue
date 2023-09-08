<template>
    <section>
        <label class="lila-label" :class="[font, multi]" :disabled="disabled">
            {{ label }}
        </label>
    </section>
</template>
<script lang="ts">
import { Component, ExtPartial, Prop } from '@libs/lila-partial';

@Component
export default class LabelPartial extends ExtPartial {

  @Prop(String) label: string;

  @Prop(String) font: string;

  @Prop(String) multi: string;

  @Prop(Boolean) disabled: boolean;

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";
    .lila-label  {

    label {

    color: red;

        .font-normal;

    .multi(padding, 2, 0);

    font-size     : @fontTextSmaller;

    float         : left;

    text-transform: uppercase;

    color         : @textColor;


  }
  label[disabled] {
    color: @grey;
   }
}
</style>
