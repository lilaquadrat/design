<template>
  <section ref="el" :id="id" :class="[view, position, variant]" class="lila-index-module lila-module">
    <section class="index-container">
      <lila-list-partial mode="links" v-bind="useLinks" :variant="listVariant" />
    </section>
  </section>
</template>
<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type LinkListWithTitle from '@interfaces/LinkListWithTitle.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed, onMounted, ref } from 'vue';
import type { AdditionalContentInformation } from '@lilaquadrat/studio/lib/interfaces';
import checkInview from '../../mixins/checkin';

const props = defineProps<{
  textblock: Textblock;

  links: LinkListWithTitle;

  legend: string[];
  variant: string[];
  date: string;
  id?: string;
  view?: string;
  position: string;
  additional: AdditionalContentInformation;
}>();
let el = ref(null);

onMounted((): void => {

  checkInview(el);

});


const useLinks = computed(() => {

  if (props.variant.includes('auto')) {

    return {
      title: props.links?.title,
      value: props.additional.index?.map((single) => ({
        text: single?.title,
        link: `#${single.anchor}`,
        attributes: ['static'],
      })),
    };


  }

  return props.links;

});
const listVariant = computed(() => {

  const variants = [];

  if (props.variant.includes('backgroundColor1') || props.variant.includes('backgroundColor3')) variants.push('white');
  if (props.variant.includes('numbered')) variants.push('numbered');

  return variants;

});


</script>
<style lang="less" scoped>


.lila-index-module {
  .module;

  display: grid;
  gap: 20px;

  .index-container {
    display: grid;
    justify-self: center;
    width: 100%;
    max-width: @moduleWidth_S;
  }

  &.medium {

    .index-container {

      max-width: @moduleWidth_M;
    }
  }

  &.top {
    .multi(padding-top, 8);
    .multi(padding-bottom, 8);
  }

  &.backgroundGrey {
    background-color: @grey1;
  }

  &.backgroundColor1 {
    background-color: @color1;
  }

  &.backgroundColor3 {
    background-color: @color3;
  }
}
</style>
