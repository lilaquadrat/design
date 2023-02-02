<template>
  <nav :id="id" :class="[view, variant, { open: open }]" class="lila-menu-module lila-module">
    <section class="placeholder"></section>

    <section class="overflow-container">
      <section class="links-container">
        <section class="base-container">
          <a class="logo" href="/">
            <lila-picture-partial v-if="picture" v-bind="picture" />
            <template v-if="name">{{ name }}</template>
          </a>
        </section>

        <button class="trigger close" @click="toggle">
          <div class="placeholder"></div>
          <div class="trigger-container">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <transition mode="out-in" name="links">
          <section class="links" v-if="!isLeft">
            <template v-for="(element, index) in elementsArray">
              <lila-link-partial :key="`link-${index}`" class="main" v-if="!element.links" v-bind="element" />

              <section :key="`group-${index}`" v-if="element.links" class="link-group main">
                <button :class="{hasIcon: element.icon}" @click="toggleElement(element)">
                  <lila-icons-partial v-if="element.icon" :type="element.icon" size="small" />
                  {{ element.text }}
                </button>

                <transition mode="out-in" name="menu">
                  <ul class="link-list" v-if="element.links && element.active">
                    <li :key="`sublinks-${index}`" v-for="(single, index) in element.links">
                      <lila-link-partial v-if="single.text" v-bind="single"></lila-link-partial>
                    </li>
                  </ul>
                </transition>

              </section>
            </template>
          </section>
        </transition>
      </section>

      <section class="link-group-container" v-if="isLeft">
        <section class="links">
          <template v-for="(element, index) in elementsArray">
            <lila-link-partial :key="`link-${index}`" class="main" v-if="!element.links" v-bind="element" />
            <section :key="`group-${index}`" v-if="element.links" class="link-group main">
              <button :class="{hasIcon: element.icon}" @click="toggleElement(element)">
                <lila-icons-partial v-if="element.icon" colorScheme="white" :type="element.icon" size="small" /> {{ element.text }}
              </button>
              <transition mode="out-in" name="menu">
                <ul class="link-list" v-if="element.links && element.active">
                  <li :key="`sublinks-${index}`" v-for="(single, index) in element.links">
                    <lila-link-partial v-if="single.text" v-bind="single"></lila-link-partial>
                  </li>
                </ul>
              </transition>
            </section>
          </template>
        </section>
      </section>

      <section class="action-container" @click="toggle" @keyup="toggle" v-if="isLeft"></section>
    </section>
  </nav>
</template>
<script lang="ts">
import Picture from '@interfaces/picture.interface';
import LinkGroupElement from '@interfaces/LinkGroupElement.interface';
import {
  ExtComponent, Component, Prop, Watch,
} from '@libs/lila-component';

@Component
export default class MenuModule extends ExtComponent {

  @Prop(String) name: string;

  @Prop(Object) picture: Picture;

  @Prop(Array) elements: (LinkGroupElement & {active: boolean})[];

  elementsArray: (LinkGroupElement & {active: boolean})[] = [];

  open: boolean = false;

  @Watch('elements')
  watchFunc(): void {

    this.updateElements();

  }

  @Watch('media')
  watchMediafunction(): void {

    this.closeAll();
    this.open = false;

  }

  get media(): string {

    return this.$store.state.media;

  }

  get isLeft(): boolean {

    return this.variant?.includes('left');

  }

  created(): void {

    this.updateElements();

  }

  mounted(): void {

    this.checkInview();

    this.DOM.on('click', '', ($e) => {

      if (!this.$el.contains($e.target as HTMLElement)) {

        this.closeAll();

      }

    });

    this.updateElements();

  }

  updateElements(): void {

    this.elementsArray = [];

    this.elements?.forEach((element) => {

      const newElement = { ...element, active: false };

      if (newElement.links) {

        if (!newElement.links[0]?.text?.length) {

          delete newElement.links;

        }

      }

      this.elementsArray.push(newElement);

    });

  }

  type(element): 'router-link' | 'button' {

    if (element.link.text) return 'router-link';
    return 'button';

  }

  toggle(): void {

    this.open = !this.open;

  }

  toggleElement(element): void {

    element.active = !element.active;

  }

