<script setup lang="ts">
import type { GalleryElement } from '@interfaces/galleryElement.interface';
import type Textblock from '@interfaces/textblock.interface';
import dom from '@/functions/lila-dom';

import { ref, watch, type Ref, nextTick, computed, onMounted } from 'vue';

const props = defineProps<{
  textblock?: Textblock;
  elements: GalleryElement[];
  variant?: string[];
  id?: string;
}>();
const currentOptionIndex: Ref<number> = ref(0);
const swipeX = ref<number>(0);
const tempSwipe = ref<number>(0);
const dragging = ref<boolean>(false);
const elementsWidth = ref<number>(0);
const imageIndex = ref<number>(0);
const currentHeadline = ref<string>('');
const controlsOffset = ref<number>(0);
/**
 * defines how far the image needs to be swiped to change
 * higher means more distant needs to be swiped
 */
const swipeThreshold = ref<number>(0.2);
const firstLoad = ref<boolean>(false);
const fullscreenOverlay = ref<boolean>(false);
const emit = defineEmits<{ (e: string, element: any): void }>();
const mainElement = ref<HTMLElement>();
const elementsContainer = ref<HTMLElement>();
const scrollContainer = ref<HTMLElement>();

watch(currentOptionIndex, indexChange);

function indexChange (): void {
  setControlsTop();
  updateText();
}

const cssElementsLength = computed((): { [key: string]: string | number } => {
  return {
    '--n' : props.elements.length,
    '--i' : currentOptionIndex.value,
    '--ts': `${tempSwipe.value}px`,
  };
});
const cssWidth = computed((): { [key: string]: string } => {
  return {
    '--width': `${100 / props.elements.length}%`,
  };
});
const controlsTop = computed((): { [key: string]: string } => {
  return {
    '--top': `${controlsOffset.value / 2}px`,
  };
});
const indicatorsTop = computed((): { [key: string]: string } => {
  return {
    '--top': `${controlsOffset.value}px`,
  };
});
/** checks if any elements has a description */
const elementDescription = computed((): boolean => {
  return !!props.elements.find((single: any) => single.textblock?.headline || single.textblock?.subline || single.textblock?.intro || single.textblock?.text?.length);
});
const variant2 = computed((): boolean => {
  return props.variant?.includes('variant2');
});
const fullscreenOverlayEnabled = computed(() => {
  return !props.variant?.includes('disableOverlay');
});

function toggleFullscreenOverlay () {
  fullscreenOverlay.value = !fullscreenOverlay.value;
  emit('fullscreen', fullscreenOverlay); //  was this.$root.$emit
  nextTick().then(() => {
    setControlsTop();
  });
}

function pictureLoaded (): void {
  firstLoad.value = true;
  setControlsTop();
}

function setControlsTop (this: any): void {
  const elements = scrollContainer.value?.querySelectorAll('.element');
  const single = elements?.item(currentOptionIndex.value).querySelector('.picture-container');

  if (single?.scrollHeight) controlsOffset.value = single?.scrollHeight;
}

/** gets the correct event type */
function getEvent (event: MouseEvent | TouchEvent): Touch | MouseEvent {
  return 'changedTouches' in event ? event.changedTouches[0] : event;
}

function touchstart (event: TouchEvent): void {
  const unifiedEvent = getEvent(event);
  const target = unifiedEvent.target as HTMLElement;

  if (target.tagName === 'A') return;

  swipeX.value = unifiedEvent.clientX;
  dragging.value = true;
}

function swipe (event: TouchEvent): void {
  const length = props.elements.length - 1;
  // Calculate the horizontal distance of the swipe
  const currentSwipeX = getEvent(event).clientX - swipeX.value;
  // Get the unified touch or mouse event
  const unifiedEvent = getEvent(event);
  const target = unifiedEvent.target as HTMLElement;

  // If the target is a link ('A' tag), exit the function to allow normal link behavior
  if (target.tagName === 'A') return;
  event.preventDefault();

  // Set dragging flag to false indicating the swipe action is complete
  dragging.value = false;

  // Reset temporary swipe distance value
  tempSwipe.value = 0;

  // If the swipe distance is less than 20% of the element's width, don't change the image
  if ((Math.sign(currentSwipeX) * currentSwipeX) / elementsWidth.value < swipeThreshold.value) return;

  // Update the index of the current image based on the swipe direction
  currentOptionIndex.value -= Math.sign(currentSwipeX);

  // Ensure the current index is not less than 0 or more than the total number of elements
  if (currentOptionIndex.value < 0) currentOptionIndex.value = 0;
  if (currentOptionIndex.value > length) currentOptionIndex.value = length;

  emit('change', props.elements[currentOptionIndex.value]);
}

