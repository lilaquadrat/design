<template>
  <section :class="[variant, view]" class="lila-module lila-quote-module">
    <lila-quote-partial v-bind="$props"></lila-quote-partial>
  </section>
</template>

<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type Link from '@interfaces/link.interface';

const props = defineProps<{

  quote: string;

  link: Link;

  citation: string;
  view?: string;
  variant: string[];
}>();


</script>

<style lang="less" scoped>


.lila-quote-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_M;

  &.small {
    max-width: @moduleWidth_S;
  }
}
</style>
