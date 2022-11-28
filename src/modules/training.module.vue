<template>
  <section :id="id" :class="[view, variant, {mobileIndex: forceMobileIndex}]" class="lila-training-module lila-module fullscreen">
    <section v-if="textblock" class="module generic-module">
      <lila-textblock-partial v-bind="textblock" />
    </section>

    <article ref="mainGridContainer" class="main-grid-container">
      <section :class="{ open: headIndexOpen }" class="current-content-container" ref="currentContentContainer" v-if="currentContent">
        <section class="content-head">
          <div class="grid-container">
            <lila-button-partial class="base transparent titleButton" @click="toggleIndex">{{ currentContent.settings.title }}</lila-button-partial>
            <div class="current-indicator">{{ currentIndex + 1 }} von {{ contentCount }}</div>
          </div>

          <div :class="{ open: headIndexOpen }" class="headIndex">
            <ul>
              <li v-for="(teaser, index) in indexTeaser" :key="`teaser-head-index-${index}`">
                <lila-button-partial :class="{ active: index === currentIndex }" class="base transparent titleButton" @click="setIndex(index)">{{ teaser.settings.title }}</lila-button-partial>
              </li>
            </ul>
          </div>
        </section>
        <lila-content-module ref="currentContent" class="currentContent" :key="currentContent.id" :routeBase="linkBase" :linkEvents="linkMode === 'event' ? true : false" :content="currentContent" />
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
import { ExtComponent, Component, Prop } from '@libs/lila-component';
import { ChildData, Editor } from '@lilaquadrat/studio/lib/interfaces';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import { InjectReactive } from 'vue-property-decorator';