function change (direction: string): void {
  const length = props.elements.length - 1;

  if (direction === 'more') {
    currentOptionIndex.value += 1;
  } else {
    currentOptionIndex.value -= 1;
  }

  if (currentOptionIndex.value < 0) currentOptionIndex.value = 0;
  if (currentOptionIndex.value > length) currentOptionIndex.value = length;

  emit('change', props.elements[currentOptionIndex.value]);
}

function drag (event: TouchEvent): void {
  if (!dragging.value) return;

  const unifiedEvent = getEvent(event);
  const target = unifiedEvent.target as HTMLElement;

  if (target.tagName === 'A') return;

  tempSwipe.value = Math.round(unifiedEvent.clientX - swipeX.value);
}

// function touchmove (event: TouchEvent): void {

//   const unifiedEvent = getEvent(event);
//   const target = unifiedEvent.target as HTMLElement;

//   if (target.tagName === 'A') return;

//   event.preventDefault();

// }

onMounted(() => {
  init();
  updateText();
  setControlsTop();
});

function init (): void {
  window.addEventListener('resized', () => {
    elementsWidth.value = elementsContainer.value?.getBoundingClientRect().width || 0;

    setControlsTop();
  });

  elementsWidth.value = elementsContainer.value?.getBoundingClientRect().width || 0;

  if (mainElement.value) {
    dom.onElement('touchstart mousedown', mainElement.value, touchstart as EventListener);
    dom.onElement('touchend mouseup', mainElement.value, swipe as EventListener);
    dom.onElement('touchmove mousemove', mainElement.value, drag as EventListener);
  }

  // if(mainElement.value) dom.onElement('touchmove', mainElement.value, touchmove as EventListener);
}

/** updates the current headline for variant2 */
function updateText (): void {
  currentHeadline.value = props.elements[currentOptionIndex.value].textblock?.headline || '';
}

function indicatorchange (index: number): void {
  currentOptionIndex.value = index;
}
</script>
<template>
  <section :id="id" ref="mainElement" class="gallery-module lila-module" :class="[variant, { hasDescription: textblock, hasElementDescription: elementDescription, fullscreenOverlay, fullscreenOverlayEnabled }]">
    <section ref="contentContainer" class="content-container">
      <section ref="elementsContainer" class="elements">
        <div ref="scrollContainer" :style="cssElementsLength" :class="{ transition: !dragging }" v-if="elements.length > 0" class="scroll-container">
          <template v-for="(element, elementIndex) in elements" :key="`gallery-element-${elementIndex}`">
            <div class="element" :style="cssWidth" :class="{ hasImage: element.picture || element.pictures, hasDescription: element.textblock }">
              <div class="picture-container" v-if="element && element.picture">
                <lila-picture-partial :key="`gallery-placeholder-${elementIndex}`" class="placeholder" v-bind="element.picture" />
                <lila-picture-partial :key="`gallery-picture-${elementIndex}`" @loaded="pictureLoaded" class="active picture" v-bind="element.picture" />
              </div>

              <template v-if="element.pictures">
                <template v-for="(picture, index) in element.pictures">
                  <div v-if="(imageIndex === index && currentOptionIndex === elementIndex) || (currentOptionIndex !== elementIndex && index === 0)" :key="`singlePicture-${index}`" class="picture-container">
                    <lila-picture-partial :key="`gallery-placeholder-${index}`" class="placeholder" v-bind="element.pictures[0]" />
                    <lila-picture-partial :key="`gallery-picture-${index}`" observerroot="$refs.scrollContainer" class="picture active" noLoadAnimation @loaded="pictureLoaded" v-bind="picture" />
                  </div>
                </template>
              </template>

              <div v-if="element.pictures && firstLoad" :style="indicatorsTop" class="picture-indicators">
                <span class="indicator" v-for="(picture, index) in element.pictures" :class="{ active: imageIndex === index }" :key="`picture-indicator-${index}`"></span>
              </div>
              <lila-textblock-partial v-if="element.textblock && !variant2" v-bind="element.textblock" class="picture-description" />
            </div>
          </template>
        </div>
      </section>

      <div v-if="!variant2" class="indexIndicator">
        <lila-button-partial class="toggleFullscreen" v-if="fullscreenOverlayEnabled" colorScheme="transparent" :icon="true" @click="toggleFullscreenOverlay">
          <lila-icons-partial colorScheme="colorScheme1" :type="fullscreenOverlay ? 'zoom-out' : 'zoom-in'" />
        </lila-button-partial>
        <span class="currentIndex">{{ $helpers.leadingZero(currentOptionIndex + 1, 2) }}</span>
        <span class="seperator"></span>
        <span class="allIndex">{{ $helpers.leadingZero(elements.length, 2) }}</span>
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
  </section>
