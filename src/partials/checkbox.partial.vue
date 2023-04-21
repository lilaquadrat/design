<template>
  <section class="lila-label-parent-container">
    <label :class="[textType, { error: error, checked: value, disabled: disabled, noIndicator }]" class="checkbox" tabindex="">
      <div class="indicator-text">
        <span class="indicator">
          <lila-icons-partial type="checked" size="small" colorScheme="white" />
        </span>

        <span class="label" v-if="textType !== 'noText'" :class="[textType]">
          <slot v-if="!text"></slot>
          <description-partial inline v-if="description && !text">{{ description | translate }}</description-partial>
          {{ text }}
        </span>

        <div v-if="!text" class="label-container">
          <span class="required" v-if="required && !disabled">{{ 'required' | translate }}</span>
          <span class="disabled" v-if="disabled">{{ 'disabled' | translate }}</span>
        </div>
      </div>

      <div v-if="error" class="errors">
        <p>{{ error }}</p>
      </div>

      <input type="checkbox" :name="name" :required="required" :disabled="disabled" :checked="value" v-on:change="changeHandler" />
    </label>
    <div v-if="text" class="indicator-text">
      <span class="indicator"> </span>
      <span class="label" v-if="textType !== 'noText'" :class="[textType]">
        <slot></slot>
        <description-partial inline v-if="description">{{ description | translate}}</description-partial>
      </span>

      <div class="label-container">
        <span class="required" v-if="required && !disabled">{{ 'required' | translate }}</span>
        <span class="required" v-if="disabled">{{ 'disabled' | translate }}</span>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class checkboxPartial extends ExtPartial {

  @Prop(String) name: string;

  @Prop(Boolean) value: boolean;

  @Prop(String) error: string;

  @Prop(Boolean) required: boolean;

  @Prop(String) description: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) noIndicator: boolean;

  @Prop(String) text: string;

  textType: string = 'word';

  changeHandler($event: Event): void {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.checked);

  }

  beforeUpdate(): void {

    this.setTextType();

  }

  mounted(): void {

    this.setTextType();

  }

  setTextType(): void {

    const useText = this.text ? this.text : this.$slots.default[0].text;

    if (useText) {

      if (useText.length >= 30) this.textType = 'text';

      if (useText.length < 30) this.textType = 'word';

      if (useText.length === 0) this.textType = 'noText';

    } else {

      this.textType = 'noText';

    }

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-label-parent-container {

  .indicator-text {
    display: grid;
    grid-template-columns: 25px auto;
    gap: 0 20px;

    .label-container {
      grid-template-columns: 100%;
      grid-column-start: 2;
      text-align: right;
    }
  }

}

label.checkbox {
  display: grid;
  gap: 10px;

  .label,
  .description {
    .trans(color);
  }

  input {

    &[type='checkbox'] {
      display: none;
    }
  }

  &.noText {
    display: inline-block;
    min-width: auto;
    margin: 0;

    .indicator-text {
      display: inline;
    }

    .label-container {
      display: none;
    }
  }

  .label {
    .multi(margin-bottom, 2);

    justify-self: start;
    margin: 0;
    text-align: left;

    cursor: pointer;

    &.text {
      padding-top: 2px;
    }

    &.word {
      .font-bold;

      display: grid;
      gap: 5px;
      align-self: center;
      min-width: 160px;
      margin: 0;
      padding: 0;
    }

    &.noText {
      display: block;
      min-width: auto;
      margin: 0;
    }

    .description {
      .multi(padding-top, 1);
    }
  }

  .indicator {
    content: '';
    display: grid;
    width: 25px;
    height: 25px;
    border: solid 1px @textColor;

    cursor: pointer;

    transition: background .4s ease, border .4s ease;

    .lila-icons-partial {
      display: grid;
      align-self: center;
      justify-self: center;
    }
  }

  &.noIndicator {

    .indicator {
      display: none;
    }

    .indicator-text {
      grid-template-rows: min-content;
      grid-template-columns: auto;
    }
  }

  &:hover {

    .indicator {
      border: solid 1px @color1;

      svg {
        stroke: @color1;
      }
    }

    .label {
      color: @color3;
    }
  }

  &.checked {

    .indicator {
      border: solid 1px @color1;
      background-color: @color1;

      svg {
        stroke: @white;
        stroke-width: 2;
      }
    }

    &:hover {

      .indicator {
        border: solid 1px @color3;
        background-color: @color3;

        svg {
          stroke: @white;
          stroke-width: 2;
        }
      }
    }
  }

  &.disabled {

    pointer-events: none;
    user-select: none;

    .indicator {
      border: solid 3px @grey;
    }

    &.checked {

      .indicator {
        background-color: @grey;
      }
    }

    .label,
    .description {
      color: @grey;
    }
  }
}
</style>
