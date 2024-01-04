<template>
  <section ref="el" :id="id" :class="[view, { hasImage: picture }, variant]" class="lila-pictureandtext-module lila-module">
    <lila-picture-partial :fit="fitVariant" v-bind="picture" />

    <section class="grid-container">

      <lila-textblock-partial v-bind="textblock" />

      <lila-list-partial v-if="list" v-bind="list"></lila-list-partial>
      <lila-list-partial v-if="links" v-bind="links"></lila-list-partial>

      <lila-legend-partial v-if="legend" v-bind="legend"></lila-legend-partial>

    </section>

  </section>
</template>
<script setup lang="ts">
import checkInview from '../../mixins/checkin';
import type Link from '@interfaces/link.interface';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  picture: Picture;

  textblock: Textblock;

  legend: string[];

  links: Link[];

  list: string[];
  id?:string;
  view?: string;
  variant: string[];
}>();
let el = ref(null);

onMounted((): void => {

  checkInview(el);

});


const fitVariant = computed(() => {

  return props.variant.includes('fit');

});

</script>
<style lang="less" scoped>


.lila-pictureandtext-module {
  .module;
  .modulePadding('none');

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  @media @desktop {

    .modulePadding();
    max-width: @moduleWidth_M;

  }

  @media @desktop {
    display: grid;
    grid-template-columns: minmax(min-content, 40%) 1fr;

    &.focusImage {
      grid-template-columns: minmax(min-content, 60%) 1fr;
    }
  }

  .grid-container {
    display: grid;
    gap: 40px;

    .modulePadding();

    align-content: center;

    @media @desktop {
      .modulePadding('none');
    }

  }

  &.fit {

    img {

      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &.variant1 {

    @media @desktop {
      grid-template-columns: 1fr minmax(min-content, 40%);

      &.focusImage {
        grid-template-columns: 1fr minmax(min-content, 60%);
      }

      .textblock {
        grid-row: 1;
        grid-column: 1;
      }

      figure {
        grid-row: 1;
        grid-column: 2;
      }
    }
  }
}
</style>
