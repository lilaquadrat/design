<script setup lang="ts">

const props = defineProps<{
    gap?: boolean
    variant: string[]
}>();


</script>
<template>
  <section :class="[variant, {gap: props.gap}]" class="lila-link-group">
    <slot></slot>
  </section>
</template>
<style lang="less" scoped>

.lila-link-group {

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  justify-content: start;

  &.center {
    justify-content: center;
  }

  &.gap {
    gap: 20px;
  }

}
</style>