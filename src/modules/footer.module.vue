<template>
  <footer :id="id" :class="[view, fontVariant, variant]" class="lila-footer-module lila-module">
    <section class="footer-container">
      <lila-picture-partial v-if="picture" v-bind="picture" class="picture-container" />
      <section class="information-container" v-if="information">
        <lila-textblock-partial v-if="information.textblock" v-bind="information.textblock" />
        <!-- List -->
        <section v-if="information.list" class="list-container">
          <h3>{{ information.list.title }}</h3>
        <ul v-for="(item, index) in information.list.elements" :key="`list-elements-${index}`">
          <li> {{ item }}</li>
        </ul>
        </section>
        <!-- links -->
       <section v-if="information.links" class="link-container">
        <h3>{{ information.links.title }}</h3>
        <ul v-for="(item, index) in information.links" :key="`links-elements-${index}`">
          <li v-for="(element, index) in item" :key="`sitemap-element-links-${index}`">
            <lila-link-partial v-bind="element" />
          </li>
        </ul>
       </section>
      </section>

      <template v-if="sitemap">
        <section v-for="(element, index) in sitemap" :key="`sitemap-elements-${index}`" class="content">
          <h3>{{ element.title }}</h3>
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
import Textblock from '@interfaces/textblock.interface';
import ListWithTitle from '@interfaces/ListWithTitle.interface';

@Component
export default class FooterModule extends ExtComponent {

  @Prop(Array) fontVariant: string[];

  @Prop(Object) contact: FooterContact;

  @Prop(Object) social: FooterSocial;

  @Prop(String) legal: string;

  @Prop(Array) sitemap: Sitemap;

  @Prop(Object) picture?: Picture;

  @Prop(Object) information: {
    textblock: Textblock,
    list: ListWithTitle,
    links: ListWithTitle
  };

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

    .footer-container {

      grid-template-columns: 1fr;

      @media @desktop, @tablet {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 40px;
        width: 100%;
        max-width: @desktopWidthExt;
      }

      .information-container {
        display: grid;
        gap: 15px;
      }
    }

    .contact {
      display: none
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

      .legal {
        .multi(padding, 2, 0);
      }
    }
  }
}
</style>
