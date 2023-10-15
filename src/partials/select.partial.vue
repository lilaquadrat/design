<template>
  <section :class="{ error: error, options: open, disabled }" class="select-input label-replacement" tabindex="">
    <button type="button" ref="trigger" class="options-trigger" @click="toggleOptions">
      <span class="selected-container" v-if="selected.length === 0 || selected === 0">{{$translate(placeholder)}}</span>
      <span class="selected-container" v-if="(selected.length > 0 || selected > 0)">
        {{ selectedText }}
      </span>
      <lila-icons-partial type="chevron-down" size="small" />
    </button>

    <lila-overlay-background-partial v-if="open" background="none" ref="options" @mounted="calculateOptionsStyle" @close="closeOptions">
      <section ref="options" class="options-container content-container" :style="optionsStyle">
        
        <section class="select-options">
          <button class="single-option-button" type="button" v-for="(option, index) in filteredOptions" :title="$translate(option.text)" :key="`option-index-${index}`" :value="option.value" :class="[{ selected: isSelected(option.value), hasDescription: option.description, disabled: option.disabled }, option.class]" @click="toggle(option)">
            <span v-if="!isSelected(option.value)" class="box"></span>
            <lila-icons-partial v-if="isSelected(option.value)" type="checked" size="small" />
            <span v-if="option.text" class="text">{{$translate(option.text)}}</span>
            <p v-if="option.description" class="description">{{$translate(option.description)}}</p>
          </button>
        </section>

      </section>
    </lila-overlay-background-partial>
    <lila-input-labels-partial :required="required" :disabled="disabled"><slot /></lila-input-labels-partial>

    <notice-partial v-if="errorMessage" type="error">
      {{errorMessage}}
    </notice-partial>

    <description-partial class="input-description" v-if="description">{{$translate(description)}}</description-partial>

  </section>
</template>
<script lang="ts">
import { Component, Prop, Watch } from '@libs/lila-component';
import hardCopy from '@mixins/hardCopy';
import Translation from '@mixins/translation';
import SelectOption from '../interfaces/selectOption.interface';
import { ExtPartial } from '@libs/lila-partial';
import { ParsedError } from '@libs/ActionNotice';

@Component
export default class selectPartial extends ExtPartial {
  @Prop(String) type: string;

  @Prop(String) placeholder: string;

  @Prop(String) name: string;

  @Prop([Array, String, Number]) value: [] | string | number;

  @Prop(Object) error: ParsedError;

