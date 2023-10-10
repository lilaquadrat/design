<template>
  <section class="action-notice-partial">

    <overlay-background-partial v-if="open" @mounted="calculateOptionsStyle" @close="closeOptions">
      <ul class="error-list" @click="toggleErrors" @keydown="toggleErrors" :style="optionsStyle">
        <li v-for="(error, index) in flattenedErrors" :key="`parsedErrors-${index}`">
          <template v-if="error.translatedPath">
            <template v-if="error.translatedPath.path !== 'main'">
              <template v-if="error.parentPath">
                {{$translate(error.parentPath.path, error.parentPath.values)}}
              </template>
              {{$translate(error.translatedPath.path, error.translatedPath.values)}}
            </template>
          </template>
          {{error.error}}
        </li>
      </ul>
    </overlay-background-partial>

    <section class="buttons-container">
      <div class="slot-container"><slot /></div><button-partial v-if="hasErrors" @click="toggleErrors" ref="trigger" type="button" variant="error" />
    </section>

  </section>
</template>
<script lang="ts">
import ActionNotice, { ErrorsObject } from '@libs/ActionNotice';
import { ExtPartial, Prop, Watch } from '@libs/lila-partial';
import { ErrorObject } from 'ajv/dist/types';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ActionNoticePartial extends ExtPartial {

 @Prop(Object) errors: {message: string, errors: ErrorObject[]};

 @Prop(Object) preparsedErrors: ErrorsObject;

 @Prop(String) translationPre?: string;

 open: boolean = false;

 calculatedOptions = {};

 parsedErrors: ErrorsObject = {};

 flattenedErrors: ErrorsObject = {};

 @Watch('errors')
 watchErrors() {

   if (this.errors?.errors) {

     this.parsedErrors = ActionNotice.parse(this.errors.errors, this.translationPre);
     this.flattenedErrors = this.flattenErrors(this.parsedErrors);

   } else {

     ActionNotice.reset();
     this.parsedErrors = {};

   }

   this.calculateOptionsStyle();
   this.$emit('update', this.parsedErrors);

 }

 @Watch('preparsedErrors')
 watchpreparsedErrors() {

   if (this.preparsedErrors) {

     this.parsedErrors = this.preparsedErrors;

   }

 }

 flattenErrors(errors: ErrorsObject) {

   const flattenedErrors = {};

   Object.keys(errors).forEach((single) => {

     console.log(single);

     if (errors[single].translatedPath) {

       flattenedErrors[single] = errors[single];

     } else {

       Object.values(errors[single]).forEach((child, index) => {

         console.log(94, errors[single], child);
         Object.keys(child).forEach((childKey) => {

           flattenedErrors[`${single}-element-${index}-${childKey}`] = {
             ...child[childKey],
             parentPath: {
               path: this.translationPre ? `${this.translationPre}-${single}-parent` : `${single}-parent`,
               values: [index + 1],
             },
           };

         });

       });


     }

   });

   return flattenedErrors;

 }

 mounted() {

   window.addEventListener('scrolled', () => {

     if (this.open) this.closeOptions();

   });

   window.addEventListener('resized', () => {

     if (this.open) this.closeOptions();

   });

   if (this.preparsedErrors) {

     this.parsedErrors = this.preparsedErrors;

   }

 }

 get hasErrors() {

   return !!this.errors?.errors || !!this.preparsedErrors;

 }

 closeOptions() {

   this.open = false;

 }


 toggleErrors() {

   this.open = !this.open;

 }

 calculateOptionsStyle() {

   const vueElement = this.$refs.trigger as Vue;
   const optionsContainer = document.querySelector('.overlay-background .error-list') as HTMLElement;

   if (!vueElement || !optionsContainer) return;

   const element = vueElement.$el as HTMLElement;
   const bounds = element.getBoundingClientRect();
   let top = bounds.top + element.offsetHeight;
   const left = bounds.left - optionsContainer.offsetWidth + element.offsetWidth;

   top = bounds.top - 5 - optionsContainer.offsetHeight;

   console.log(optionsContainer.offsetWidth, element.offsetWidth);

   this.calculatedOptions = {
     top: `${top}px`,
     left: `${left}px`,
   };

 }

 get optionsStyle() {

   return this.calculatedOptions;

 }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.action-notice-partial {
  position: relative;
  display: grid;

  .buttons-container, .slot-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    justify-content: end;
  }

}

.error-list {
  position: absolute;
  display: grid;
  overflow-y: auto;

  max-height: 30vh;
  background-color: @grey2;
  box-shadow: 0 0 5px 1px @shadow;

  white-space: nowrap;

  .multi(padding, 4);

  li {
    .font-bold;
  }
}
</style>
