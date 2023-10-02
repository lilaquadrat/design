<template>
  <section class="lila-label-parent-container">
    <lila-checkbox-partial v-model="value">
        <slot></slot> - {{ value }}
    </lila-checkbox-partial>
    <lila-content-container-partial :predefined="predefined" :id="contentId" overlay>Inhalte anzeigen</lila-content-container-partial>
  </section>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class agreementPartial extends ExtPartial {

  @Prop(String) name: string;

  @Prop(Boolean) value: boolean;

  @Prop(String) error: string;

  @Prop(String) contentId: string;

  @Prop(Boolean) required: boolean;

  @Prop(Boolean) predefined: boolean;

  @Prop(String) description: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(String) text: string;

  textType: string = 'word';

  changeHandler($event: Event): void {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.checked);

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
