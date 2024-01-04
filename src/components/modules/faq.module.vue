<template>
  <section :id="id" :class="[variant, view]" class="lila-faq-module lila-module">

    <lila-textblock-partial v-if="textblock" v-bind="textblock" />
    <lila-accordion-partial v-if="accordion" v-bind="accordion" />

  </section>
</template>
<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type Textblock from '@interfaces/textblock.interface';
import type Accordion from '@interfaces/Accordion.interface';

const props = defineProps<{
  textblock: Textblock;

  accordion: Accordion;
  variant?: string[];
  id?: string;
  view?:string;

}>();


</script>
<style lang="less" scoped>


.lila-faq-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  &.medium {
    max-width: @moduleWidth_M;
  }

}
</style>
