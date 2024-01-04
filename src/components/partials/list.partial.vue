<script setup lang="ts">
import type Link from '@/interfaces/link.interface';
import { computed, type ComputedRef } from 'vue';

const props = defineProps<{
  value?: (string | Link)[]
  title?: string
  mode: 'list' | 'links'
  variant?: string[]
}>();
const isNumbered: ComputedRef<boolean> = computed(() => !!props.variant?.includes('numbered')); 
const noStyle: ComputedRef<boolean> = computed(() => !!props.variant?.includes('noStyle')); 
const actions: ComputedRef<boolean> = computed(() => !!props.variant?.includes('actions')); 
const notEmpty: ComputedRef<boolean> = computed(() => {
  
  return !!props.value?.find((single) => {

  if (typeof single === 'string') return single.length > 0;
  return single.text?.length > 0;

  });

}); 
const filteredValues: ComputedRef<(string | Link)[]|undefined> = computed(() => {

  return props.value?.filter((single) => {

    if (typeof single === 'string' && single.length) return single;
    if (typeof single === 'object' && single.text && single.link) return single;
    return false;

  });

}); 

</script>

<template>

  <section class="lila-list-links" v-if="notEmpty" :class="variant">
    <h4 v-if="title">{{ title }}</h4>

    <ul v-if="!actions || mode === 'list'">
      <li v-for="(single, index) in filteredValues" :key="`list-element-${index}`">

        <lila-icons-partial v-if="!isNumbered && !noStyle" size="small" :type="'arrow-right'"/>

        <lila-link-partial v-if="typeof(single) === 'object'" v-bind="single" />
        <template v-if="typeof(single) === 'string'">{{ single }}</template>

      </li>
    </ul>

    <lila-link-group-partial :variant="variant" v-if="actions">

      <template v-for="(single, index) in filteredValues" >
        <lila-link-partial v-if="typeof(single) === 'object'" v-bind="single" :key="`list-actions-element-${index}`" />
      </template>

    </lila-link-group-partial>

  </section>

</template>

<style lang="less" scoped>
.lila-list-links {
  display: grid;

  gap: 10px;
  counter-reset: listItem;

  h4 {
    .multi(margin-left, 4);
  }

  ul {
    display: grid;
    gap: 10px 0;

    li {

      display: grid;
      grid-template-columns: 20px auto;

      align-content: start;

      font-size: @fontText;

      line-height: 20px;

      .icon {
        align-self: start;
        height: 20px;
      }

    }

  }

  &.noStyle, &.actions {

    h4 {
      .multi(margin-left, 0);
    }

    ul {

      li {
        grid-template-columns: 1fr;
      }

    }

  }

  &.numbered {

    ul {

      li {

        &:before {
          content: counter(listItem);
          color: @grey;
          counter-increment: listItem;
        }

      }

    }

  }

  &.actions {

    a {
      height: @buttonHeight;
      line-height: @buttonLineHeight;
    }

  }

  &.white {

    a, h4 {
      color: @white;
    }

    a {

      &:hover {
        color: @color2;
      }
    }
  }

}
</style>