<template>
  <section class="lila-select-category-partial">

    <label class="single-category" :class="[variant, {'not-selected': single.id !== value, disabled: single.disabled, free: !single.price.amount, limited: single.amount}]" v-for="(single, index) in categories" :key="`select-${index}`" :value="single.id">
      <div class="indicator">
        <span class="active"></span>
      </div>
      <h1>{{ single.name }}</h1>
      <h4 v-if="single.amount" class="available">{{ $translate('LIST_CATEGORY_LIMITED_AVAILABILITY', [single.amount]) }}</h4>
      <h3>
        <template v-if="single.price.amount">{{ single.price.amount }} {{ $translate(single.price.currency) }}</template>
        <template v-if="!single.price.amount">{{ $translate('no charge') }}</template>
      </h3>
      <h4 v-if="single.price.amount" class="tax">{{$translate('price_with_tax', [single.price.tax])}}</h4>
      <p class="description">{{ single.description }}</p>
      <p v-if="single.disabled" class="notAvailable">{{$translate('not available')}}</p>
      <input name="category" :value="single.id" type="radio" @change="changeHandler(single.id)">
    </label>

    <lila-input-labels-partial :error="hasError" :required="required"><slot/></lila-input-labels-partial>

  </section>
</template>
<script lang="ts">
import { ListCategory } from '@lilaquadrat/studio/lib/interfaces';
import { ParsedError } from '@libs/ActionNotice';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class selectCategoryPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(Array) categories: ListCategory[];

  @Prop(Boolean) required: boolean;

  @Prop(Object) error: ParsedError;

  textType: string = 'word';

  changeHandler(selected: string): void {

    this.$emit('input', selected);

  }

  get hasError() {

    return !!this.error?.error;

  }


}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-select-category-partial {

  display: grid;
  gap: 50px 0;
  width: 100%;

  .single-category {
    display: grid;
    grid-template-rows: max-content max-content max-content;
    grid-template-columns: max-content 1fr max-content;
    gap: 5px 15px;
    align-items: start;
    cursor: pointer;

    input {
      display: none;
    }

    &.hide-free-notice.free {

      h3 {
        display: none;
      }
    }

    &.limited {
      grid-template-rows: max-content max-content max-content max-content;

      .available {
        grid-row-start: 2;
        grid-column-start: 2;
        text-align: left;
        .font-bold;
        font-size: @fontText;
      }

      p {
        grid-row-start: 3;
      }

    }

    &.disabled.not-selected {

      pointer-events: none;

      h1, h3, .description {
        color: @grey;
      }

      .indicator {
        border-color: @grey;
      }

      &:hover {

        h1, h3 {
          color: @grey;
        }
      }

    }

    .indicator {
      display: grid;
      align-content: center;
      align-self: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: solid 1px @color1;
      border-radius: 50%;

      .active {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: @color1;
      }
    }

    h1, h3 {
      .font-head;
      color: @color1;
      .trans(color);
    }

    .notAvailable {
      grid-column-start: 2;
      grid-column-end: 3;
      text-transform: uppercase;
    }

    .description {
      grid-row-start: 2;
      grid-column-start: 2;
      grid-column-end: 3;
    }

    h1, h3 {
      font-size: @headline_S;
      text-transform: uppercase;
    }

    h3 {
      text-align: right;
    }

    h4 {
      grid-row-start: 2;
      grid-column-start: 3;
      grid-column-end: 4;
      color: @textColor;
      font-size: @fontSmall;
      text-align: right;
      .font-normal;
    }

    &.not-selected {

      h1, h3, h4 {
        color: @color1;
      }

      &:hover {

        .indicator {

          .active {
            display: grid;
          }
        }
      }

      .indicator {

        .active {
          display: none;
        }
      }

    }

  }

}
</style>
