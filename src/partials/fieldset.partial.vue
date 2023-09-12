<template>
    <fieldset class="lila-fieldset">
        <legend v-if="legend">
            <span class="text">{{ legend }}</span>
            <hr />
        </legend>
        <slot />
    </fieldset>
  </template>

<script lang="ts">
import Link from '@interfaces/link.interface';
import {
  Component, ExtPartial, Prop, Watch,
} from '../libs/lila-partial';


@Component
export default class fieldsetPartial extends ExtPartial {

  @Prop(String) legend?: string;


}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

fieldset {
  display: grid;

  border: 0;
  .multi(padding, 8, 0);
  gap: 10px;

  legend {
    position: relative;
    display: grid;
    grid-template-columns: max-content 1fr;

    width: 100%;
    text-transform: uppercase;

    .text {
      position: relative;
      z-index: 400;
      background-color: @white;
      color: @color1;
      mix-blend-mode: multiply;
      .multi(padding-right, 2);
      .font-head;
    }

    hr {
      height: 2px;
      background-color: @color1;
      align-self: center;
    }

  }

}
</style>

