<template>
  <section class="lila-contact-module lila-module">

    <section class="intro-container">
      <lila-textblock-partial v-bind="textblock" />

      <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
      <h3 class="limited" v-if="limited && !disabled && !hideFreeSlots">
        <template v-if="!participantsState && !disabled">{{ $translateDiff('LIST_LIMITED_AVAILABILITY', limited) }}</template>
        <template v-if="participantsState && !disabled">{{ $translate('LIST_LIMITED_AVAILABILITY_STATE', [slotsAvailable, limited]) }}</template>
      </h3>
    </section>


    <section v-if="showFeedback" sub :content="feedbackContent">
      <lila-button-partial @click="resetForm" colorScheme="colorScheme1">{{ $translate('back to the form') }}</lila-button-partial>
    </section>

    <lila-content-module v-if="showFeedback" sub :content="feedbackContent" />

    <form @submit="handleForm" v-if="!showFeedback">
      <lila-fieldset-partial legend="message">

        <label>
          <lila-textarea-partial :required="list.mode === 'contact'" :error="errorsObject.message" :maxLength="2500" v-model="model.message">{{$translate('message')}}</lila-textarea-partial>
        </label>

      </lila-fieldset-partial>

      <lila-fieldset-partial v-if="categories" extendedGap legend="category">
        <lila-textblock-partial v-bind="categoryTextblock" />
        <lila-select-category-partial v-if="list.mode !== 'contact'" v-model="model.category" required :error="errorsObject.category" :variant="variant" :categories="categories" />
        <lila-select-partial v-if="list.mode === 'contact'" :multiple="false" :error="errorsObject.category" required :options="selectCategories" placeholder="select category">{{$translate('category')}}</lila-select-partial>
      </lila-fieldset-partial>

      <lila-fieldset-partial legend="personal">

        <label>
          <lila-input-partial :error="errorsObject.prename" required v-model="model.prename">
            {{$translate('prename')}}
          </lila-input-partial>
        </label>
        <label>
          <lila-input-partial :error="errorsObject.name" required v-model="model.name">
          {{$translate('name')}}
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
            {{$translate('zipcode')}}
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
          <lila-input-partial :error="errorsObject.email" required v-model="model.email">
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

        <lila-agreement-partial v-for="(single, index) in agreements" :error="single.error" :key="`agreement-${index}`" v-model="single.value" :required="single.required" :predefined="single.predefined" :contentId="single.contentId">{{$translate(single.text)}}</lila-agreement-partial>

      </lila-fieldset-partial>

      <lila-fieldset-partial>
        <lila-description-partial v-if="disabled" type="error">{{$translate('LIST_SOLD_OUT')}}</lila-description-partial>
        <lila-description-partial v-if="mainErrors" type="error">{{$translate(mainErrors)}}</lila-description-partial>
      </lila-fieldset-partial>

      <lila-action-notice-partial :state="state" :translation-pre="translationPre" :errors="errors" @update="updateErrors">
        <lila-button-partial :disabled="disabled" colorScheme="colorScheme1" type="submit">
          <template v-if="list.payment === 'required'">{{$translate('order with payment')}}</template>
          <template v-if="list.payment !== 'required' && list.mode === 'contact'">{{$translate('send contactform')}}</template>
          <template v-if="list.payment !== 'required' && list.mode === 'reservation'">{{$translate('send reservation')}}</template>
        </lila-button-partial>
      </lila-action-notice-partial>

    </form>

  </section>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { ExtComponent, Prop } from '@libs/lila-component';
