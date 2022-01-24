<template>
  <section :class="[view, variant]" class="module training-module fullscreen">
    <section v-if="textblock" class="module generic-module">
      <textblock-partial v-bind="textblock" />
    </section>

    <article class="main-grid-container">
      <section :class="{ open: headIndexOpen }" class="current-content-container" ref="currentContentContainer" v-if="currentContent">
        <section class="content-head">
          <div class="grid-container">
            <button-partial class="base transparent titleButton" @click="toggleIndex">{{ currentContent.settings.title }}</button-partial>
            <div class="current-indicator">{{ currentIndex + 1 }} von {{ contentCount }}</div>
          </div>

          <div :class="{ open: headIndexOpen }" class="headIndex">
            <ul>
              <li v-for="(teaser, index) in indexTeaser" :key="`teaser-head-index-${index}`">
                <button-partial :class="{ active: index === currentIndex }" class="base transparent titleButton" @click="setIndex(index)">{{ teaser.settings.title }}</button-partial>
              </li>
            </ul>
          </div>
        </section>

        <content-module ref="currentContent" class="currentContent" :key="currentContent.id" :data="currentContent"></content-module>
      </section>
      <section class="current-content-container" v-if="!currentContent">
        <section class="content-module"></section>
      </section>

      <section class="index-container">
        <div class="index-element" :class="{ active: index === currentIndex }" v-for="(teaser, index) in indexTeaser" :key="`teaser-index-${index}`">
          <div class="index-indicator">{{ index + 1 }}.</div>

          <button @click="setIndex(index)">
            <h2>{{ teaser.settings.title }}</h2>
            <p>{{ teaser.settings.description }}</p>
          </button>
        </div>
      </section>
    </article>
  </section>
</template>
<script lang="ts">
import Textblock from '@interfaces/textblock.interface';
import ChildData from '@interfaces/ChildData.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';
import { filterMergeModules } from '@lila2/studio/lib/src/frontend/main';
import { Editor } from '@lila2/studio/lib/interfaces';

@Component
export default class TrainingModule extends ExtComponent {

  $refs: {
    currentContent: HTMLElement;
  };

  @Prop(Object) textblock: Textblock;

  @Prop(Object) childData: ChildData;

  currentIndex: number = 0;

  headIndexOpen: boolean = false;

  created() {

    if (!this.$store.state.data.childData) return;

    const newData = {};

    console.log(this.childData, this.$store.state);

    if (this.childData) {

      this.childData.index?.forEach((single) => {

        newData[single] = this.$store.state.data.childData.data[single];

      });

      this.childData.data = newData;

    }

  }

  mounted(): void {

    this.checkInview();

  }

  get indexTeaser() {

    if (!this.childData.data) return [];

    const mapped = this.childData?.index.map((index) => {

      const singleData: Partial<Editor> = this.childData?.data[index] ?? {};

      if (!singleData.settings) {

        singleData.settings = {
          title: 'No Title',
          description: '',
        };

      }

      return singleData;

    });

    return mapped.filter((single) => single) ?? [];

  }

  get contentCount() {

    return this.childData?.index.length;

  }

  get currentContent() {

    if (!this.childData.data) return null;

    const currentContent = this.childData.data[this.childData.index[this.currentIndex]] ?? null;

    if (!currentContent) return null;

    return {
      id: currentContent.id,
      settings: currentContent.settings,
      top: filterMergeModules(currentContent.modules, 'top'),
      content: filterMergeModules(currentContent.modules, 'content'),
      bottom: filterMergeModules(currentContent.modules, 'bottom'),
    };

  }

  setIndex(index: number) {

    this.currentIndex = index;
    this.toggleIndex(null, false);

  }

  toggleIndex(event: MouseEvent, hint?: boolean) {

    if (hint !== undefined) {

      this.headIndexOpen = hint;

    } else {

      this.headIndexOpen = !this.headIndexOpen;

    }

  }

}
</script>
<style lang="less" scoped>
@import (reference) '@{projectPath}/source/less/shared.less';

.module.training-module {
  .module;
  .modulePadding('none');
  gap: 40px;

  @media @desktop {
    .modulePadding();
  }

  &.offsetTop {
    .main-grid-container {
      .current-content-container {
        .content-head {
          top: 40px;
        }
      }

      .index-container {
        top: 80px;
      }
    }
  }

  .main-grid-container {
    display: grid;
    justify-self: center;
    width: 100%;

    gap: 40px;

    @media @desktop {
      grid-template-columns: 300px 1fr;
      grid-template-rows: 1fr;

      align-items: start;
      justify-items: start;

      max-width: @desktopWidthExt;
    }

    .index-container {
      .modulePadding();

      display: grid;
      gap: 20px;

      justify-content: start;
      grid-template-columns: 1fr;

      display: none;

      @media @desktop {
        display: grid;
        grid-column-start: 1;
        grid-row-start: 1;
        width: 100%;

        position: sticky;
        top: 40px;
        .multi(padding, 0);
      }

      .index-element {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 15px;

        background-color: @grey1;

        .multi(padding, 4);

        justify-content: start;
        align-content: start;

        .index-indicator {
          .font-head;
          font-size: @headline_XS;
          height: @headlineLineHeight_XS;

          padding-top: 4px;

          color: @grey;

          justify-self: start;

          .trans(color);
        }

        button {
              background: transparent;

    border: none;
    cursor: pointer;

    outline: none;

    -webkit-tap-highlight-color: transparent;

    white-space: nowrap;
          color: @grey;

          display: grid;
          justify-content: start;

          text-align: left;

          white-space: pre-wrap;

          h2 {
            font-size: @headline_XS;
            color: @grey;
            .trans(color);
            text-transform: uppercase;
          }

          p {
            .trans(color);
          }

          .trans(color);
        }

        &:hover,
        &.active {
          color: @textColor;
          background-color: @grey2;

          p {
            color: @textColor;
          }

          h2 {
            color: @color1;
          }

          .index-indicator {
            color: @color1;
          }
        }
      }
    }

    .current-content-container::v-deep {

      min-width: 100%;

      @media @desktop {
        grid-column-start: 2;
      }

      .content-module {
        position: relative;
        display: grid;

        .container .module:first-child {
          .multi(margin-top, 8);
        }
      }

      .content-head {
        height: @buttonHeight;
        line-height: @buttonHeight;
        display: grid;
        position: sticky;
        top: 0;

        .grid-container {
          grid-template-columns: 1fr max-content;
          display: grid;
          width: 100%;
          max-width: @desktopWidthExt;
          justify-self: center;
          .modulePadding();
        }

        background-color: @grey2;
        .index(5);

        .current-indicator {
          font-size: @fontTextSmaller;
        }

        .titleButton {
          text-align: left;
          width: 100%;

          .font-bold;

          &.active {
            color: @color1;
          }
        }

        .headIndex {
          transition: opacity @aTime @aType, transform @aTime @aType;
          background-color: @white;
          box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.13);

          opacity: 0;
          pointer-events: 0;
          transform: translateY(-5px);

          &.open {
            opacity: 1;
            transform: translateY(0);
          }

          .index(5);

          ul {
            li {
              border-bottom: solid 1px @grey2;
              .modulePadding();
              .trans(background);

              &:hover {
                background-color: @grey2;
              }
            }
          }
        }

        @media @desktop {
          display: none;
        }
      }
    }
  }
}
</style>
