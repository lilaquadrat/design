<template>
    <fieldset>
        <div>
          <label class="lila-checkbox">
            <input
            type="checkbox"
            :disabled="disabled"
            @change="changeHandler"
            > rot
        </label>
        </div>

        <div>
          <label class="lila-checkbox">
            <input
            type="checkbox"
            :disabled="disabled"
            @change="changeHandler"
            > grün
        </label>
        </div>
    </fieldset>

</template>

<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class CheckboxPartial extends ExtPartial {

  @Prop (String) error: string;

  @Prop (String) size: string;

  @Prop (Boolean) disabled: boolean;


  changeHandler($event: Event) {

    const target = $event.target as HTMLInputElement;

    this.$emit('input', target.checked);

  }


}
</script>
<style lang="less">
@import  (reference) "@{projectPath}/source/less/shared.less";

.lila-checkbox {

    label.input {
      padding: 100px
    }

    input {

      accent-color: @color1;

        &.disabled {
        background-color: @grey;
        pointer-events: none;
        opacity: 0.3;
      }
    }
}

    fieldset {
      border: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

</style>
