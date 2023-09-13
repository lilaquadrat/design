<template>
    <label class="lila-select">
        <select class="select" :class="icon" :disabled="disabled" :placeholder:="placeholder">
            <span v-if="slotUsed" class="label">
                <slot />
            </span>
            <option value="1">Item1</option>
            <option value="2">Item2</option>
            <option value="3">Item3</option>
            <option value="4">Item4</option>
        </select>

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

  @Prop(Boolean) icon: boolean;

  @Prop(String) placeholder: string;


  get slotUsed() {

    return this.$slots.default?.length;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";
    .lila-select {
        .select {
        display: block;
        padding: 1.5em;
        width: 200px;
        border: 0;
        cursor: pointer;
        appearance:none;
        background-color: transparent;
        border: @grey 2px solid;

        &:focus {
            outline: none;
            background-color: white;
        }

        &:hover {
            border: @color3 2px solid;
        }
        &:disabled {
            background-color: @grey;
            opacity: 0.3;
            border: 0;
            pointer-events: none;
        }
    }
}
</style>
