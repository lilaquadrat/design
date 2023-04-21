<template>
  <section :id="id" :class="{'lila-module': !isOverlay}" class="lila-cookies-module">

    <portal v-if="visible && isOverlay" to="util">
      <lila-overlay-background-partial  background="mobile">
        <lila-dialog-partial class="lila-cookies-module-dialog" type="check" @confirm="consent('all')" @cancel="consent('selection')" :translations="translations">
          <lila-textblock-partial v-if="textblock" v-bind="textblock" />
          <section class="checkbox-container">
              <lila-checkbox-partial disabled v-model="technical">technisch notwendige Cookies</lila-checkbox-partial>
              <lila-checkbox-partial v-model="cookies.analytics">Analyse-Cookies </lila-checkbox-partial>
          </section>
        </lila-dialog-partial>
      </lila-overlay-background-partial>
    </portal>

    <template v-if="!isOverlay">
      <lila-textblock-partial v-if="textblock" v-bind="textblock" />
      <section class="checkbox-container">
        <lila-checkbox-partial disabled v-model="technical">technisch notwendige Cookies</lila-checkbox-partial>
        <lila-checkbox-partial v-model="cookies.analytics">Analyse-Cookies </lila-checkbox-partial>
      </section>
      <lila-button-group-partial gap>
        <lila-button-partial @confirmed="consent('all')" colorScheme="colorScheme1">{{translations.confirm}}</lila-button-partial>
        <lila-button-partial @confirmed="consent('selection')" colorScheme="transparent">{{translations.cancel}}</lila-button-partial>
      </lila-button-group-partial>
    </template>

  </section>
</template>
<script lang="ts">
import Textblock from '@interfaces/textblock.interface';
import {
  ExtComponent, Component, Prop,
} from '@libs/lila-component';
import dayjs from 'dayjs';

@Component
export default class CookiesModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  technical = true;

  visible = true;

  cookies = {
    analytics: false,
  };

  translations = {
    confirm: 'Alle akzeptieren',
    cancel: 'Auswahl bestatigen',
  };


  get gtag() {

    const useWindow: any = window;

    return useWindow.gtag;

  }

  get isOverlay() {

    return this.variant.includes('overlay');

  }

  mounted() {

    this.calcVisibilty();

    if (!this.isOverlay) {

      this.updateSelection();

    }

  }

  calcVisibilty() {

    const cookies = this.getCookies();

    console.log(cookies, this.variant.includes('overlay'), cookies.find((single) => single.name === 'lila-cookies'));

    if (this.variant.includes('overlay')) {

      this.visible = !cookies.find((single) => single.name === 'lila-cookies');


    } else {

      this.visible = true;

    }


  }

  updateSelection() {

    const cookies = this.getCookies();
    const acceptedCookie = cookies.find((single) => single.name === 'lila-cookies-accepted');
    let accepted: string[] = [];

    if (acceptedCookie) {

      accepted = acceptedCookie.value.split(',');
      accepted.forEach((single) => {

        if (this.cookies[single] !== undefined) {

          this.cookies[single] = true;

        }

      });

    }

  }


  consent(type: 'all' | 'selection') {

    const cookies = this.getCookies();

    if (type === 'all') {

      Object.keys(this.cookies).forEach((single) => { this.cookies[single] = true; });

    }

    if (this.cookies.analytics) {

      this.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });

    } else {

      this.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
      });

      cookies.forEach((single) => {

        if (single.name.match(/^_ga*/)) {

          document.cookie = `${single.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None;`;

        }

      });

    }

    const cookieKeys = Object.keys(this.cookies).filter((single) => (this.cookies[single] ? single : null));

    cookieKeys.push('technical');

    console.log(cookieKeys);

    document.cookie = `lila-cookies=1; expires=${dayjs().add(2, 'years').toString()}; SameSite=None;`;
    document.cookie = `lila-cookies-accepted=${cookieKeys.join(',')}; expires=${dayjs().add(2, 'years').toString()}; SameSite=None;`;

    this.calcVisibilty();

  }

  getCookies() {

    const cookies = document.cookie.split(';').filter((single) => single);

    return cookies.map((single) => {

      const name = single.split('=');

      return { name: name[0].trim(), value: name[1] };

    });

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-cookies-module-dialog, .lila-cookies-module.lila-module {

  .checkbox-container {

    display: grid;
    gap: 10px;

    .lila-label-parent-container::v-deep {

      .label-container {
        display: none;
      }
    }
  }

}

.lila-cookies-module.lila-module {

  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  .lila-label-parent-container::v-deep {

    .label-container {
      display: none;
    }
  }

}

</style>
