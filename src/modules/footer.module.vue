<template>
  <footer :id="id" :class="[view, fontVariant, variant]" class="lila-footer-module lila-module">
    <section class="footer-container">
      <lila-picture-partial v-if="picture" v-bind="picture" class="picture-container" />
      <template v-if="sitemap">
        <section v-for="(element, index) in sitemap" :key="`sitemap-elements-${index}`" class="content">
          <h3>{{ element.title }}</h3>
          <span class="text-container" v-if="element.address">
            <span v-for="(element, index) in element.address" :key="`address-element-links-${index}`">
              <p v-bind="element"> {{ element }}</p>
            </span>
          </span>
          <ul class="icon-container">
            <li v-for="(element, index) in element.elements" :key="`sitemap-element-links-${index}`">
              <lila-link-partial v-bind="element"></lila-link-partial>
            </li>
          </ul>
        </section>
      </template>
    </section>

    <section class="contact-social-container">
      <section v-if="contact" class="contact">
        <h3>{{ contact.title }}</h3>
        <h3><lila-link-partial v-bind="contact.link" /></h3>
      </section>

      <section v-if="social" class="social">
        <h3>{{ social.title }}</h3>

        <div class="icon-container">
          <lila-link-partial v-for="(element, index) in social.elements" :key="`social-elements-${index}`"
            :link="element.link.link">
            <lila-picture-partial v-bind="element.picture" />
          </lila-link-partial>
        </div>
      </section>
    </section>

    <section class="legal">{{ legal }}</section>
  </footer>
</template>
<script lang="ts">
import Sitemap from '@interfaces/Sitemap.interface';
import FooterContact from '@interfaces/FooterContact.interface';
import FooterSocial from '@interfaces/FooterSocial.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';
import Picture from '@interfaces/picture.interface';

@Component
export default class FooterModule extends ExtComponent {

  @Prop(Array) fontVariant: string[];

  @Prop(Object) contact: FooterContact;

  @Prop(Object) social: FooterSocial;

  @Prop(String) legal: string;

  @Prop(Array) sitemap: Sitemap;

  @Prop(Object) picture?: Picture;

}
</script>
<style lang="less" scoped>
@import (reference) '@{projectPath}/source/less/shared.less';

.lila-footer-module {

  .module;
  .multi(margin-top, 50);

  display: grid;
  grid-template-rows: min-content min-content min-content;
  gap: 40px;
  width: 100%;
  max-width: @desktopWidthExt;
  margin: auto;

  background: transparent;

  @media @desktop {
    .multi(margin-top, 80);
  }

  h3 {
    color: @grey;
    font-size: @fontTextSmaller;
    .font-bold;

  }

  .contact-social-container {

    display: grid;

    grid-template-rows: 1fr 1fr;

    gap: 20px;
    align-items: center;

    @media @tablet, @desktop {
      grid-template-rows: auto;
      grid-template-columns: max-content 1fr;
    }
  }

  .footer-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 40px 20px;
  }

  .social {

    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: 15px;
    align-items: center;

    @media @tablet, @desktop {
      grid-template-columns: 1fr auto;
      justify-items: end;
    }

    .icon-container {
      display: flex;
      flex-flow: wrap;

      gap: 10px;

      .lila-link::v-deep {

        display: grid;

        img {
          max-width: 30px;
          max-height: 30px;
        }
      }
    }
  }

  .contact {

    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: 15px;

    align-items: center;

    @media @tablet, @desktop {
      grid-template-columns: 1fr auto;
      justify-items: start;
    }

    a {
      .font-bold;
      font-size: @fontText;
    }
  }

  .content {
    display: grid;
    grid-template-rows: min-content 1fr;
    gap: 10px;

    a {
      font-size: @fontTextSmaller;
    }
  }

  .legal {
    border-top: solid 1px @grey;
    text-align: right;

    .multi(padding, 4, 0);
  }

  &.footerWithIcon {
    gap: 0;

    .footer-container {
      grid-template-columns: 1fr;
      gap: 10px;
      max-width: @moduleWidth_XS;
      .multi(padding-bottom, 2);

      @media @tablet, @desktop {
        grid-template-columns: 1.5fr 2fr auto auto;
        gap: 100px;
        max-width: @moduleWidth_M;
        .multi(padding-bottom, 3);
      }

      .picture-container {
        min-width: 200px;
        max-width: 200px;
      }

      .content {
        max-width: fit-content;
        height: fit-content;
        white-space: nowrap;
      }

      .text-container,
      .content:nth-child(2) {
        white-space: nowrap;
      }

      .content:not(:nth-child(2)) {
        display: grid;
        text-align: right;

      }
    }

    .contact-social-container {
      grid-template-rows: 1fr;

      .multi(padding, 4, 0, 4, 0);

      @media @tablet, @desktop {
        .multi(padding-bottom, 4);
        gap: 0;
      }

    }

    .contact {
      display: none;
    }

    .social {

      @media @tablet, @desktop {
        grid-column-start: 2;

      }

      .icon-container {
        flex-wrap: nowrap;
        gap: 25px;
        justify-content: space-between;
      }
    }

    .legal {
      grid-row-start: -1;
      .multi(padding-top, 2);
    }
  }
}
</style>
