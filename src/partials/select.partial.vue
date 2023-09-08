<template>
        <label class="lila-select">
            <select name="name" class="select" :disabled="disabled">
                <option value="1">Item1</option>
                <option value="2">Item2</option>
                <option value="3">Item3</option>
                <option value="4">Item4</option>
            </select>
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
import { ExtPartial, Component, Prop } from '../libs/lila-partial';


@Component
export default class SelectPartial extends ExtPartial {

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;


  get slotUsed() {

    return this.$slots.default?.length;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";
    .select {

        padding: 10px;
        &.disabled {
        background-color: @grey;
        pointer-events: none;
        opacity: 0.3;
        }

    }
</style>
