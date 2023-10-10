<template>
    <div v-if="slotUsed || required || disabled" class="label-container">
      <span class="label">
        <slot />
      </span>
      <span class="required" v-if="required && !disabled">{{$translate('required')}}</span>
      <span class="disabled" v-if="disabled">{{$translate('disabled')}}</span>
    </div>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class InputLabelsPartial extends ExtPartial {

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;

  get slotUsed() {

    return !!this.$slots.default?.length;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.label-container {

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .label, .required, .disabled {
    font-size: @fontTextSmaller;
    text-transform: uppercase;
  }

  .required, .disabled {
    text-align: right;
  }
}
</style>
