<template>
  <section class="lila-select-category-partial">

    <label class="single-category" :class="[variant, {'not-selected': single.id !== value, disabled: single.disabled || single.percentAvailable === 0, free: !single.price.amount, limited: single.amount}, hideFreeSlots]" v-for="(single, index) in categories" :key="`select-${index}`" :value="single.id">
      <div class="indicator">
        <span class="active"></span>
      </div>
      <h1>{{ single.name }}</h1>
      <h4 v-if="(single.amount && !hideFreeSlots) || (single.disabled || single.percentAvailable === 0)" class="available">
        <span v-if="single.amount && !hideFreeSlots">{{ $translateDiff('LIST_CATEGORY_LIMITED_AVAILABILITY', single.amount) }}</span>
        <span v-if="single.disabled" class="highlight notAvailable">{{$translate('not available')}}</span>
        <span class="highlight sold-out" v-if="single.percentAvailable === 0">{{$translate('LIST_CATEGORY_SOLD_OUT')}}</span>
        <span class="highlight" v-if="highlight && single.percentAvailable > 0 && single.percentAvailable <= 20 && usePercent && !hideFreeSlots">{{$translate('LIST_CATEGORY_LAST_CHANCE_PERCENT', [single.percentUsed])}}</span>
        <span class="highlight" v-if="highlight && single.percentAvailable > 0 && single.percentAvailable <= 20 && !usePercent && !hideFreeSlots">{{$translateDiff('LIST_CATEGORY_LAST_CHANCE', single.available)}}</span>
      </h4>
      <h3>
        <template v-if="single.price.amount">{{ single.price.amount }} {{ $translate(single.price.currency) }}</template>
        <template v-if="!single.price.amount">{{ $translate('no charge') }}</template>
      </h3>
      <h4 v-if="single.price.amount" class="tax">{{$translate('price_with_tax', [single.price.tax])}}</h4>
      <p class="description">{{ single.description }}</p>
      <input name="category" :value="single.id" type="radio" @change="changeHandler(single.id)">
    </label>

    <lila-input-labels-partial :error="hasError" :required="required"><slot/></lila-input-labels-partial>

  </section>
</template>
<script lang="ts">
import { ParsedError } from '@libs/ActionNotice';
import ListCategoryExtended from '@interfaces/ListCategoryExtended.interface';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class selectCategoryPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(Array) categories: ListCategoryExtended[];

  @Prop(Boolean) required: boolean;

  @Prop(Object) error: ParsedError;

  textType: string = 'word';

  changeHandler(selected: string): void {

    this.$emit('input', selected);

  }

  get hasError() {

    return !!this.error?.error;

  }

  get highlight() {

    return this.variant.includes('categoriesHighlight');

  }

  get usePercent() {

    return this.variant.includes('categoriesPercent');

  }

  get hideFreeSlots() {

    return this.variant.includes('hide-free-slots');

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

    &.limited, &.disabled {
      grid-template-rows: max-content max-content max-content max-content;

      .available {
        .font-bold;
        grid-row-start: 2;
        grid-column-start: 2;
        grid-column-end: 3;

        font-size: @fontText;
        text-align: left;

        .highlight {
          margin: 0;
        }
      }

      p {
        grid-row-start: 3;
      }

    }

    &.limited {

      &.hide-free-slots:not(.disabled) {

        p {
          grid-row-start: 2;
        }
      }
    }

    &.disabled.not-selected {

      pointer-events: none;

      h1, h3, .description, h4 {
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

    .highlight {
      margin-top: 30px;
      padding: 0 3px;
      background-color: @error;
      color: @white;
      font-size: @fontTextSmaller;

      &.sold-out, &.notAvailable {
        background-color: @grey;
      }

      &.notAvailable {
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
