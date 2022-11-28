<template>
  <section :id="id" class="gallery-module lila-module" :class="[variant, { hasDescription: textblock, hasElementDescription: elementDescription, fullscreenOverlay, fullscreenOverlayEnabled }]">
    <section class="elements">
      <div :style="cssElementsLength" ref='scrollContainer' :class="{ transition: !dragging }" v-if="elements.length > 0" class="scroll-container">
        <template v-for="(element, elementIndex) in elements">
          <div class="element" :key="`gallery-element-${elementIndex}`" :style="cssWidth" :class="{hasImage: element.picture || element.pictures, hasDescription: element.textblock}" @click="set($event, element)" @keyup="set($event, element)">
            <div class="picture-container" v-if="element && element.picture">
              <lila-picture-partial :key="`gallery-placeholder-${elementIndex}`" class="placeholder" v-bind="element.picture" />
              <lila-picture-partial :key="`gallery-picture-${elementIndex}`" @loaded="pictureLoaded" class="active picture" v-bind="element.picture" />
            </div>

            <template v-if="element.pictures">
              <template v-for="(picture, index) in element.pictures">
                <div v-if="(imageIndex === index && currentOptionIndex === elementIndex) || (currentOptionIndex !== elementIndex && index === 0)" :key="`singlePicture-${index}`" class="picture-container">
                  <lila-picture-partial :key="`gallery-placeholder-${index}`" class="placeholder" v-bind="element.pictures[0]"/>
                  <lila-picture-partial :key="`gallery-picture-${index}`" observerroot="$refs.scrollContainer" class="picture active" noLoadAnimation @loaded="pictureLoaded" v-bind="picture"/>
                </div>
              </template>
            </template>

            <div v-if="element.pictures && firstLoad" :style="indicatorsTop" class="picture-indicators">
              <span class="indicator" v-for="(picture, index) in element.pictures" :class="{ active: imageIndex === index }" :key="`picture-indicator-${index}`"></span>
            </div>

            <lila-textblock-partial v-if="element.textblock && !variant2" v-bind="element.textblock" class="picture-description"> </lila-textblock-partial>
          </div>
        </template>
      </div>
    </section>

    <div v-if="!variant2" class="indexIndicator">
      <lila-button-partial class="toggleFullscreen" v-if="fullscreenOverlayEnabled" colorScheme="transparent" :icon="true" @click="toggleFullscreenOverlay">
        <lila-icons-partial colorScheme="colorScheme1" :type="fullscreenOverlay ? 'zoom-out' : 'zoom-in'" />
      </lila-button-partial>
      <span class="currentIndex">{{ (currentOptionIndex + 1) | leadingZero(2) }}</span>
      <span class="seperator"></span>
      <span class="allIndex">{{ elements.length | leadingZero(2) }}</span>
    </div>

    <div v-if="!variant2 && firstLoad" :style="controlsTop" class="gallery-controls">
      <lila-button-partial icon :class="{ active: currentOptionIndex > 0 }" @click="change('less')">
        <lila-icons-partial colorScheme="white" type="arrow-left" />
      </lila-button-partial>

      <lila-button-partial icon :class="{ active: currentOptionIndex + 1 < elements.length }" @click="change('more')">
        <lila-icons-partial colorScheme="white" type="arrow-right" />
      </lila-button-partial>
    </div>

    <div v-if="variant2" class="container gallery-controls">
      <div class="row-container">
        <lila-button-partial class="one-left control" icon :class="{ active: currentOptionIndex > 0 }" @click="change('less')">
          <lila-icons-partial colorScheme="colorScheme1" size="small" type="arrow-left" />
        </lila-button-partial>

        <h4>{{ currentHeadline }}</h4>

        <lila-button-partial class="one-right control" icon :class="{ active: currentOptionIndex + 1 < elements.length }" @click="change('more')">
          <lila-icons-partial colorScheme="colorScheme1" size="small" type="arrow-right" />
        </lila-button-partial>
      </div>

      <div class="carousel-indicators carousel-indicators-numbers">
        <lila-button-partial class="indicator" icon v-for="(element, index) in elements" :key="`indicator-${index}`" :class="{ active: currentOptionIndex === index }" @click="indicatorchange(index)" />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { GalleryElement } from '@interfaces/galleryElement.interface';
import Textblock from '@interfaces/textblock.interface';
import {
  ExtComponent, Component, Prop, Watch,
} from '@libs/lila-component';

