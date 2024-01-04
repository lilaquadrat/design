<template>
  <section :class="{gap:gap}" class="lila-button-group">
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
// import { ExtPartial, Component, Prop } from '../libs/lila-partial';
const props = defineProps<{
  gap: boolean;
}>();

</script>
<style lang="less" scoped>


.lila-button-group {

  display: flex;
  gap: 10px;

  justify-content: end;
  flex-direction: row-reverse;
  flex-wrap: wrap;

  &.gap {
    gap: 10px 20px;
  }

}
</style>
