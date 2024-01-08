<template>
  <figure class="lila-quote">
    <blockquote :class="[variant, textSize]" v-if="notEmpty">
      "{{ quote }}"
    </blockquote>
    <figcaption ref='checkPartialSize' :class="variant">
      <span v-if="citation || linkExists">{{ citation }}</span><span v-if="citation && linkExists">,</span>
      <cite v-if="linkExists">
        <lila-link-partial v-bind="link"></lila-link-partial>
      </cite>

    </figcaption>
  </figure>
</template>

<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type Link from '@interfaces/link.interface';

import { computed, nextTick, watch, onMounted } from 'vue';

const props = defineProps<{
  quote: string;

  link?: Link;

  citation: string;

}>();
let textSize: string = '';

watch(props, (): void => {

  setTextSize();

});


watch('variant', function (): void {

  setTextSize();

});


const notEmpty = computed((): boolean => {

  return !!props.quote;

});

function setTextSize (): void {


  nextTick().then(() => {

    const element = this.$refs.checkPartialSize as HTMLInputElement;

    // need ref element  here
    // Small Sized Partial
    if (props.quote.length && element.classList.contains('small')) {

      if (props.quote.length <= 20) textSize = 'headline_XL';

      else if (props.quote.length <= 65) textSize = 'headline_L';

      else if (props.quote.length <= 125) textSize = 'headline_M';

      else if (props.quote.length <= 170) textSize = 'headline_S';

      else textSize = 'headline_XS';

    }

    // Normal Sized Partial
    else if (props.quote.length) {


      if (props.quote.length <= 45) textSize = 'headline_XL';

      else if (props.quote.length <= 100) textSize = 'headline_L';

      else if (props.quote.length <= 150) textSize = 'headline_M';

      else if (props.quote.length <= 390) textSize = 'headline_S';

      else textSize = 'headline_XS';

    }

  });

}

onMounted(() => {

  setTextSize();

});

const linkExists = computed(() => {

  return props.link?.text && props.link?.link;

});

</script>
<style lang="less" scoped>


.lila-quote {

  display: grid;
  gap: 15px;

  blockquote {
    .font-head;
    color: @color1;

    &.headline_XL {
      font-size: @headline_XL;
      line-height: @headlineLineHeight_XL;

      @media @smartphone {
        font-size: @headline_L;
        line-height: @headlineLineHeight_XL;
      }
    }

    &.headline_L {
      font-size: @headline_L;
      line-height: @headlineLineHeight_XL;
    }

    &.headline_M {
      font-size: @headline_M;
      line-height: @headlineLineHeight_L;
    }

    &.headline_S {
      font-size: @headline_S;
      line-height: @headlineLineHeight_M;
    }

    &.headline_XS {
      font-size: @headline_XS;
      line-height: @headlineLineHeight_S;
    }

    &.quoteRight {
      text-align: right;
    }

    &.quoteCenter {
      text-align: center;
    }

  }

  figcaption {

    font-size: @fontTextSmaller;

    &.authCenter {
      text-align: center;
    }

    &.authRight {
      text-align: right;
    }
  }

}
</style>
