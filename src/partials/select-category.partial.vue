<template>
  <section class="lila-select-category-partial">

    <label class="single-category" :class="{'not-selected': single.id !== value}" v-for="(single, index) in categories" :key="`select-${index}`" :value="single.id">
      <div class="indicator">
        <span class="active"></span>
      </div>
      <h1>{{ single.name }}</h1>
      <h3>{{ single.price.amount }} {{ single.price.currency }}</h3>
      <h4 class="tax">inkl. {{ single.price.tax }}% MwSt</h4>
      <p class="description">{{ single.description }}</p>
      <input name="category" :value="single.id" type="radio" @change="changeHandler(single.id)">
    </label>

  </section>
</template>
<script lang="ts">
import { ListCategory } from '@lilaquadrat/studio/lib/interfaces';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class agreementPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(Array) categories: ListCategory[];

  textType: string = 'word';

  changeHandler(selected: string): void {

    console.log(selected);
    this.$emit('input', selected);

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

    .indicator {
      display: grid;
      align-content: center;
      justify-content: center;
      align-self: center;
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
        color: @grey;
      }

      &:hover {

        h1, h3 {
          color: @color1;
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
