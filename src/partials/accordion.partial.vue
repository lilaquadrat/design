<template>
  <section class="lila-accordion" :class="{noControls: disableControls}">
    <slot></slot>

    <section v-for="(single, index) in useElements" :ref="`accordion${index}`" class="single-accordion" :class="{visible: single.visible}" :key="`accordion-${index}`">

      <component class="headline" :is="disableControls ? 'h3' : 'button'" @click="toggle(single, index)">
        <span>{{single.headline}}</span>
        <lila-icons-partial v-if="!disableControls" :animate="true" :rotate="single.visible ? 90 : 0" type="arrow-right"/>
      </component>

      <section :style="`height: ${single.visible ? single.height : 0}px`" class="accordion-content-container">
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
<script lang="ts">
import AccordionElement from '@interfaces/AccordionElement.interface';
import hardCopy from '@mixins/hardCopy';
import {
  ExtPartial, Component, Prop, Watch,
} from '../libs/lila-partial';

@Component
export default class AccordionPartial extends ExtPartial {

  @Prop(Boolean) multiOpen: boolean;

  @Prop(Boolean) disableControls: boolean;

  @Prop(String) openOnStart: 'first' | 'all';

  @Prop(Array) elements: AccordionElement[];

  useElements: (AccordionElement & {visible: boolean, height: number, headline: string})[] = [];

  @Watch('elements')
  elementsWatcher(pre: AccordionElement[], post: AccordionElement[]) {

    this.setElements(this.elements, pre.length !== post.length);

  }

  mounted() {

    this.setElements(this.elements, true);

    window.addEventListener('resized', () => {

      this.setElements(this.elements);

    });

  }

  toggle(element: AccordionElement & {visible: boolean, height: number, headline: string}, index: number) {

    let newVisible;

    if (this.disableControls) return;

    if (!this.multiOpen) {

      if (element.visible) {

        element.visible = false;

      } else {

        this.useElements.forEach((single) => {

          single.visible = false;

        });

        newVisible = true;

      }


    } else {

      newVisible = !element.visible;

    }


    const refElement = this.$refs[`accordion${index}`][0] as HTMLElement;
    const placeholder = refElement.querySelector('.accordion-content-placeholder');

    this.useElements[index].height = placeholder?.clientHeight;

    element.visible = newVisible;


  }

  setElements(elements: AccordionElement[], resetVisible = false) {

    const newElements = [];

    hardCopy(elements).forEach((single, index) => {

      let visible = this.useElements[index]?.visible;

      if (resetVisible) {


        if (this.openOnStart === 'first' && index === 0) visible = true;
        if (this.openOnStart === 'all' && this.multiOpen) visible = true;

      }

      const headline = single.textblock?.headline;

      delete single.textblock?.headline;

      if (!headline) return;

      newElements.push({
        ...single,
        headline,
        visible,
        height: 0,
      });


    });

    this.useElements = newElements;

    this.$nextTick(() => {

      Object.values(this.$refs).forEach((single: [HTMLElement], index: number) => {

        const placeholder = single[0]?.querySelector('.accordion-content-placeholder');
        const useElement = this.useElements[index];

        if (!useElement) return;

        useElement.height = placeholder?.clientHeight;

      });

    });

  }

  listVariant(type: string) {

    const base = this[type]?.variant || [];

    if (this.variant.includes('center')) {

      base.push('noStyle');
      base.push('center');

    }

    if (this.variant.includes('actions') && type !== 'list') {

      base.push('actions');

    }

    return base;

  }


}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

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

      @media @tablet, @desktop {
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

    .accordion-content-container , .accordion-content-placeholder {

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