  @Prop(Boolean) required: boolean;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) allowEmpty: boolean;

  @Prop(String) description: string;

  @Prop({type: String, default: 'dropdown'}) mode: 'list' | 'dropdown';

  @Prop({ default: true }) multiple: boolean;

  @Prop(Array) options: SelectOption[];

  selected: string[] | string | number[] | number = [];

  selectedText: string = null;

  calculatedOptions = {};

  open = false;
  @Watch('value')
  watchValue(post: [] | string | number, pre: [] | string | number) {

    if(JSON.stringify(post) !== JSON.stringify(pre)) {
      this.setSelected();
      this.updateSelectedText();
    }
    
  }

  get errorMessage() {

    return this.error?.keyword !== 'required' ? this.error?.error : null;

  }

  get filteredOptions() {

    return this.options;

  }

  get slotUsed() {

    return !!this.$slots.default?.length;

  }

  get notEmpty() {

    if(Array.isArray(this.selected)) return this.selected.length > 0;
    if(typeof this.selected === 'string') return this.selected.length > 0;
    if(typeof this.selected === 'number') return this.selected > 0;

  }

  get singleSelected() {
    return this.options?.find(single => single.value === this.selected);
  }

  calculateOptionsStyle() {

    // eslint-disable-next-line no-unused-expressions
    this.$store.state.height;
    // eslint-disable-next-line no-unused-expressions
    this.$store.state.width;

    const element = this.$refs.trigger as HTMLElement;
    const optionsContainer = document.querySelector('.lila-overlay-background .options-container') as HTMLElement;
    const bounds = element.getBoundingClientRect();

    let top = bounds.top + element.offsetHeight;
    const body = document.querySelector('body');
    const positionTop = bounds.bottom + optionsContainer.offsetHeight + 50 > body.offsetHeight;

    if(positionTop) {
      top = bounds.top - 5 - optionsContainer.offsetHeight;
    }

    this.calculatedOptions = {
      top: `${top}px`,
      left: `${bounds.left}px`,
      'min-width': `200px`,
      'max-width': `${element.offsetWidth}px`,
    };

    console.log('calc style',this.calculatedOptions);

  }

  get optionsStyle() {

    if (this.$store.state.media === 'mobile') return {};

    return this.calculatedOptions;

  }

  mounted() {
    this.setSelected();
    this.updateSelectedText();

    window.addEventListener('scrolled', () => {
      if(this.open) this.closeOptions();
    });

    window.addEventListener('resized', () => {
      if(this.open) this.calculateOptionsStyle();
    });

  }

  setSelected() {

    if (this.value === 0) {

      this.selected = 0;

    } else if(!this.value) {

      this.selected = [];

    } else {

        this.selected = JSON.parse(JSON.stringify(this.value)) || [];

    }

  }

  updateSelectedText() {
    const textArray = [];

    if (this.multiple) {

      this.options?.forEach((value: SelectOption) => {

        if  (Array.isArray(this.selected)) {

          if (this.selected?.includes(value.value)) {
            textArray.push(Translation.translate(value.text));
          }

        } else {

          if (this.selected === value.value) textArray.push(Translation.translate(value.text));

        }

      });

      this.selectedText = textArray.join(', ');

    } else if (this.search) {

      this.selectedText = this.selected?.toString();

    } else {

      this.selectedText = Translation.translate(this.filteredOptions?.find(single => single.value === this.selected)?.text as string);
    
    }
  }

  isSelected(option: string | number) {

    if (Array.isArray(this.selected)) return this.selected.includes(option);
    if (typeof this.selected === 'string' || typeof this.selected === 'number') return this.selected === option;

  }

  clear() {
    this.selected = '';
    this.emitChanges();
  }

  toggle(option: { value: string; text: string; selected: boolean }) {

    if(this.disabled) {

      this.open = false;
      return;
    }

    if (!this.multiple) {

      if (this.selected === option.value && this.allowEmpty) {
        this.selected = '';
      } else {
        this.selected = option.value;
      }

      this.updateSelectedText();
      this.emitChanges();
      this.open = false;

    } else if (this.selected.includes(option.value)) {

      option.selected = false;
      this.remove(option.value);

    } else {

      option.selected = true;
      this.add(option.value);

    }

  }

  add(value: string) {

    if (!this.selected.includes(value)) {

      (<string[]>this.selected).push(value);
      this.emitChanges();

    }

    this.updateSelectedText();
  }

  remove(value: string) {

    const index = this.selected.indexOf(value);

    if (index > -1) {

      (<string[]>this.selected).splice(index, 1);
      this.emitChanges();

    }

    this.updateSelectedText();
  }

  emitChanges() {

    this.$emit('input', hardCopy(this.selected));
    
  }

  closeOptions() {

    this.open = false;

  }

  toggleOptions() {

    if(this.disabled) {
      this.open = false;
      return;
    }

    if (this.open) {

      this.open = false;

    } else {

      this.open = true;

    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.select-input {
  position: relative;
  display: grid;
  gap: 5px;
  min-width: 200px;

  .options-trigger {

    display: grid;
    grid-template-columns: 1fr 20px;

    width: 100%;
    border: 0;

    border-bottom: solid 1px @color1;

    background: none;
    font-size: @fontText;
    text-align: left;

    text-indent: 0;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
      padding-right: 2px;
    }
  }

  &:hover {

    .options-trigger {
      border-bottom: solid 1px @grey;
    }
  }

  &.disabled {
    pointer-events: none;

  }

  &.error {

    .options-trigger {
      border-color: @error;
    }

    .required {
      color: @error;
    }

  }

  &.filterMode {

    .options-trigger {
      border: 0;
    }
  }

  .options-trigger {
    .trans(border);
    position: relative;

    display: grid;
    width: 100%;
    height: @buttonHeight;

    border-bottom: solid 1px @color1;

    font-size: @fontText;
    line-height: @buttonHeight;

    text-align: left;

    .selected-container {
      position: relative;
      overflow: hidden;
      width: calc(100% - 15px);

      font-size: @fontTextSmaller;
      line-height: @buttonHeight;
      text-indent: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .icon-partial {
      position: absolute;
      display: grid;
      justify-self: end;
    }

    span {
      padding-right: 2px;
    }
  }

  &:hover {

    .options-trigger {
      border-color: @grey;
    }
  }

  &.options {

    .options-trigger {
      border-color: @grey;
    }
  }

  &.select-options {

    .select-options, .search-partial-editor {
      opacity: 1;
      pointer-events: all;
    }
  }

  &.search {

    .select-options {
      top: 78px;
    }
  }
}

.lila-overlay-background {

  .options-container {
    display: grid;
    align-self: center;
    justify-self: center;
    width: 100%;
    .basePadding;

    @media @tablet, @desktop {
      max-height: 30vh;
      padding: 0;
    }

    .select-options, .search-partial-editor {
      opacity: 1;
      pointer-events: all;
    }

    .no-entries {
      .multi(padding, 2);
      font-size: @fontTextSmaller;
    }

    &.inline {

      .select-options {

        @media @tablet, @desktop {
          width: 200px;
        }
      }
    }

  }

  .select-options {
    display: grid;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    max-width: 100%;

    background-color: @white;

    transition: opacity .3s ease, transform .3s ease;

    @media @tablet, @desktop {
      max-height: 30vh;
    }

    @media @tablet, @desktop {
      box-shadow: 0 0 5px -3px @textColor;
    }

    .single-option-button {
      position: relative;
      display: grid;

      grid-template-columns: 45px 1fr 20px;

      gap: 5px 0;
      width: 100%;
      border: 0;
      border-bottom: solid 1px @grey1;
      background: none;

      font-size: @fontText;
      text-align: left;
      text-overflow: ellipsis;

      white-space: normal;

      cursor: pointer;

      .multi(padding, 3, 0);

      &:last-child {
        border: 0;
      }

      &:hover {
        color: @color1;
      }

      &.disabled {
        pointer-events: none;
        background-color: @grey1;
        color: @grey;

        .box {
          background-color: @grey1;
        }
      }

      .box {
        width: 15px;
        height: 15px;
        border: solid 1px @grey;
        background-color: @white;
      }

      .box,
      .lila-icons-partial {
        display: grid;
        grid-column-start: 1;
        align-self: center;
        justify-self: center;
      }

      .text, .description {
        display: grid;
        grid-column-start: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .description {
        font-size: @fontTextSmaller;
      }

      &.selected {
        color: @color1;
      }
    }
  }
}
</style>
