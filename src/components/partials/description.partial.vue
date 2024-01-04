<template>
  <section class="lila-description-partial" :class="[type, { padding: padding, margin: margin, background: background }]">
    <h4 v-if="label">{{ label | translate }}</h4>
    <p>
      <slot></slot>
    </p>
  </section>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{

    label: string;

    padding: boolean;

    margin: boolean;

    type: string;

    background: boolean;


  }>(),
  {
    background: true,
  });

</script>
<style lang="less" scoped>


.lila-description-partial {
  .font-bold;
  color: @color1;
  font-size: @fontTextSmaller;
  text-align: left;

  border-left: solid 2px @color1;

  .multi(padding, 2);

  display: grid;
  gap: 10px;

  h4 {
    text-transform: uppercase;
    font-size: @fontTextSmaller;
    .font-head;
  }

  p {
    font-size: @fontTextSmaller;
  }

  &.background {
    background-color: @grey1;
  }

  &.success {
    border-left-color: @success;
    background-color: @success;
    color: @white;

    h4 {
      color: @white;
    }
  }

  &.error {
    border-left-color: @error;
    background-color: @error;
    color: @white;

    h4 {
      color: @white;
    }
  }

  &.margin {
    .multi(margin-top, 4);
    .multi(margin-bottom, 4);
  }

  &.padding {
    .multi(padding, 4);
  }
}
</style>
