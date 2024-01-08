<template>
  <section :class="[variant, view]" class="lila-module lila-quellcode-module">
    <lila-textblock-partial v-bind="$props" />
    <lila-highlight-partial v-bind="$props" />
  </section>
</template>
<script setup lang="ts">

const props = defineProps<{

  text: string[];

  code: string;

  headline: string;

  subline: string;

  intro: string;
  view?: string;
  variant: string[];

}>();

</script>

<style lang="less" scoped>


.lila-quellcode-module {
  .module;
  .modulePadding('none');

  display: grid;
  gap: 40px;
  justify-items: center;
  max-width: @desktopWidthExt;

  .lila-textblock {
    .modulePadding();
    max-width: @desktopWidth;

    &.center {
      text-align: center;
    }

  }

}
</style>
