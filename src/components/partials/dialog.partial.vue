<template>
  <section :class="[variant, {hasBackground: colorScheme === 'transparent'}]" class="lila-dialog-partial">
    <section class="dialog-content-container">
      <slot></slot>

      <section class="message-container">
        <h3 v-if="message">{{ $translate(message) }}</h3>
        <p v-if="description">{{ $translate(description)}}</p>
      </section>
    </section>

    <lila-button-group-partial v-if="type === 'check'" gap>
      <lila-button-partial @confirmed="confirm" :colorScheme="colorScheme">{{$translate(CONFIRM)}}</lila-button-partial>
      <lila-button-partial @confirmed="cancel" colorScheme="transparent">{{$translate(CANCEL)}}</lila-button-partial>
    </lila-button-group-partial>

    <lila-button-group-partial v-if="type === 'confirm'" gap>
      <lila-button-partial @confirmed="confirm" colorScheme="transparent">{{$translate(ACKNOWLEDGE)}}</lila-button-partial>
    </lila-button-group-partial>

  </section>
</template>
<script setup lang="ts">
import { type ComputedRef, computed } from 'vue';

const props = defineProps<{
  doublecheck?: boolean;
  type: 'confirm' | 'check';
  message?: string;
  description?: string;
  variant?: string[];
  translations?: {confirm?: string, cancel?: string, acknowledge?: string};
  callback?: (confirm: boolean) => void;
}>();
let emit = defineEmits<{
    (e: string): void
}>();
const colorScheme: ComputedRef<string|undefined> = computed(() => {
  return props.variant?.some((single) => ['error', 'success', 'color1', 'color3'].includes(single)) ? 'transparent' : 'colorScheme1';
}); 
const confirm =() => {
  emit('confirm');
  if (props.callback) props.callback(true);
  return;
}; 
const cancel = () => {
  emit('cancel');
  if (props.callback) props.callback(false);
  return;

};
const CONFIRM = computed((): string => {

  return props.translations?.confirm ?? 'confirm';

});
const CANCEL = computed((): string => {

  return props.translations?.cancel ?? 'cancel';

});
const ACKNOWLEDGE = computed((): string => {

  return props.translations?.acknowledge ?? 'acknowledge';

});
</script>
<style lang="less" scoped>

.lila-dialog-partial {

  .multi(padding, 4);

  display: grid;
  gap: 20px 10px;
  max-width: calc(100% - 40px);
  max-height: calc(100vh - 40px);
  grid-template-rows: minmax(100px, 1fr) min-content;

  border: solid 2px;
  border-color: @grey1;
  border-left: solid 2px @color1;
  background-color: @grey1;

  box-shadow: 0 0 5px @color1;

  @media @tablet, @desktop {
    max-width: @moduleWidth_XS;
  }

  .dialog-content-container {
    display: grid;
    gap: 20px 10px;
    overflow-y: auto;
  }

  &.hasBackground {
    .multi(padding, 4, 4, 2, 4);
  }

  .message-container {
    display: grid;
    gap: 10px;

    h3 {
      color: @color1;
      .font-head;
      font-size: @headline_XS;
      text-transform: uppercase;
    }
  }

  &.success {
    border: solid 2px @success;
    background-color: @success;
    box-shadow: 0 0 5px @success;
  }

  &.error {
    border: solid 2px @error;
    background-color: @error;
    box-shadow: 0 0 5px @error;
  }

  &.color1 {
    border: solid 2px @color1;
    background-color: @color1;
  }

  &.color3 {
    border: solid 2px @color3;
    background-color: @color3;
  }

  &.success,
  &.error,
  &.color1,
  &.color3 {

    button {
      color: @white;
    }

    .message-container {

      button,
      h3,
      p {
        color: @white;
      }
    }

  }

}
</style>