@Component
export default class galleryModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Array) elements: GalleryElement[];

  currentOptionIndex: number = 0;

  swipeX: number = 0;

  tempSwipe: number = 0;

  dragging: boolean = false;

  elementsWidth: number = 0;

  imageIndex: number = 0;

  /**
   * * in case of multipe pictures per slide, this disables switching through the pictures.
   * So that you are not able to switch to fast between pictures
   */
  nextImageBlocked: boolean = false;

  currentHeadline: string = '';

  controlsOffset: number = 0;

  firstLoad: boolean = false;

  fullscreenOverlay: boolean = false;

  @Watch('currentOptionIndex')
  indexChange(): void {

    this.setControlsTop();
    this.updateText();

  }

  get cssElementsLength(): { [key: string]: string | number } {

    return {
      '--n': this.elements.length,
      '--i': this.currentOptionIndex,
      '--ts': `${this.tempSwipe}px`,
    };

  }

  get cssWidth(): { [key: string]: string } {

    return {
      '--width': `${100 / this.elements.length}%`,
    };

  }

  get controlsTop(): { [key: string]: string } {

    return {
      '--top': `${this.controlsOffset / 2}px`,
    };

  }

  get indicatorsTop(): { [key: string]: string } {

    return {
      '--top': `${this.controlsOffset}px`,
    };

  }

  /** checks if any elements has a description */
  get elementDescription(): boolean {

    return !!this.elements.find((single) => single.textblock?.headline || single.textblock?.subline || single.textblock?.intro || single.textblock?.text?.length);

  }

  get variant2(): boolean {

    return this.variant.includes('variant2');

  }

  get fullscreenOverlayEnabled() {

    return !this.variant.includes('disableOverlay');

  }

  toggleFullscreenOverlay() {

    this.fullscreenOverlay = !this.fullscreenOverlay;
    this.$root.$emit('fullscreen', this.fullscreenOverlay);
    this.$nextTick()
      .then(() => {

        this.setControlsTop();

      });

  }


  pictureLoaded(): void {

    this.firstLoad = true;
    this.setControlsTop();

  }

  setControlsTop(): void {

    // if (this.fullscreenOverlay) {

    //   this.controlsOffset = window.innerHeight;

    // } else {

    const elements = this.$el?.querySelectorAll('.scroll-container .element');
    const single = elements.item(this.currentOptionIndex).querySelector('.picture-container');

    this.controlsOffset = single?.scrollHeight;

    // }


  }

  /** gets the correct event type */
  // eslint-disable-next-line class-methods-use-this
  getEvent(event: MouseEvent | TouchEvent): Touch | MouseEvent {

    if (!event) return null;

    return 'changedTouches' in event ? event.changedTouches[0] : event;

  }

  touchstart(event: TouchEvent): void {

    const unifiedEvent = this.getEvent(event);
    const target = unifiedEvent.target as HTMLElement;

    if (target.tagName === 'A') return;

    this.swipeX = unifiedEvent.clientX;
    this.dragging = true;

  }

  swipe(event: TouchEvent): void {

    const length = this.elements.length - 1;
    const swipeX = this.getEvent(event).clientX - this.swipeX;
    const unifiedEvent = this.getEvent(event);
    const target = unifiedEvent.target as HTMLElement;

    if (target.tagName === 'A') return;

    event.preventDefault();

    this.dragging = false;
    this.tempSwipe = 0;

    if (swipeX === 0) {

      this.set(event, this.elements[this.currentOptionIndex]);
      this.nextImage();

      return;

    }

    if (+((Math.sign(swipeX) * swipeX) / this.elementsWidth).toFixed(2) < 0.2) return;

    this.currentOptionIndex -= Math.sign(swipeX);

    if (this.currentOptionIndex < 0) this.currentOptionIndex = 0;
    if (this.currentOptionIndex > length) this.currentOptionIndex = length;

    this.imageIndex = 0;
    this.set(null, this.elements[this.currentOptionIndex]);
    this.$emit('change', this.elements[this.currentOptionIndex]);

  }

  change(direction: string): void {

    const length = this.elements.length - 1;
    const tempIndex = this.currentOptionIndex;

    if (direction === 'more') {

      this.currentOptionIndex += 1;

    } else {

      this.currentOptionIndex -= 1;

    }

    if (this.currentOptionIndex < 0) this.currentOptionIndex = 0;
    if (this.currentOptionIndex > length) this.currentOptionIndex = length;

    if (tempIndex !== this.currentOptionIndex) {

      this.imageIndex = 0;
      this.set(null, this.elements[this.currentOptionIndex]);

    }

  }

  nextImage(): void {

    if (this.nextImageBlocked) return;
    if (!this.elements[this.currentOptionIndex]?.pictures) return;

    this.imageIndex += 1;

    if (this.imageIndex > this.elements[this.currentOptionIndex].pictures.length - 1) {

      this.imageIndex = 0;

    }

    this.nextImageBlocked = true;

    setTimeout(() => {

      this.nextImageBlocked = false;

    }, 500);

  }

  drag(event: TouchEvent): void {

    if (!this.dragging) return;

    const unifiedEvent = this.getEvent(event);
    const target = unifiedEvent.target as HTMLElement;

    if (target.tagName === 'A') return;

    this.tempSwipe = Math.round(unifiedEvent.clientX - this.swipeX);

  }

  touchmove(event: TouchEvent): void {

    const unifiedEvent = this.getEvent(event);
    const target = unifiedEvent.target as HTMLElement;

    if (target.tagName === 'A') return;

    event.preventDefault();

  }

  mounted(): void {

    this.gallery();
    this.updateText();
    this.setControlsTop();

  }

  gallery(): void {

    const scollContainer = this.$el.querySelector('.scroll-container');

    window.addEventListener('resized', () => {

      this.elementsWidth = this.$el.querySelector('.elements').getBoundingClientRect().width;

      this.setControlsTop();

    });

    this.elementsWidth = this.$el.querySelector('.elements').getBoundingClientRect().width;

    this.DOM.onElement('touchstart mousedown', scollContainer, this.touchstart);
    this.DOM.onElement('touchend mouseup', scollContainer, this.swipe);
    this.DOM.onElement('touchmove mousemove', scollContainer, this.drag);

    this.DOM.onElement('touchmove', this.$el, this.touchmove);

  }

  set(event: TouchEvent | MouseEvent, option: GalleryElement): void {

    const unifiedEvent = this.getEvent(event);
    const target = unifiedEvent?.target as HTMLElement;

    if (!unifiedEvent) return;
    if (target.tagName === 'A') return;

    if (event) event.preventDefault();

    this.$emit('change', option);

  }

  /** updates the current headline for variant2 */
  updateText(): void {

    this.currentHeadline = this.elements[this.currentOptionIndex].textblock?.headline;

  }

  indicatorchange(index: number): void {

    this.currentOptionIndex = index;

  }

}
</script>
<style lang="less" scoped>
@import (reference) '@{projectPath}/source/less/shared.less';

