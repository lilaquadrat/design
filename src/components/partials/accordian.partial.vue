<template>
  <section class="lila-accordion" :class="{ noControls: disableControls || renderTarget === 'pdf' }">
    <slot></slot>

    <section v-for="(single, index) in useElements" :ref="`accordion${index}`" class="single-accordion"
      :class="{ visible: single.visible }" :key="`accordion-${index}`">

      <component class="headline" :is="disableControls || renderTarget === 'pdf' ? 'h3' : 'button'"
        @click="toggle(single, index)">
        <span>{{ single.headline }}</span>
        <lila-icons-partial v-if="!disableControls && renderTarget !== 'pdf'" :animate="true"
          :rotate="single.visible ? 90 : 0" type="arrow-right" />
      </component>

      <section :style="`height: ${single.visible ? single.height : '0px'}`" class="accordion-content-container">
        <section class="accordion-content">
          <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />
          <lila-list-partial v-bind="single.list" mode="list" :variant="listVariant('list')"></lila-list-partial>
          <lila-list-partial v-bind="single.links" mode="links" :variant="listVariant('links')"></lila-list-partial>
        </section>
      </section>

      <div class="accordion-content-placeholder">
        <section class="accordion-content">
          <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />
          <lila-list-partial v-bind="single.list" mode="list" :variant="listVariant('list')"></lila-list-partial>
          <lila-list-partial v-bind="single.links" mode="links" :variant="listVariant('links')"></lila-list-partial>
        </section>
      </div>

    </section>

  </section>
</template>
<script setup lang="ts">

// neef fix this.$ref
import { ref, onMounted, type Ref, nextTick } from 'vue';
import type AccordionElement from '@interfaces/AccordionElement.interface';
import hardCopy from '../../mixins/hardCopy';

const itemRefs: Ref<HTMLElement[]> = ref([]);
const props = defineProps<{
  multiOpen: boolean;
  disableControls: boolean;
  openOnStart: 'first' | 'all';
  elements: AccordionElement[];
  variant: string[];
  listVariant:(type:string)=>string[];
  renderTarget: 'pdf'| 'web'
}>();
let useElements: (AccordionElement & { visible: boolean, height: string, headline: string })[] = [];

onMounted(() => {
  setElements(props.elements, true);

  window.addEventListener('resized', () => {
    setElements(props.elements);

  });
});

function toggle (element: AccordionElement & { visible: boolean, height: number, headline: string }, index: number) {

  let newVisible;

  if (props.disableControls) return;

  if (!props.multiOpen) {

    if (element.visible) {

      element.visible = false;

    } else {

      useElements.forEach((single) => {

        single.visible = false;

      });

      newVisible = true;

    }


  } else {

    newVisible = !element.visible;

  }


  const refElement = itemRefs.value[`accordion${index}`][0] as HTMLElement;
  const placeholder = refElement.querySelector('.accordion-content-placeholder');

  useElements[index].height = `${placeholder?.clientHeight}px`;

  element.visible = newVisible;


}

function setElements (this, elements: AccordionElement[], resetVisible = false) {

  const newElements: any[] = [];

  hardCopy(elements).forEach((single: { textblock: { headline: any; }; }, index: number) => {

    let visible = useElements[index]?.visible;

    if (resetVisible) {


      if (props.openOnStart === 'first' && index === 0) visible = true;
      if ((props.openOnStart === 'all' && props.multiOpen)) visible = true;

    }

    if (this.renderTarget === 'pdf') visible = true;

    const headline = single.textblock?.headline;

    delete single.textblock?.headline;

    if (!headline) return;

    newElements.push({
      ...single,
      headline,
      visible,
      height: this.renderTarget === 'pdf' ? 'auto' : '0px',
    });


  });

  useElements = newElements;

  nextTick(() => {

    Object.values(this.$refs as HTMLElement).forEach((single: [HTMLElement], index: number) => {

      const placeholder = single[0]?.querySelector('.accordion-content-placeholder');
      const useElement = useElements[index];

      if (!useElement) return;

      useElement.height = placeholder?.clientHeight;

    });

  });

  function listVariant (type: string):string[]{

    const base = props.variant || [];

    if ( props.variant.includes('center')) {

      base.push('noStyle');
      base.push('center');

    }

    if ( props.variant.includes('actions') && type !== 'list') {

      base.push('actions');

    }

    return base;

  }

}
</script>
<style lang="less" scoped>


.lila-accordion {

  display: grid;

  .single-accordion {
    position: relative;
    display: grid;

    .headline {
      .font-bold;
      .multi(padding, 4, 0);

      display: grid;
      grid-template-columns: 1fr 40px;
      gap: 10px;
      border: 0;
      border-bottom: solid 1px @color2;
      background: transparent;
      color: @color1;

      font-size: @headline_XS;
      line-height: @headlineLineHeight_XS;
      text-align: left;
      cursor: pointer;

      @media @tablet,
      @desktop {
        font-size: @headline_S;
        line-height: @headlineLineHeight_S;
      }
    }

    .accordion-content-container {
      overflow: hidden;
      .trans(height);
    }

    .accordion-content-placeholder {
      .multi(padding-bottom, 8);
      position: absolute;
      visibility: hidden;
    }

    .accordion-content-container,
    .accordion-content-placeholder {

      .accordion-content {
        .multi(padding-top, 4);
        .multi(padding-bottom, 8);

        display: grid;
        gap: 40px
      }
    }

    .lila-icons-partial {
      align-self: start;
      justify-self: center;
      margin-top: 3px
    }
  }

  &.noControls {

    .single-accordion {

      button {
        grid-template-columns: 1fr;
        cursor: auto;
      }
    }

  }

}
</style>