import {
  Agreement, GenericData, List, ListPartiticpantsDetails,
} from '@lilaquadrat/studio/lib/interfaces';
import Textblock from '@interfaces/textblock.interface';
import Contact from '@models/Contact.model';
import ModelsClass from '@libs/Models.class';
import StudioSDK from '@libs/StudioSDK';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import { ErrorsObject } from '@libs/ActionNotice';
import ListCategoryExtended from '@interfaces/ListCategoryExtended.interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class ContactModule extends ExtComponent {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) categoryTextblock: Textblock;

  @Prop(Object) genericData: GenericData;

  @Prop(Object) editor: {modes: string[]};

  model: Contact = null;

  errors = null;

  errorsObject: ErrorsObject = {};

  translationPre = '';

  participantsState: ListPartiticpantsDetails = null;

  agreements: Record<string, Agreement & { value: boolean, error: boolean }> = {};

  get list(): List {

    if (this.genericData?.lists && this.genericData?.data && Array.isArray(this.genericData?.lists)) {

      return this.genericData.data[this.genericData.lists[0]];

    }

    return null;

  }

  get categories(): ListCategoryExtended[] {

    if (this.list.categories.length > 1) {

      const categories = this.list.categories as ListCategoryExtended[];

      if (this.participantsState) {

        categories.forEach((single: ListCategoryExtended) => {

          const stateCategory = this.participantsState?.categories?.find((singleState) => singleState.category === single.id);

          if (stateCategory) {

            single.used = stateCategory.used;
            single.available = single.amount - single.used;
            single.percentUsed = (single.used / single.amount) * 100;
            single.percentAvailable = 100 - (single.used / single.amount) * 100;

          }

        });

      }

      return categories;

    }

    return null;

  }

  get selectCategories() {

    if (this.list.categories.length > 1) {

      return this.list.categories.map((single) => ({
        value: single.id,
        text: single.name,
        description: single.description,
        disabled: single.disabled,
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

    return this.state === 'success' || this.editor?.modes?.includes('feedback');

  }

  get feedbackContent() {

    return prepareContent(this.feedback);

  }

  get limited() {

    return this.list.participants?.max || null;

  }

  get disabled() {

    if (this.participantsState && this.list.participants?.max) {

      return this.participantsState.used >= this.list.participants?.max;

    }

    return false;

  }

  get hideFreeSlots() {

    return this.variant.includes('hide-free-slots');

  }

  get mainErrors() {

    if (['LIST_CANNOT_JOIN', 'LIST_UNIQUE_CUSTOMER_CONFIRMED', 'LIST_NOT_FOUND', 'LIST_NO_SPOT_AVAILABLE'].includes(this.errors?.message)) {

      return `${this.errors?.message}_${this.list.mode}`;

    }

    return null;

  }

  get slotsAvailable() {

    return this.list.participants.max - this.participantsState.used;

  }

  created() {

    this.model = ModelsClass.add({}, 'contact');
    this.updateAgreements();
    this.getparticipantsState();


  }

  resetForm() {

    this.state = '';
    this.model = ModelsClass.add({}, 'contact');
    this.errors = null;
    this.errorsObject = {};

  }

  updateErrors(errorsObject: ErrorsObject) {

    this.errorsObject = errorsObject;
    this.updateAgreements();

  }

  changeAgreement(event: MouseEvent, index: string) {

    const agreement = this.agreements[index];
    const target = event.target as HTMLInputElement;

    agreement.value = target.checked;

  }

  updateAgreements() {

    const agreements = {};

    this.list.agreements.forEach((single: Agreement & {error: boolean}) => {

      agreements[single.contentId] = {
        ...single,
        value: this.agreements[single.contentId]?.value || false,
      };

      const values = this.errorsObject.agreements?.translatedPath?.values;


      if (values && values[1]) {

        if (values[1].includes(single.contentId)) {

          agreements[single.contentId].error = true;

        }

      }


    });

    this.agreements = agreements;

  }

  async getparticipantsState() {

    const sdk = new StudioSDK('design', this.$store.state.api);

    try {

      const participantsState = await sdk.public.lists.state(this.list._id.toString());

      if (participantsState.data) {

        this.participantsState = participantsState.data;

      }

    } catch (e) {

      console.error(e);
      console.log(e.response?.data);

    }


  }

  async handleForm(event: Event) {

    event.preventDefault();
    this.state = '';

    const customer = ModelsClass.save(this.model, 'contact');
    const agreements = [];
    let category: string;

    customer.type = 'person';

    const message = customer.message;

    delete customer.message;

    category = customer.category;

    delete customer.category;

    this.list.agreements.forEach((single: Agreement) => {

      if (this.agreements[single.contentId].value) {

        agreements.push({ id: single.contentId, version: 0 });

      }

    });

    if (this.list.categories.length === 1 && !category) {

      category = this.list.categories[0].id;

    }

    const sdk = new StudioSDK('design', this.$store.state.api);

    try {

      await sdk.public.lists.join(this.list._id.toString(), customer, message, category, agreements);
      this.state = 'success';

    } catch (e) {

      console.error(e);
      console.log(e.response?.data);

      this.errors = e.response?.data;
      this.state = 'error';

    }

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-contact-module {
  .module;
  .multi(padding, 4);

  display: grid;
  gap: 80px;

  max-width: @moduleWidth_S;

  .intro-container {
    display: grid;
    gap: 20px;
  }

  .agreements {
    display: grid;
    gap: 20px;
  }

}
</style>