.lila-module.gallery-module {
  .module;

  @import '../source/less/gallery/element.less';

  @import '../source/less/gallery/control-button.less';

  @import '../source/less/gallery/picture-description.less';

  @import '../source/less/gallery/indexIndicator.less';

  @import '../source/less/gallery/controls.less';

  @import '../source/less/gallery/elements.less';

  .modulePadding('none');

  position: relative;
  display: grid;

  grid-template-rows: max-content 25px;
  grid-template-columns: 100%;

  gap: 20px 0;
  justify-self: center;

  overflow: hidden;

  width: 100%;

  max-width: @moduleWidth_M;

  cursor: grabbing;
  -moz-user-select: none;

  user-select: none;

  transition: transform .75s ease, opacity .5s ease;
  transition-delay: .3s;

  @media @desktop {
    grid-template-columns: auto 125px;

  }

  &.fullscreen {
    max-width: @moduleWidth_Full;
  }

  .picture-container {
    position: relative;
  }

  &.variant2 {
    grid-template-rows: max-content max-content;

    @media @desktop {
      grid-template-columns: auto;
      gap: 20px;

      &.hasElementDescription {
        background-color: transparent;
      }
    }
  }

  &.hasElementDescription {
    grid-template-rows: max-content 90px 20px;

    @media @desktop {
      grid-template-rows: max-content 90px;
      gap: 0;
      background-color: @white;
    }
  }

  .picture-indicators {

    position: absolute;

    top: var(--top);
    left: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-150%);

    .indicator {

      display: inline-block;

      width: 10px;
      height: 10px;

      border: solid 1px @white;
      .multi(margin, 1);

      &.active {
        background-color: @white;
      }
    }
  }

  &.fullscreenOverlayEnabled {
    grid-template-columns: auto 185px;

    .indexIndicator {
      grid-template-rows: 20px;
      grid-template-columns: 35px 25px 3px 25px;

      .currentIndex {
        justify-self: end;
      }

      .toggleFullscreen {
        margin-top: -6.5px;
      }

      span {
        display: grid;
      }
    }

  }

  &.fullscreenOverlay.fullscreenOverlayEnabled {

    .index(9);

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;

    background-color: @white;

    &:first-child {
      margin: 0;
    }

    .placeholder {
      display: none;
    }

    .elements {

      .element {
        grid-template-rows: 1fr;

        height: 100%;

        &.hasDescription {
          grid-template-rows: 1fr 90px;
        }

        .picture-container {
          overflow: hidden;

          .lila-figure::v-deep {
            grid-template-rows: 100%;
            overflow: visible;
            min-height: auto;
            max-height: 100%;

            &.picture {
              position: relative;

              img {
                position: relative;
                top: unset;
                left: unset;
                align-self: center;
                justify-self: center;
                min-width: auto;
                max-width: 100%;
                min-height: auto;
                max-height: 100%;
                transform: none;
              }
            }
          }
        }

      }
    }

    grid-template-rows: calc(100% - 90px) 90px;

    .scroll-container {
      height: calc(100% - 40px);

      @media @desktop {
        height: 100%;
      }
    }

  }
}
</style>
