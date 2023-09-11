<template>
    <section>
        <label class="lila-label"
        :class="[styleScheme, {disabled: disabled}]">
            <slot />
        </label>
    </section>
</template>
<script lang="ts">
import { Component, ExtPartial, Prop } from '@libs/lila-partial';

@Component
export default class LabelPartial extends ExtPartial {

  @Prop(String) label: string;

  @Prop([String]) styleScheme: string;

  @Prop(Boolean) disabled: boolean;

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";
.lila-label  {
    color: @success;

   .font-normal;
   .multi(padding, 2, 0);

        &.float {
            float: right;
        }

        &.text-uppercase {
            text-transform: uppercase;
        }


        &.font-size {
            font-size : @fontTextSmaller;
        }

        &.color {
            color : @textColor;
        }

        &.font-weight {
            .font-bold;
        }

        &.disabled {
            color: @grey;
            opacity: 0.3;
            pointer-events: none;
        }
}
</style>