  closeAll() {

    this.elements?.forEach((element) => {

      element.active = false;

    });

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-menu-module {
  .index(8);

  position: relative;

  width: 100%;

  background-color: transparent;
  transition-delay: 0s;

  .placeholder {
    height: 40px;
  }

  &.overlay {

    .placeholder {
      display: none;
    }
  }

  .container-menu {
    width: 100%;

    @media only screen and (min-width: 520px), print and (min-width: 520px) {
      width: 250px;

      transform: translateX(0);
    }
  }

  .trigger {
    position: relative;
    padding: 0;

    -webkit-tap-highlight-color: transparent;
    .multi(padding-right, 8);

    @media @wide {
      padding: 0;
    }

    .placeholder {
      width: 40px;
    }

    .trigger-container {

      position: absolute;
      display: grid;

      grid-template-rows: min-content;

      gap: 4px;

      align-items: center;
      align-self: center;
      justify-self: end;
      width: 20px;
    }

    &:after {
      display: none;
    }

    span {

      display: grid;

      width: 20px;
      height: 2px;
      margin: auto;

      background-color: @color1;
      transition: all @aTime @aType;

      transform: rotate(0);

    }

    &:hover {

      span {
        background-color: @color2;
      }

    }

  }

  .overflow-container {

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;

    box-shadow: 0 0 3px 0 rgba(0, 0, 0, .13);

    @media @desktop {
      background-color: @white;
    }

  }

  .action-container {
    .index(3);

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: @white;
    opacity: 0;

    pointer-events: none;

    transition: opacity @animationTime @animationType;
  }

  .link-list {

    li {
      margin: 0;

      a,
      button {
        .multi(padding, 0, 10);

        @media @wide {
          .multi(padding, 0, 2);
        }
      }
    }
  }

  .link-group {
    position: relative;

    .link-list {

      background-color: @white;

      @media @wide {

        position: absolute;
        top: 100%;
        left: -20px;
        .multi(padding, 2, 4);

        min-width: calc(100% + 40px);

        transition: opacity @aTime @aType, transform @aTime @aType;

        &.menu-leave-active {
          opacity: 0;
          transition-delay: .1s;

          transform: translateY(-10px);
        }

        &.menu-enter-active {
          opacity: 0;
          transition-delay: .1s;

          transform: translateY(-10px);
        }

        li {
          display: grid;
          grid-template-columns: max-content;
        }

      }

    }

  }

  a::v-deep, button {
    .font-head;

    .multi(padding, 0, 8);
    display: grid;
    width: 100%;
    height: 40px;
    min-height: 40px;

    border: none;
    border-bottom: solid 1px @grey1;
    background: transparent;
    color: @color1;

    outline: none;

    font-size: @fontText;
    line-height: 41px;

    text-align: center;

    text-align: left;

    white-space: nowrap;
    cursor: pointer;

    @media @wide {
      .multi(padding, 0, 2);
      .basicHover();

      border-bottom: 0;

    }

    &:hover {
      background-color: @grey2;

      @media @wide {
        background-color: transparent;
      }
    }

    &.lila-link {

      &.hasIcon {

        .lila-icon-partial {
          display: grid;
        }
      }

    }

    // svg {
    //   fill: @color1;
    // }

    &.hasIcon {

      grid-template-columns: 15px 1fr;
      gap: 10px;

      .icon-partial {
        display: grid;

        align-self: center;
        justify-self: center;
        margin-top: -2px;
      }
    }

  }

  .links-container {
    display: grid;

    grid-template-columns: 1fr min-content;

    max-width: @desktopWidthExt;

    height: 40px;

    margin: auto;

    @media @desktop {
      max-width: 100%;
    }

    @media @wide {
      grid-template-columns: max-content 1fr;
      max-width: @desktopWidthExt;
    }

    .trigger,
    .base-container {
      background-color: @white;
    }

    .links {
      display: grid;
      grid-column-start: 1;

      grid-column-end: 3;
      width: 100%;

      border-top: solid 1px @grey1;

      background-color: @white;
      box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .13);

      opacity: 0;
      pointer-events: none;

      transition: opacity @aTime @aType,
        transform @aTime @aType;

      @media @wide {

        .multi(padding-bottom, 0);

        display: grid;
        grid-template-columns: repeat(8, max-content);

        grid-column-start: 3;
        grid-auto-columns: auto;
        justify-content: end;
        border-top: 0;
        box-shadow: none;

        opacity: 1;
        pointer-events: all;

      }

      &.links-leave-active {
        opacity: 0;
        transition-delay: .1s;

        transform: translateY(-5px);
      }

      &.links-enter-active {
        opacity: 0;
        transition-delay: .1s;

        transform: translateY(-5px);
      }

      a.main {

        &:last-child {
          padding-right: 0;
        }
      }

      .link-group {

        &:last-child {

          button {
            padding-right: 0;
          }
        }

      }

    }

    .trigger {

      @media @wide {
        display: none;
      }
    }

  }

  .logo::v-deep {

    .basicHover();

    width: max-content;
    height: 40px;
    padding: 0;

    line-height: 42px;
    .multi(padding-left, 8);

    @media @wide {
      padding: 0;
    }

    &:hover {
      background-color: transparent;
    }

    img {

      align-self: center;
      max-width: 190px;
      max-height: 40px;
      mix-blend-mode: normal;

      @media @tablet, @desktop {
        max-width: 250px;
      }

      &:hover {
        background-color: transparent;
      }
    }

  }

  &.colorScheme1 {

    .link-group {

      .link-list {

        background-color: transparent;

        @media @desktop {

          position: relative;

          left: 0;

          width: 100%;
          min-width: 100%;

          padding: 0;

          background-color: transparent;

          transition: none;

        }

      }

    }

  }

  &.open {

    .links-container {

      .links {
        display: grid;
        opacity: 1;
        pointer-events: all;
      }

    }

    .logo {

      justify-content: end;
    }

    .trigger {

      span {
        align-self: center;

        transform: rotate(45deg) translateY(4px);

        &:first-child {
          display: none;
        }

        &:last-child {
          transform: rotate(-45deg)  translateY(-4.5px);
        }
      }
    }

    .action-container {

      opacity: .8;
      pointer-events: all;
    }

    .overflow-container {
      border-bottom: 0;
    }

  }

  &.left {

    .link-list {

      li {
        display: block;
        margin: 0;

        a,
        button {
          .multi(padding, 2, 10);
        }
      }
    }

    .links-container {
      position: relative;
      grid-template-columns: min-content 1fr;

      transition: transform @animationTime @animationType;
      transition-delay: .1s;

      .index(5);

      .base-container {
        display: grid;
        grid-row-start: 1;
        grid-column-start: 2;
      }

      .trigger {
        grid-row-start: 1;
        grid-column-start: 1;

        padding: 0;

        .multi(padding-left, 8);

        @media @wide {
          display: grid;
        }

        .trigger-container {
          justify-self: start;
        }
      }

      .logo {
        display: grid;
        justify-self: end;
        padding: 0;
        .multi(padding-right, 8)
      }

      .links {
        width: 250px;
      }

    }

    .link-group-container {
      position: fixed;

      top: 0;
      left: 0;

      display: grid;

      grid-template-rows: 40px;
      width: 250px;

      height: 100vh;

      background-color: @grey3;

      box-shadow: 0 0 3px 0 rgba(0, 0, 0, .13);

      transition: transform @animationTime @animationType;
      transition-delay: .1s;

      transform: translateX(-250px);

      .index(5);

      .links {
        grid-row-start: 2;
      }

      a, button {

        display: grid;
        align-content: center;

        height: auto;
        line-height: 22px;

        white-space: normal;

        .multi(padding, 2, 8);

      }

    }

    &.colorScheme1 {

      .link-group-container {

        background-color: @color1;

        a::v-deep, button::v-deep {

          border-bottom: solid 1px @color3;
          color: @white;

          &:hover {
            background-color: @color3;
            opacity: 1;
          }

          // svg {
          //   fill: @white;
          // }
        }

      }
    }

    &.open {

      @media @wide {

        .links-container {
          transform: translateX(150px);
        }
      }

      .links-container {

        transform: translatex(250px);

      }

      .link-group-container {
        transform: translateX(0);
      }

    }

    .link-group {

      .link-list {

        @media @desktop {

          position: relative;

          left: 0;

          width: 100%;
          min-width: 100%;

          padding: 0;

          background-color: transparent;

          transition: none;

        }

      }

    }

  }

}

</style>
