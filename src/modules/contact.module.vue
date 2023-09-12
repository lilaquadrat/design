<template>
  <section class="lila-contact-module lila-module">

    <lila-textblock-partial v-bind="textblock" />
    {{ list }}
    <form @submit="handleForm">
      <lila-fieldset-partial legend="personal">

        <label>
          <lila-input-partial>
            prename
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial >
          lastname
        </lila-input-partial>
        </label>

      </lila-fieldset-partial>
      <lila-fieldset-partial legend="address">

        <label>
          <lila-input-partial>
          street & number
        </lila-input-partial>
        </label>
        <label>
          <lila-input-partial>
          zipocode
        </lila-input-partial>
        </label>
        <label>
          <lila-input-partial>
          city
        </lila-input-partial>
        </label>
        <label>
          <lila-input-partial>
          country
        </lila-input-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial legend="contact">

        <label>
          <lila-input-partial>
          email
        </lila-input-partial>
        </label>
        <label>
          <lila-input-partial>
          phone
        </lila-input-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial  legend="message">

        <label>
          <lila-textarea-partial>
            message
          </lila-textarea-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="list" class="agreements">

        <section v-for="(single, index) in list.agreements" :key="`agreement-${index}`">
          <label>
            <input type="checkbox" :required="single.required" />
            {{ single.text }}
          </label>
          <lila-content-container-partial :predefined="single.predefined" :id="single.contentId" overlay>Inhalte anzeigen</lila-content-container-partial>
        </section>


      </lila-fieldset-partial>

      <lila-button-partial colorScheme="colorScheme1" type="submit">submit</lila-button-partial>

    </form>

  </section>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { ExtComponent, Prop } from '@libs/lila-component';
import { GenericData } from '@lilaquadrat/studio/lib/interfaces';
import Textblock from '@interfaces/textblock.interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class ContactModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) genericData: GenericData;

  get list() {

    if (this.genericData?.lists && this.genericData?.data && Array.isArray(this.genericData?.lists)) {

      return this.genericData.data[this.genericData.lists[0]];

    }

    return null;

  }

  handleForm(event: HTMLFormElement) {

    event.preventDefault();

    console.log('form handle');

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-contact-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  &.medium {
    max-width: @moduleWidth_M;
  }

  .agreements {
    display: grid;
    gap: 10px;
  }

}
</style>
