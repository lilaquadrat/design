<template>
  <section class="lila-checkbox-container">
      <label
        :class="[textType, {disabled:disabled, checked: value, notChecked}]"
        class="checkbox"
        tabindex="" >
        <!--  -->
        <div class="markierung">
        <span class="checked-marked">
          <lila-icons-partial type="checked" size="small" color-scheme="red"/>
        </span>

        <!-- description box  -->
        <span v-if="textType !== 'noText'" class="label" :class="[textType]">
          <slot v-if="!text" />
            <p color="#8A8A8A" :fontSize="16" fontType="body" :fontWeight="400">
            I agree to terms & conditions
            </p>
        </span>
        <!--  -->
        <div v-if="!text" class="label-container">
        </div>
      </div>
      <input type="checkbox"  :disabled="disabled" :checked="value" @change="handleChange" />
        {{ value }}
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

  @Prop(Boolean) value: boolean;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;

  @Prop(Boolean) notChecked: boolean;

  @Prop(String) text: string;

  textType: string = 'word';


  handleChange($event: Event) {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.checked);
    console.log(target.checked)

  }


}

</script>

<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-checkbox-container {
  .markierung  {
    display: grid;
    grid-template-columns: 20px, auto;
    grid-template-areas: "checkbox label";
    grid-column-gap: 20px;
    cursor: pointer;

  }


label.checkbox {
  grid-area: label;


input  {
  grid-area: checkbox;
  &[type='checkbox'] {
    // display: none;
  }
}

.checked-marked {
  content: '';
  height: fit-content;
  width: fit-content;
  border: 2px solid @textColor;


  }

  &.disabled {
      pointer-events: none;
      user-select: none;
      .checked-marked {
        border:solid 3px @grey;
      }
      &.checked {
        .checked-marked {
          background-color: @grey;
        }
      }
      .label {
        color: @grey;
      }
  }



// &.checked-marked {

//   .checked-marked {
//     border: solid 1px @color1;
//     accent-color: @color1;

//     svg {
//       stroke: @white;
//       stroke-width: 3;
//     }
//   }

//   &:hover {

//     .checked-marked {
//       border: solid 3px @color3;
//       background-color: @color3;
//     }
//   }
}
}

</style>
