<template>
  <section :id="id" v-if="visible && isOverlay || !isOverlay"
    :class="[{ 'lila-module': !isOverlay, isOverlay, }, overlayPosition]" class="lila-cookies-module">

    <lila-overlay-background-partial v-if="visible && isOverlay && overlayPosition === 'overlayFull'" background="mobile">
      <lila-dialog-partial class="lila-cookies-module-dialog" type="check" @confirm="consent('all')"
        @cancel="consent('selection')" :translations="translations">
        <lila-textblock-partial v-if="textblock" v-bind="textblock" />
        <section class="checkbox-container">
          <lila-checkbox-partial disabled v-model="technical">technisch notwendige Cookies</lila-checkbox-partial>
          <lila-checkbox-partial v-model="cookies.analytics">Analyse-Cookies </lila-checkbox-partial>
        </section>
      </lila-dialog-partial>
    </lila-overlay-background-partial>

    <lila-dialog-partial v-if="visible && isOverlay && overlayPosition === 'overlayRight'"
      class="lila-cookies-module-dialog" type="check" @confirm="consent('all')" @cancel="consent('selection')"
      :translations="translations">
      <lila-textblock-partial v-if="textblock" v-bind="textblock" />
      <section class="checkbox-container">
        <lila-checkbox-partial disabled v-model="technical">technisch notwendige Cookies</lila-checkbox-partial>
        <lila-checkbox-partial v-model="cookies.analytics">Analyse-Cookies </lila-checkbox-partial>
      </section>
    </lila-dialog-partial>

    <template v-if="!isOverlay">

      <lila-textblock-partial v-if="textblock" v-bind="textblock" />
      <lila-list-partial v-bind="list" mode="list" />
      <lila-list-partial v-bind="links" mode="links" />

      <section class="checkbox-container">
        <lila-checkbox-partial disabled v-model="technical">technisch notwendige Cookies</lila-checkbox-partial>
        <lila-checkbox-partial v-model="cookies.analytics">Analyse-Cookies </lila-checkbox-partial>
      </section>
      <lila-button-group-partial gap>
        <lila-button-partial @confirmed="consent('all')" colorScheme="colorScheme1">{{ translations.confirm
        }}</lila-button-partial>
        <lila-button-partial @confirmed="consent('selection')" colorScheme="transparent">{{ translations.cancel
        }}</lila-button-partial>
      </lila-button-group-partial>
    </template>

  </section>
</template>
<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type Link from '@interfaces/link.interface';
import type Textblock from '@interfaces/textblock.interface';

import dayjs from 'dayjs';
import { computed, onMounted } from 'vue';

const props = defineProps<{
  textblock: Textblock;

  links: Link[];

  list: string[];
  id?:string
  variant?: string[];

}>();
let technical = true;
let visible = false;
let cookies:any | {analytics:any}= {
  analytics: false ,    // change cokie type def
};
let translations = {
  confirm: 'Alle akzeptieren',
  cancel: 'Auswahl bestätigen',
};
const gtag = computed(() => {

  const useWindow: any = window;

  return useWindow.gtag || function gtag() { return true; };

});
const isOverlay = computed(() => {

  return props.variant?.includes('overlay');

});
const overlayPosition = computed(() => {

  if (props.variant?.includes('overlayRight')) return 'overlayRight';
  return 'overlayFull';

});

onMounted(() => {

  calcVisibilty();

  if (isOverlay.value) {

    updateSelection();

  }

  console.log(this.$store);

});


function calcVisibilty() {

  const cookies = getCookies();

  console.log(cookies, props.variant?.includes('overlay'), cookies.find((single) => single.name === 'lila-cookies'));

  if (props.variant?.includes('overlay')) {

    visible = !cookies.find((single) => single.name === 'lila-cookies');

    if (overlayPosition.value === 'overlayFull') {

      this.$store.dispatch('fullscreen', visible);

    }

  } else {

    visible = true;

  }


}


function updateSelection() {

  const currCookies = getCookies();
  const acceptedCookie = currCookies.find((single) => single.name === 'lila-cookies-accepted');
  let accepted: string[] = [];

  if (acceptedCookie) {

    accepted = acceptedCookie.value.split(',');
    accepted.forEach((single) => {

      if (cookies[single] !== undefined) {

        cookies[single] = true;

      }

    });

  }

}


function consent(type: 'all' | 'selection') {

  const currCookies = getCookies();

  if (type === 'all') {

    Object.keys(currCookies).forEach((single) => { cookies[single] = true; });

  }

  if (cookies.analytics) {

    gtag.value('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });

  } else {

    gtag.value('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    });

    currCookies.forEach((single) => {

      if (single.name.match(/^_ga*/)) {

        document.cookie = `${single.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None;`;

      }

    });

  }

  const cookieKeys = Object.keys(cookies).filter((single) => (cookies[single] ? single : null));

  cookieKeys.push('technical');

  console.log(cookieKeys);

  document.cookie = `lila-cookies=1; expires=${dayjs().add(2, 'years').toString()}; SameSite=None;`;
  document.cookie = `lila-cookies-accepted=${cookieKeys.join(',')}; expires=${dayjs().add(2, 'years').toString()}; SameSite=None;`;

  calcVisibilty();

}

function getCookies() {

  const cookies = document.cookie.split(';').filter((single) => single);

  return cookies.map((single) => {

    const name = single.split('=');

    return { name: name[0].trim(), value: name[1] };

  });

}

</script>
<style lang="less" scoped>


.lila-cookies-module-dialog,
.lila-cookies-module.lila-module {

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

.lila-cookies-module {

  &.isOverlay.overlayRight {

    .lila-cookies-module-dialog {

      position: fixed;
      top: 20px;
      right: 20px;
      bottom: 20px;
      left: 20px;
      display: grid;

      @media @tablet,
      @desktop {
        top: inherit;
        right: 20px;
        bottom: 20px;
        left: inherit;
      }

    }
  }

  &.lila-module {

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

}
</style>
