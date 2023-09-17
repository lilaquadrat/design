<template>
  <section class="lila-checkbox-container">
      <label
        class="checkbox"
        :class="[textType, {disabled:disabled, checked: value, notChecked}]"
        :colorConfig="{ background: '#ffffff',border: '#0d0d0d', leftPlunk: '#8A8A8A',topPlunk: '#E0E0E0'}"
        tabindex="" >

        <div class="markierung">
        <span class="checked-marked">
          <lila-icons-partial type="close" size="small" color-scheme="red"/>
        </span>

        <!--  -->
        <div class="label-container">
          <p color="#8A8A8A" :fontSize="16" fontType="body" :fontWeight="400">
          I agree to terms & conditions
        </p>
        </div>
      </div>
      <input type="checkbox"  :disabled="disabled" :checked="value" @change="handleChange" />
    </label>

    <div v-if="text" class="markierung">
      <span class="checked-marked" />
    </div>

    <div class="label-container">
    </div>
  </section>
</template>
<script lang="ts">
import { Component } from '@libs/lila-component';
import { ExtPartial, Prop } from '@libs/lila-partial';


@Component
export default class CheckboxPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;

  @Prop(Boolean) notChecked: boolean;

  @Prop(String) text: string;

  textType: string = 'word';


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
  .lila-checkbox-container {

    .markierung  {
      display: grid;
      grid-template-columns: 20px auto;
      gap: 20px;

    .label-container {
      grid-column-start: 2;
      cursor: pointer;
      }
    }
  }

label.checkbox {
  background-color: aqua;
  }


  input  {
      &[type='checkbox'] {
        display: none;
      }
    }

.checked-marked {
  content: '';
  display: grid;
  width: 20px;
  height: 20px;
  border:  2px solid @textColor;

  cursor: pointer;
 

  .icon-partial {
    display: grid;
    align-self: center;
    justify-self: center;
    background: yellow;
  }
}

&.checked {
  .checked-marked {
    border: solid 1px @color1;
    accent-color: @color1;

    svg {
        stroke: @white;
        stroke-width: 3;
    }
  }
  &:hover {
    .checked-marked {
      border: solid 3px @color3;
        background-color: @color3;
    }
  }
}

&.disabled {
  background-color: @grey;
  border: 0;
  pointer-events: none;
}



</style>
