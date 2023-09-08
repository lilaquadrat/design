<template>
<<<<<<< HEAD
    <section
    class="lila-checkbox"
      :colorConfig="{
        background: '#ffffff',
        border: '#0d0d0d',
        leftPlunk: '#8A8A8A',
        topPlunk: '#E0E0E0'
      }"
      @handleChange="noRefCheck"
    >
      <p color="#8A8A8A" :fontSize="16" fontType="body" :fontWeight="400">
        I agree to terms & conditions
      </p>
    </section>
</template>
  <style lang="less" scoped>
  @import (reference) "@{projectPath}/source/less/shared.less";
  .lila-input{
      padding: 10px;
      &.small {
          width: 20vw - 3rem;
          font-weight: 300;
      }
      &.medium {
          width: 50vw - 3rem;
          font-weight: 500;
      }
      &.large {
          width: 100vw - 3rem;
          font-weight: 900;
      }
  }

=======
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

>>>>>>> origin/feedForms
</style>
