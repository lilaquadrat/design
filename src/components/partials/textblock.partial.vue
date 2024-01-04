<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import { computed, type ComputedRef } from 'vue';

const props = defineProps<{
  headline?: string
  subline?: string
  intro?: string
  text?: string[]
  links?: LinkListWithTitle
  list?: ListWithTitle
  variant?: string[]
}>();
const notEmpty: ComputedRef<boolean> = computed(() => !!(props.headline || props.subline || props.intro || props.text)); 

</script>

<template >
  <section :class="[variant]" v-if="notEmpty" class="lila-textblock">
    <h1 v-if="headline">{{ headline }}</h1>
    <h2 v-if="subline">{{ subline }}</h2>

    <h3 v-if="intro">{{ intro }}</h3>
    <p v-for="(singleText, index) in text" :key="`text-${index}`">
      {{ singleText }}
    </p>

    <slot></slot>
  </section>
</template>

<style lang="less" scoped>
.lila-textblock {
  display: grid;
  gap: 15px;
  width: 100%;
  word-break: break-word;

  .headlines;

  p {
    .font-normal;
    color: @textColor;
    font-size: @fontText;
  }

  h2 + h3 {
    .multi(margin-top, 2);
  }

  &.bright {

    h1, h2, h3, h4, h5, p {
      color: @white;
    }
  }

  &:empty {
    display: none;
  }
}
</style>