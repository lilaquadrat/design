<template>
  <section class="lila-contact-module">

    <lila-textblock-partial v-bind="textblock" />

    <lila-content-module v-if="showFeedback" sub :content="feedbackContent" />

    <form @submit="handleForm" v-if="!showFeedback">
      <lila-fieldset-partial legend="message">

        <label>
          <lila-textarea-partial v-model="model.message">
            {{$translate('message')}}
          </lila-textarea-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial extendedGap legend="category">
        <lila-textblock-partial v-bind="categoryTextblock" />
        <lila-select-category-partial v-if="list.mode !== 'contact'" v-model="model.category" :categories="categories" />
        <lila-select-partial v-if="list.mode === 'contact'" :multiple="false" required :options="selectCategories" placeholder="select category">category</lila-select-partial>
      </lila-fieldset-partial>

      <lila-fieldset-partial legend="personal">

        <label>
          <lila-input-partial v-model="model.prename">
            {{$translate('prename')}}
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial required v-model="model.name">
          {{$translate('lastname')}}
        </lila-input-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial legend="address">

        <label>
          <lila-input-partial v-model="model.streetNumber">
            {{$translate('street & number')}}
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial v-model="model.zipcode">
            {{$translate('zipocode')}}
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial v-model="model.city">
            {{$translate('city')}}
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial v-model="model.country">
            {{$translate('country')}}
          </lila-input-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial legend="contact">

        <label>
          <lila-input-partial v-model="model.email">
            {{$translate('email')}}
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial v-model="model.phone">
            {{$translate('phone')}}
          </lila-input-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="list" class="agreements">

        <lila-agreement-partial v-for="(single, index) in agreements" :key="`agreement-${index}`" v-model="single.value" :predefined="single.predefined" :contentId="single.contentId">{{$translate(single.text)}}</lila-agreement-partial>

      </lila-fieldset-partial>

      <lila-button-group-partial>

        <lila-button-partial colorScheme="colorScheme1" type="submit">
          <template v-if="list.payment === 'required'">{{$translate('Kostenpflichtig Bestellen')}}</template>
          <template v-if="list.payment !== 'required' && list.mode === 'contact'">{{$translate('Kontakformular senden')}}</template>
          <template v-if="list.payment !== 'required' && list.mode === 'reservation'">{{$translate('Reservierung senden')}}</template>
        </lila-button-partial>

      </lila-button-group-partial>

    </form>

  </section>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { ExtComponent, Prop } from '@libs/lila-component';
import {
  Agreement, GenericData, List,
} from '@lilaquadrat/studio/lib/interfaces';
import Textblock from '@interfaces/textblock.interface';
import Contact from '@models/Contact.model';
import ModelsClass from '@libs/Models.class';
import StudioSDK from '@libs/StudioSDK';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class ContactModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) categoryTextblock: Textblock;

  @Prop(Object) genericData: GenericData;

  @Prop(Object) editor: {modes: string[]};

  model: Contact = null;

  agreements: Record<string, Agreement & { value: boolean }> = {};

  get list(): List {

    if (this.genericData?.lists && this.genericData?.data && Array.isArray(this.genericData?.lists)) {

      return this.genericData.data[this.genericData.lists[0]];

    }

    return null;

  }

  get categories() {

    if (this.list.categories.length > 1) {

      return this.list.categories;

    }

    return null;

  }

  get selectCategories() {

    if (this.list.categories.length > 1) {

      return this.list.categories.map((single) => ({
        value: single.id,
        text: single.name,
        description: single.description,
      }));

    }

    return null;

  }

  get feedback() {

    if (this.genericData?.editor && this.genericData?.data && Array.isArray(this.genericData?.editor)) {

      return this.genericData.data[this.genericData.editor[0]];

    }

    return null;

  }

  get showFeedback() {

    return this.editor?.modes?.includes('feedback');

  }

  get feedbackContent() {

    return prepareContent(this.feedback);

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

  async handleForm(event: Event) {

    event.preventDefault();

    let error = false;
    const customer = ModelsClass.save(this.model, 'contact');
    const agreements = [];

    customer.type = 'person';

    const message = customer.message;

    delete customer.message;

    const category = customer.category;

    delete customer.category;

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

      await sdk.public.lists.join(this.list._id, customer, message, category, agreements);

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
  .multi(padding, 4);

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  .agreements {
    display: grid;
    gap: 20px;
  }

}
</style>
