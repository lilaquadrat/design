<template>
  <section class="lila-contact-module lila-module">

    <lila-textblock-partial v-bind="textblock" />
    {{ list }} {{ model }}
    <form @submit="handleForm">
      <lila-fieldset-partial legend="personal">

        <label>
          <lila-input-partial v-model="model.prename">
            prename
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial  v-model="model.name">
          lastname
        </lila-input-partial>
        </label>

      </lila-fieldset-partial>
      <lila-fieldset-partial legend="address">

        <label>
          <lila-input-partial v-model="model.streetNumber">
          street & number
        </lila-input-partial>
        </label>
        <label>
          <lila-input-partial  v-model="model.zipcode">
          zipocode
        </lila-input-partial>
        </label>
        <label>
        <lila-input-partial  v-model="model.city">
          city
        </lila-input-partial>
        </label>
        <label>
          <lila-input-partial  v-model="model.country">
          country
        </lila-input-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial legend="contact">

        <label>
          <lila-input-partial  v-model="model.email">
          email
        </lila-input-partial>
        </label>
        <label>
          <lila-input-partial  v-model="model.phone">
          phone
        </lila-input-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial  legend="message">

        <label>
          <lila-textarea-partial v-model="model.message">
            message
          </lila-textarea-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="list" class="agreements">

        {{ agreements }}

        <section v-for="(single, index) in agreements" :key="`agreement-${index}`">
          <label>
            <input type="checkbox" @change="changeAgreement($event, index)" />
            {{ single.text }} - {{ single.value }}
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
import { Agreement, GenericData, List } from '@lilaquadrat/studio/lib/interfaces';
import Textblock from '@interfaces/textblock.interface';
import Contact from '@models/Contact.model';
import ModelsClass from '@libs/Models.class';
import StudioSDK from '@libs/StudioSDK';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class ContactModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) genericData: GenericData;

  model: Contact = null;

  agreements: Record<string, Agreement & {value: boolean}> = {};

  get list() {

    if (this.genericData?.lists && this.genericData?.data && Array.isArray(this.genericData?.lists)) {

      return this.genericData.data[this.genericData.lists[0]];

    }

    return null;

  }

  beforeMount() {

    this.model = ModelsClass.add({}, 'contact');
    this.createAgreements();


  }

  changeAgreement(event: MouseEvent, index: string) {

    const agreement = this.agreements[index];
    const target = event.target as HTMLInputElement;

    agreement.value = target.checked;

  }

  createAgreements() {

    const agreements = {};

    this.list.agreements.forEach((single: Agreement) => {

      agreements[single.contentId] = {
        ...single,
        value: false,
      };

    });

    this.agreements = agreements;

  }

  async handleForm(event: HTMLFormElement) {

    event.preventDefault();

    let error = false;
    const customer = ModelsClass.save(this.model, 'contact');
    const agreements = [];

    customer.type = 'person';

    this.list.agreements.forEach((single: Agreement) => {

      console.log('try', single.contentId);

      if (single.required && !this.agreements[single.contentId].value) {

        error = true;

      }

      if (this.agreements[single.contentId].value) {

        console.log('add', single.contentId);


        agreements.push({ id: single.contentId, version: 0 });

      }


    });

    const sdk = new StudioSDK(
      'design',
      {
        customEndpoints: { api: 'http://localhost:9090', media: '' },
        company: 'lilaquadrat',
        project: 'homepage',
      },
    );


    try {

      await sdk.public.lists.join(this.list._id, customer, agreements);

    } catch (e) {

      console.error(e);

    }


    console.log('form handle', error, customer);

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
