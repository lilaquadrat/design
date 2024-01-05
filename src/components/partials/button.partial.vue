<template>
    <button class="lila-button base" :disabled="disabled" :class="[colorScheme, { doublecheck: doublecheck, showCheck: showCheck, confirmed: confirmed, icon, noPadding }]" @click="confirm">
        <slot v-if="!showCheck && !confirmed" />
        <span v-if="showCheck">Please confirm your action.</span>
        <span v-if="confirmed">confirmed</span>
    </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// import { ExtPartial, Component, Prop } from '../libs/lila-partial';

const props = withDefaults(
  defineProps<{
        doublecheck?: string,
        disabled?: boolean,
        icon?: boolean,
        noPadding?: boolean,
        colorScheme?: string,
    }>(),
  {}
);
let showCheck = ref(false);
let timeout = ref<number>();
let confirmed = ref(false);
let emit = defineEmits<{(e: string): void}>();
const check = (): void => {

  if (!showCheck.value) {

    showCheck.value = true;
    timeout.value = window.setTimeout(() => {

      showCheck.value = false;

    }, 5000);

  } else {

    showCheck.value = false;
    confirmed.value = true;

    clearTimeout(timeout);

    timeout.value = window.setTimeout(() => {

      confirmed.value = false;

    }, 15000);

    emit('confirmed');
    emit('click');

  }
};
const confirm = (): void => {

  if (props.doublecheck) {

    check();

  } else {

    emit('confirmed');
    emit('click');

  }
};

</script>


<style lang="less" scoped>


.lila-button {

  border: none;
  background: transparent;

  outline: none;

  white-space: nowrap;
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  .trans(background);

  &.base {
    height: @buttonHeight;
    font-size: @fontTextSmaller;

    line-height: @buttonLineHeight;

    text-transform: uppercase;

    .font-head;
    .multi(padding, 0, 3);
  }

  &.colorScheme1,
  &.colorScheme2 {

    &.save {

      &.init {
        background-color: transparent;
        color: @color1;

        span {

          &:after {
            background-color: @color1;
          }
        }
      }
    }

    &.success {
      background-color: @success;
      color: @white;
    }

  }

  &.colorScheme1 {
    background-color: @color3;
    color: @white;

    &:hover {
      background-color: @color1;
    }

  }

  &.colorScheme2 {
    background-color: @grey1;
    color: @textColor;

    &:hover {
      background-color: @color2;
    }

    &.router-link-active {
      background-color: @grey;

      &:hover {
        background-color: @grey1;
        color: @textColor;
      }

    }

  }

  &.transparent {
    padding: 0;
    background-color: transparent;
    color: @textColor;
    .trans(color);

    &:hover {
      color: @color1;
    }
  }

  &.hoverSchema1 {

    &:hover {
      background-color: @grey1;
      color: @textColor;
    }

  }

  &.icon {

    display: grid;
    align-items: center;
    justify-items: center;
    width: 35px;
    height: 35px;
    padding: 0;
  }

  &.noPadding {
    padding: 0;
  }

  &.full {
    width: 100%;
    text-align: center;
  }

  &:disabled {
    background-color: @grey;
    pointer-events: none;
    user-select: none;
  }

  &.callToAction {
    .base;
    .colorScheme1;
    .trans(background);
  }

  &.scrollButton {
    display: grid;
    text-align: center;
    .font-head;

    .icon {
      justify-self: center;
      margin-top: 5px;
    }
  }
}
</style>