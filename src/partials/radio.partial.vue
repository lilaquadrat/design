<template>
  <section class="lila-radio-container">
    <label :class="[textType, {checked: value === single.value , disabled}]" class="radio" tabindex="" v-for="(single, index) in elements" :key="`element-${index}`">

      <div class="indicator-text">

        <span class="indicator">
          <span class="active"></span>
        </span>

        <span class="label">
          <div>{{single.text}}</div>
          <description-partial inline v-if="single.description">{{ single.description }}</description-partial>
        </span>

      </div>

      <input type="radio" name="test" :disabled="disabled" :value="single.value" @change="changeHandler">
    </label>
    <lila-input-labels-partial :required="required" :disabled="disabled"><slot/></lila-input-labels-partial>
  </section>
</template>

<script lang="ts">
import { Component, ExtPartial, Prop } from '@libs/lila-partial';

@Component
export default class RadioPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;

  @Prop(Boolean) valid: boolean;

  @Prop(String) description: string;

  @Prop(Array) elements: {value: string, text: string}[];

  textType: string = 'word';

  $refs: {
    input: HTMLInputElement
  };


  changeHandler($event: Event): void {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.value);

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-radio-container {
  display: grid;
  gap: 15px;

  .indicator-text {
    display: grid;
    grid-template-areas: "radio description";
    grid-template-columns: 20px auto;
    gap: 10px;
  }
}

label.radio {
  cursor: pointer;

  .label {
    display: grid;
    // gap: 5px;
  }

  .indicator {
    display: grid;
    grid-area: radio;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid @textColor;
    border-radius: 50%;

    .active {
      display: none;
      width: 10px;
      height: 10px;
      background-color: @color1;
      border-radius: 50%;
    }
  }

  input[type="radio"] {
      display: none;
  }

  &:hover {

    .indicator {
      // border: solid 2px @color1;

      .active {
        display: grid;
        background-color: @grey;
      }
    }

    .label {
      color: @color3;
    }
  }

  &.checked {

    .indicator {
      .active {
        display: grid;
        background-color:@color3;
      }
    }

  }

  &.disabled {

    pointer-events: none;
    user-select: none;
    .indicator {
      background-color: @grey;
      border: 0;
    }
  }

}
</style>
