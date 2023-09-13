<template>
    <section class="lila-radio" tabindex="">
            <span>
                <label>
                <input ref="input" type="radio" :disabled="disabled" :checked="value"
                @change="changeHandler"
                :class="[textType, { valid: valid }]"
                />
               </label>
            </span>
    </section>
</template>

<script lang="ts">
import { Component, ExtPartial, Prop } from '@libs/lila-partial';


@Component
export default class RadioPartial extends ExtPartial {


  @Prop (String) radio: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) value: boolean;

  @Prop(Boolean) valid: boolean;

  textType: string = 'word';

  $refs: {
    input: HTMLInputElement
  };


  changeHandler = ($event: Event) => {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.checked);


  };

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";
.lila-radio {
    accent-color: @color1;
    &:disabled {
            background-color: @grey;
            pointer-events: none;
            opacity: 0.3;
    }
  }

</style>
