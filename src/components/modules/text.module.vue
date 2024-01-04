<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';


const props = defineProps<{
  headline?: string
  subline?: string
  intro?: string
  text?: string[]
  links?: LinkListWithTitle
  list?: ListWithTitle
  variant?: string[]
}>();
const listVariant = (type: 'list' | 'links') => {

  const base = [];

  if (props.variant?.includes('center')) {

    base.push('noStyle');
    base.push('center');

  }

  if (props.variant?.includes('actions') && type !== 'list') {

    base.push('actions');

  }

  return base;

}; 

</script>
<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<template>
  <article class="lila-text-module lila-module">

    <lila-textblock-partial v-bind="props" />
    <lila-list-partial v-bind="list" mode="list" :variant="listVariant('list')"></lila-list-partial>
    <lila-list-partial v-bind="links" mode="links" :variant="listVariant('links')"></lila-list-partial>
    
  </article>
</template>

<style lang="less" scoped>
.lila-text-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  &.center {
    text-align: center;
  }

  &.notice {

    .modulePadding('none');
    justify-content: center;
    max-width: 100%;

    background-color: @color1;

    .lila-textblock {
      .modulePadding('full');

      max-width: @moduleWidth_S;
      color: @white;

      h1, h2, h3, p {

        color: @white;
      }
    }

  }
}
</style>