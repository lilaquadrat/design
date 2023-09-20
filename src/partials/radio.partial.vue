<template>
  <section class="lila-radio-container">
    <label :class="[textType, {checked:value === single.value , disabled}]" class="radio" tabindex="" v-for="(single, index) in elements" :key="`element-${index}`">
      <div class="indicator-text">
        <span  class="indicator">
          <lila-icons-partial type="checked" size="small" colorScheme="color1"/>
        </span>
        <!--  -->
        <span class="label">
          <description-partial inline v-if="description ">{{ description }}</description-partial>
          {{single.text}}
        </span>

        <div class="label-container">
          <span class="disabled" v-if="disabled"> {{ description }}</span>
        </div>
      </div>

      <!-- error class -->
      
      <input type="radio" name="test" :disabled="disabled" :value="single.value" @change="changeHandler">  
    </label>
    {{ value }}
  </section>
</template>

<script lang="ts">
import { Component, ExtPartial, Prop } from '@libs/lila-partial';

@Component
export default class RadioPartial extends ExtPartial {

  @Prop(String) value: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) valid: boolean;

  @Prop(String) description: string;

  @Prop(Array) elements: {value: string, text: string}[]

  textType: string = 'word';

  $refs: {
    input: HTMLInputElement
  };
  
  
  
  changeHandler($event: Event): void {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.value)  

} 
  
}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-radio-container {

  .indicator-text {
    display: grid;
    grid-template-areas: "radio description";
    grid-template-columns: 20px auto;
    gap: 10px;
  }
}

label.radio {
  cursor: pointer;

  .indicator {
    content: '';
    display: flex;
    grid-area: radio;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid @textColor;
    border-radius: 50%;
  }

  .lila-icons-partial {
    grid-area: radio;
    opacity: 0;
  }

  input {

    &[type="radio"] {
      display: none;
    }
  }

  &:hover {

    .indicator {
      border: solid 2px @color1;

      .lila-icons-partial {
        color: @color1;
        opacity: 1;
      }
    }

    .label {
      color: @color3;
    }
  }

  &.checked {

    .indicator {
      border: 1px solid @color1;
      background-color: @color1;

      .lila-icons-partial {
        color: white;
        opacity: 1;
      }
    }

    &:hover {

      .indicator {
        border: solid 1px @color3;
        background-color: @color3;
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
        color: @grey;
      }
    }

  }

}
</style>