</template>
<style lang="less" scoped>
.lila-module.gallery-module {
  .module;

  .modulePadding('none');

  position: relative;
  display: grid;

  grid-template-rows: max-content 25px;
  grid-template-columns: 100%;

  gap: 20px 0;
  justify-content: center;
  justify-items: center;

  overflow: hidden;

  width: 100%;

  cursor: grabbing;
  -moz-user-select: none;

  user-select: none;

  transition:
    transform 0.75s ease,
    opacity 0.5s ease;
  transition-delay: 0.3s;

  // @media @desktop {
  //   grid-template-columns: auto 125px;
  // }

  .content-container {
    display: grid;
    overflow: hidden;
    max-width: @moduleWidth_M;
  }

  // &.hasElementDescription {

  //   .elements {

  //     .element {
  //       grid-template-rows: max-content max-content;
  //       background-color: @white;

  //       @media @desktop {
  //         grid-template-rows: max-content 90px;
  //         grid-column-end: 2;
  //       }

  //       .lila-textblock::v-deep {
  //         grid-column-start: 1;
  //         grid-column-end: 3;

  //         .multi(padding, 4, 8);

  //         @media @desktop {
  //           grid-column-end: 2;
  //         }
  //       }
  //     }
  //   }
  //   &.variant2 {

  //     .elements {

  //       .element {
  //         grid-template-rows: max-content;
  //         background-color: transparent;
  //       }
  //     }

  //   }
  // }

  // &.disableOverlay {

  //   .elements {

  //     .element {

  //       @media @desktop {
  //         grid-template-columns: auto 185px;
  //       }
  //     }
  //   }

  // }

  .elements {

    display: grid;
    .element {
      .picture-description::v-deep {
        h3 {
          color: @textColor;
        }
      }

      .multi(padding, 0);
      .multi(margin, 0);
      position: relative;

      display: grid;

      grid-template-rows: max-content;
      grid-template-columns: auto 95px;

      gap: 0 10px;

      float: left;
      width: var(--width);

      opacity: 1;

      pointer-events: none;

      @media @desktop {
        grid-template-rows: max-content;
        grid-template-columns: auto 185px;
      }

      &.selected {
        picture {
          .trans(opacity);
        }
      }

      .picture-container {
        grid-column-start: 1;
        grid-column-end: 3;
      }

      // .lila-textblock::v-deep {
      //   grid-row-start: 2;
      //   .multi(padding, 4, 0, 4, 4);
      // }

      .lila-figure::v-deep {
        overflow: hidden;
        min-height: 100px;

        max-height: 50vh;
        margin: 0;
        padding: 0;

        opacity: 0;

        &.picture {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 0;
            overflow: hidden;
            width: auto;
            min-width: 100%;
            height: auto;
            min-height: 100%;
            max-height: none;
            transform: translateX(-50%) translateY(-50%);
          }
        }

        &.placeholder {
          visibility: hidden;
        }

        &.active {
          opacity: 1;
        }
      }
    }
  }

  // &.fullscreen {

  //   max-height: var(--realHeight);

  //   .elements {

  //     .element {

  //       .lila-figure::v-deep {
  //         max-height: 100%;
  //       }
  //     }
  //   }

  // }

  // &.variant2 {

  //   .gallery-controls {

  //     button {

  //       .trans(background);

  //       display: grid;

  //       align-self: center;

  //       width: 35px;
  //       height: 35px;
  //       pointer-events: inherit;

  //       &.control {
  //         background-color: transparent;

  //         .icon::v-deep {

  //           svg {
  //             fill: @color1;
  //           }
  //         }

  //         &:hover {
  //           background-color: transparent;

  //           .icon {

  //             svg {
  //               fill: @color3;
  //             }
  //           }
  //         }
  //       }

  //       .icon {
  //         width: 35px;
  //         height: 35px;
  //       }

  //       &.active {
  //         opacity: 1;
  //       }

  //       &:hover {
  //         background-color: @color3;
  //       }

  //       &:last-child {
  //         justify-self: end;
  //       }
  //     }

  //   }

  // }

  .gallery-controls {
    max-width: @moduleWidth_M;

    .lila-button {
      .trans(background);

      display: grid;

      width: 35px;
      height: 35px;

      background-color: @color1;
      opacity: 0.5;

      .lila-icons-partial::v-deep {
        justify-self: center;
      }

      &.active {
        opacity: 1;
      }

      &:hover {
        background-color: @color3;
      }

      &:last-child {
        justify-self: end;
      }
    }
  }

  &.variant2 {
    .indexIndicator {
      display: none;
    }
  }

  &.hasElementDescription {
    .indexIndicator {
      .multi(padding, 0, 8);

      grid-row-start: 3;

      @media @desktop {
        position: absolute;
        grid-row-start: 2;
        background-color: @white;
        .multi(padding, 4, 7);
      }
    }
  }

  &.hasElementDescription {
    .indexIndicator {
      .multi(padding, 0, 8);

      grid-row-start: 3;

      @media @desktop {
        position: absolute;
        grid-row-start: 2;
        background-color: @white;
        .multi(padding, 4, 7);
      }
    }
  }

  &.fullscreenOverlay.fullscreenOverlayEnabled {
    .indexIndicator {
      .multi(padding, 4, 8);

      //     // position: absolute;
      //     grid-row-start: 2;
      //     grid-column-start: 2;
      //     // background-color: @white;
      //     .multi(padding, 4, 7);
    }
  }

  .indexIndicator {
    .font-normal;

    .multi(padding, 0, 8);

    position: absolute;

    display: grid;
    grid-template-rows: min-content;

    grid-template-columns: min-content auto min-content;
    grid-row-start: 2;

    grid-column-start: 1;

    gap: 10px;

    align-self: end;

    justify-content: end;
    justify-self: end;

    width: 100%;

    @media @desktop {
      grid-column-start: 2;

      height: 100%;
      // grid-row-start: 2;

      // .multi(padding, 0, 7);
    }

    span {
      display: inline-block;
      font-size: @fontText;

      &.seperator {
        width: 2px;
        height: 100%;
        background-color: @grey;
      }
    }
  }

  .gallery-controls {
    position: absolute;

    top: var(--top);

    display: grid;
    grid-template-columns: 50% 50%;

    width: 100%;
    transform: translateY(-50%);
    // height: 40px;
  }

  // &.variant2 {
  //   .gallery-controls {
  //     position: relative;
  //     grid-template-rows: minmax(55px, min-content) min-content;
  //     grid-template-columns: auto;

  //     grid-row-start: 2;
  //     grid-row-end: 2;

  //     gap: 10px;

  //     width: 100%;

  //     height: auto;

  //     transform: translateY(0);

  //     @media @desktop {
  //       grid-column-start: 1;
  //       grid-column-end: 3;
  //     }

  //     .row-container {
  //       display: grid;
  //       grid-template-columns: min-content minmax(50px, max-content) min-content;
  //       gap: 10px;

  //       justify-content: center;

  //       text-align: center;

  //       h4 {
  //         align-self: center;
  //         justify-self: center;
  //       }
  //     }

  //     .carousel-indicators {
  //       display: flex;
  //       flex-direction: row-reverse;
  //       flex-wrap: wrap;
  //       grid-row-start: 2;
  //       gap: 10px;

  //       align-self: center;

  //       justify-content: end;
  //       justify-self: center;

  //       &.gap {
  //         gap: 20px;
  //       }

  //       button {
  //         width: 10px;
  //         height: 10px;
  //         border-radius: 100%;
  //       }
  //     }
  //   }
  // }

  &.hasElementDescription {
    .elements {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }

  // &.variant2 {
  //   &.hasElementDescription {
  //     .elements {
  //       grid-row-end: 2;
  //     }
  //   }
  // }

  .elements {
    position: relative;
    grid-column-start: 1;
    grid-column-end: 3;

    .scroll-container {
      --n: 1;
      width: 100%;
      width: calc(var(--n) * 100%);

      transform: translate(calc(var(--i, 0) / var(--n) * -100% + var(--ts, 0px)));

      &.transition {
        .trans(transform);
      }

      .clearfix;
    }
  }

  &.fullscreen {
    max-width: @moduleWidth_Full;
  }

  .picture-container {
    position: relative;
  }

  // &.variant2 {
  //   grid-template-rows: max-content max-content;

  //   @media @desktop {
  //     grid-template-columns: auto;
  //     gap: 20px;

  //     &.hasElementDescription {
  //       background-color: transparent;
  //     }
  //   }
  // }

  &.hasElementDescription {
    grid-template-rows: max-content 90px 20px;

    @media @desktop {
      grid-template-rows: max-content 90px;
      gap: 0;
      background-color: @white;
    }
  }

  // .picture-indicators {

  //   position: absolute;

  //   top: var(--top);
  //   left: 0;
  //   width: 100%;
  //   text-align: center;
  //   transform: translateY(-150%);

  //   .indicator {

  //     display: inline-block;

  //     width: 10px;
  //     height: 10px;

  //     border: solid 1px @white;
  //     .multi(margin, 1);

  //     &.active {
  //       background-color: @white;
  //     }
  //   }
  // }

  // &.fullscreenOverlayEnabled {
  //   grid-template-columns: auto 185px;

  //   .indexIndicator {
  //     grid-template-rows: 20px;
  //     grid-template-columns: 35px 25px 3px 25px;

  //     .currentIndex {
  //       justify-self: end;
  //     }

  //     .toggleFullscreen {
  //       margin-top: -6.5px;
  //     }

  //     span {
  //       display: grid;
  //     }
  //   }

  // }

  // &.fullscreenOverlay.fullscreenOverlayEnabled {

  //   .index(9);

  //   position: fixed;
  //   top: 0;
  //   left: 0;

  //   display: grid;
  //   align-content: center;
  //   justify-content: center;
  //   overflow: hidden;
  //   width: 100vw;
  //   max-width: 100vw;
  //   height: 100vh;
  //   max-height: 100vh;

  //   background-color: @white;

  //   &:first-child {
  //     margin: 0;
  //   }

  //   .placeholder {
  //     display: none;
  //   }

  //   .elements {

  //     .element {
  //       grid-template-rows: 1fr;

  //       height: 100%;

  //       &.hasDescription {
  //         grid-template-rows: 1fr 90px;
  //       }

  //       .picture-container {
  //         overflow: hidden;

  //         .lila-figure::v-deep {
  //           grid-template-rows: 100%;
  //           overflow: visible;
  //           min-height: auto;
  //           max-height: 100%;

  //           &.picture {
  //             position: relative;

  //             img {
  //               position: relative;
  //               top: unset;
  //               left: unset;
  //               align-self: center;
  //               justify-self: center;
  //               min-width: auto;
  //               max-width: 100%;
  //               min-height: auto;
  //               max-height: 100%;
  //               transform: none;
  //             }
  //           }
  //         }
  //       }

  //     }
  //   }

  //   grid-template-rows: calc(100% - 90px) 90px;

  //   .scroll-container {
  //     height: calc(100% - 40px);

  //     @media @desktop {
  //       height: 100%;
  //     }
  //   }

  // }
}
</style>
