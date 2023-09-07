<template>
    <section class="lila-radio" tabindex="">
        <fieldset >
        <!-- <legend>
            <span class="text">{{ name }}</span>
        </legend> -->
            <span>
                <label>
                <input ref="input" type="radio" :disabled="disabled" :checked="value" name="name"
                v-on:change="changeHandler"
                :class="[textType, { valid: valid }]"
                />
                {{ name }} </label>
            </span>

            <span>
                <label>
                <input ref="input" type="radio" :disabled="disabled" :checked="value" name="name"  v-on:change="changeHandler" />
                {{ name }} </label>
            </span>
    </fieldset>
    </section>
</template>

<script lang="ts">
import { Component, ExtPartial, Prop } from '@libs/lila-partial';


@Component
export default class RadioPartial extends ExtPartial {

  @Prop (String) name: string;

  @Prop (String) radio: string;

  @Prop(String) error: string;

  @Prop(Number) length: number;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) value: boolean;

  @Prop(Boolean) valid: boolean;

  textType: string = 'word';

  $refs: {
    input: HTMLInputElement
  };


  changeHandler = ($event: Event) => {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.checked);


  };

  beforeUpdate(): void {

    this.validate();

  }

  mounted(): void {

    this.validate();

  }

  validate() {

    // const target = $event.target as HTMLInputElement;
    // const radioBtns = +(target.checked);
    const checkedTarget = +(document.querySelector('input'));

    if (checkedTarget < 0) { return this.error; }

    console.log(checkedTarget);

    return this.valid;

    // eslint-disable-next-line no-plusplus
    // for (let i = 0; i < radioBtns.length; i++) {

    //   if (radioBtns[i]) {

    //     // eslint-disable-next-line no-plusplus
    //     checkedBtns++;

    //   }

    // }

    // console.log(checkedBtns);

    // if (!checkedBtns) {

    //   return this.error;

    // }

    // return this.valid;

  }


}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";


.lila-radio {

   input {

    display: flex;
    flex-direction: column;
    background: transparent;
    accent-color: @color1;
    &.disabled {
            background-color: @grey;
            pointer-events: none;
            opacity: 0.3;
    }
      &.error {
        input[type="radio"]:checked {
        outline-color:red;
        }
      }

   }

   fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    }


}

</style>