@Component
export default class TrainingModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) childData: ChildData;

  @InjectReactive('linkBase') private linkBase!: string;

  @InjectReactive('linkMode') private linkMode?: string;

  $refs: {
    currentContent: HTMLElement;
    mainGridContainer: HTMLElement;
  };

  currentIndex: number = 0;

  headIndexOpen: boolean = false;

  forceMobileIndex: boolean = false;

  mounted(): void {

    this.checkInview();
    this.checkRealWidth();

    window.addEventListener('resized', () => {

      this.checkRealWidth();

    });

  }

  checkRealWidth() {

    const element = this.$refs.mainGridContainer;

    this.forceMobileIndex = element.clientWidth < 700;

  }

  get indexTeaser() {

    if (!this.childData?.data) return [];

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

    if (!this.childData?.data) return null;

    const currentContent = this.childData.data[this.childData.index[this.currentIndex]] ?? null;

    if (!currentContent) return null;

    return prepareContent(currentContent);

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

.lila-training-module {
  .module;
  .modulePadding('none');
  gap: 40px;

  @media @desktop {
    .modulePadding();
  }

  .main-grid-container {
    display: grid;

    gap: 40px;
    justify-self: center;
    width: 100%;

    @media @desktop {
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 3fr;

      align-items: start;
      justify-items: start;

      max-width: @desktopWidthExt;
    }

    .index-container {
      .modulePadding();

      display: none;
      grid-template-columns: 1fr;
      gap: 20px;

      justify-content: start;

      @media @desktop {

        position: sticky;
        top: 40px;
        display: grid;
        grid-row-start: 1;
        grid-column-start: 1;
        width: 100%;
        .multi(padding, 0);
      }

      .index-element {
        display: grid;
        gap: 15px;
        align-content: start;

        justify-content: start;

        background-color: @grey1;

        .multi(padding, 4);

        .index-indicator {
          display: none;
        }

        button {

          display: grid;
          justify-content: start;

          border: none;
          background: transparent;
          color: @grey;

          outline: none;

          text-align: left;

          white-space: nowrap;

          white-space: pre-wrap;
          cursor: pointer;

          -webkit-tap-highlight-color: transparent;

          h2 {
            color: @grey;
            font-size: @headline_XS;
            text-transform: uppercase;
            .trans(color);
          }

          p {
            .trans(color);
          }

          .trans(color);
        }

        &:hover,
        &.active {
          background-color: @grey2;
          color: @textColor;

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

    .current-content-container {

      min-width: 100%;

      @media @desktop {
        grid-column-start: 2;
      }

      .lila-content-module::v-deep {
        position: relative;
        display: grid;

        .container .lila-module:first-child {
          .multi(margin-top, 8);
        }
      }

      .content-head {
        .index(5);
        position: sticky;
        top: 0;
        display: grid;
        height: @buttonHeight;

        background-color: @grey2;
        line-height: @buttonHeight;

        @media @desktop {
          display: none;
        }

        .grid-container {
          display: grid;
          grid-template-columns: 1fr max-content;
          justify-self: center;
          width: 100%;
          max-width: @desktopWidthExt;
          .modulePadding();
        }

        .current-indicator {
          font-size: @fontTextSmaller;
        }

        .titleButton {
          justify-content: start;
          width: 100%;
          text-align: left;
          white-space: normal;

          .font-bold;

          &.active {
            color: @color1;
          }
        }

        .headIndex {
          background-color: @white;
          box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .13);

          opacity: 0;
          pointer-events: none;
          transition: opacity @aTime @aType, transform @aTime @aType;
          transform: translateY(-5px);

          &.open {
            opacity: 1;
            pointer-events: all;
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
      }
    }
  }

  &.mobileIndex {

    .modulePadding('none');

    .main-grid-container {

      grid-template-columns: 1fr;

      .index-container {
        display: none;
      }

      .current-content-container {
        grid-column-start: 1;
        .content-head {

          display: grid;

        }
      }
    }

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

    &.indexVariant {

      .main-grid-container {

        .index-container {
          top: 60px;
        }
      }
    }
  }

  &.indexVariant {

    .main-grid-container {

      @media @desktop {
        grid-template-columns: 230px 1fr;
      }

      .index-container {
        top: 20px;
        gap: 15px;
        .multi(padding, 4, 0);

        .index-element {
          gap: 15px;
          background-color: transparent;
          .multi(padding, 0, 4);

          button {

            h2 {
              .font-normal;
              height: initial;
              color: @textColor;
              font-size: @headline_XS;
              line-height: @headlineLineHeight_XS;
              text-transform: initial;
            }

            p {
              display: none;
            }
          }

          .index-indicator {
            .font-bold;
            display: none;

            justify-self: start;
            height: @headlineLineHeight_XS;

            color: @textColor;
            font-size: @headline_XS;
          }

          &.active {

            button {

              h2 {
                color: @color1;
              }
            }

          }

        }
      }

    }

    &.indexIndicator {

      .main-grid-container {

        @media @desktop {

          .index-container {

            .index-element {

              grid-template-columns: max-content 1fr;

              .index-indicator {
                .font-normal;
                display: grid;

                justify-self: start;
                height: @headlineLineHeight_XS;
                margin-top: -1.5px;

                color: @textColor;
                font-size: @headline_XS;
              }

              button {

                h2 {
                  .font-normal;
                  height: initial;
                  font-size: @headline_XS;
                  line-height: @headlineLineHeight_XS;
                  text-transform: initial;
                }

              }

              &.active {

                button {

                  h2 {
                    color: @color1;
                  }
                }

                .index-indicator {
                  color: @color1;
                }

              }

            }
          }
        }
      }
    }

  }

  &.indexIndicator {

    @media @desktop {

      .index-container {

        .index-element {

          .index-indicator {
            .font-head;
            display: grid;

            justify-self: start;
            height: @headlineLineHeight_XS;

            margin-top: -1px;

            color: @grey;
            font-size: @headline_XS;

            .trans(color);
          }
        }

      }

    }

    .index-container {

      .index-element {

        grid-template-columns: max-content 1fr;
      }

    }

  }

}
</style>
