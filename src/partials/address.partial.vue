<template>
  <lila-fieldset-partial class="lila-address-partial" legend="address">

    <section ref="anchor" class="input-container">
      <div v-if="addressString" class="selected">
        <span class="addressString">{{addressString}}</span>
        <lila-button-partial icon @click="remove"><lila-icons-partial type="close" /></lila-button-partial>
      </div>
      <lila-input-partial  @focus="tryOpen" v-if="!selectedAddress" placeholder="type your street and number" @input="update">
        {{$translate('address search')}}
      </lila-input-partial>
    </section>


    <lila-input-partial placeholder="address addition">
      {{$translate('address addition')}}
    </lila-input-partial>

    <lila-input-labels-partial :error="hasError" :required="required" :disabled="disabled">
      <slot/>
    </lila-input-labels-partial>

    <lila-overlay-background-partial v-if="open" background="none" ref="options" @mounted="calculateOptionsStyle" @close="closeOptions">
      <section ref="options" class="options-container address-container" :style="optionsStyle">

        <button class="single-address" type="button" v-for="(single, index) in autocomplete" :key="`single-address-${index}`" @click="select(single)">
          {{ single.address.road }} {{ single.address.house_number }}, {{ single.address.postcode }} {{ single.address.city }}, {{ single.address.country }}
        </button>

      </section>
    </lila-overlay-background-partial>

  </lila-fieldset-partial>
</template>
<script lang="ts">
import Address from '@models/Address.model';
import ModelsClass from '@libs/Models.class';
import StudioSDK from '@libs/StudioSDK';
import { ParsedError } from '@libs/ActionNotice';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class agreementPartial extends ExtPartial {

  @Prop(String) name: string;

  @Prop(Object) value: Address;

  @Prop(String) placeholder: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(Boolean) required: boolean;

  @Prop(Object) error: ParsedError;

  model: Address = null;

  selectedAddress = null;

  autocomplete = [
    {
      place_id: '112682249',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '25827412',
      boundingbox: ['51.3750273', '51.3751723', '12.4109806', '12.4112437'],
      lat: '51.37509215',
      lon: '12.411112153933455',
      display_name: 'Die Villa Leipzig, 100, Essener Straße, Mockau, Mockau-Süd, Leipzig, Sachsen, 04357, Deutschland',
      class: 'building',
      type: 'yes',
      importance: 0.2101,
      address: {
        name: 'Die Villa Leipzig', house_number: '100', road: 'Essener Straße', neighbourhood: 'Mockau', suburb: 'Mockau-Süd', city: 'Leipzig', state: 'Sachsen', postcode: '04357', country: 'Deutschland', country_code: 'de',
      },
    }, {
      place_id: '185001590',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '322470223',
      boundingbox: ['51.5341089', '51.534271', '7.0158349', '7.0160774'],
      lat: '51.5341976',
      lon: '7.015957230303028',
      display_name: '100, Essener Straße, Horst, Gelsenkirchen, Nordrhein-Westfalen, 45899, Deutschland',
      class: 'building',
      type: 'yes',
      importance: 0.2101,
      address: {
        house_number: '100', road: 'Essener Straße', suburb: 'Horst', city: 'Gelsenkirchen', state: 'Nordrhein-Westfalen', postcode: '45899', country: 'Deutschland', country_code: 'de',
      },
    }, {
      place_id: '6636412',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'node',
      osm_id: '856236096',
      boundingbox: ['51.487656', '51.487756', '6.872393', '6.872493'],
      lat: '51.487706',
      lon: '6.872443',
      display_name: 'ZAQ Oberhausen, 100, Essener Straße, Neue Mitte, Oberhausen, Nordrhein-Westfalen, 46047, Deutschland',
      class: 'amenity',
      type: 'school',
      importance: 0.2101,
      icon: 'https://locationiq.org/static/images/mapicons/education_school.p.20.png',
      address: {
        name: 'ZAQ Oberhausen', house_number: '100', road: 'Essener Straße', suburb: 'Neue Mitte', city: 'Oberhausen', state: 'Nordrhein-Westfalen', postcode: '46047', country: 'Deutschland', country_code: 'de',
      },
    }, {
      place_id: '114939487',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '30933960',
      boundingbox: ['51.4875765', '51.4880035', '6.8718403', '6.8733116'],
      lat: '51.4878007',
      lon: '6.872575949805968',
      display_name: '100, Essener Straße, Neue Mitte, Oberhausen, Nordrhein-Westfalen, 46047, Deutschland',
      class: 'building',
      type: 'school',
      importance: 0.21000999999999997,
      address: {
        house_number: '100', road: 'Essener Straße', suburb: 'Neue Mitte', city: 'Oberhausen', state: 'Nordrhein-Westfalen', postcode: '46047', country: 'Deutschland', country_code: 'de',
      },
    }, {
      place_id: '135949518',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '123815709',
      boundingbox: ['51.5135976', '51.5137929', '6.9333922', '6.9336712'],
      lat: '51.5136902',
      lon: '6.933536429262516',
      display_name: '100, Essener Straße, Stadtmitte, Bottrop, Nordrhein-Westfalen, 46236, Deutschland',
      class: 'building',
      type: 'yes',
      importance: 0.21000999999999997,
      address: {
        house_number: '100', road: 'Essener Straße', suburb: 'Stadtmitte', city: 'Bottrop', state: 'Nordrhein-Westfalen', postcode: '46236', country: 'Deutschland', country_code: 'de',
      },
    }, {
      place_id: '134490475',
      licence: 'https://locationiq.com/attribution',
      osm_type: 'way',
      osm_id: '118682352',
      boundingbox: ['51.3996245', '51.3998019', '7.1265285', '7.126808'],
      lat: '51.39971275',
      lon: '7.1266694110545465',
      display_name: '100, Essener Straße, Niederwenigern, Hattingen, Ennepe-Ruhr-Kreis, Nordrhein-Westfalen, 45529, Deutschland',
      class: 'building',
      type: 'apartments',
      importance: 0.21000999999999997,
      address: {
        house_number: '100', road: 'Essener Straße', suburb: 'Niederwenigern', city: 'Hattingen', county: 'Ennepe-Ruhr-Kreis', state: 'Nordrhein-Westfalen', postcode: '45529', country: 'Deutschland', country_code: 'de',
      },
    },
  ];

  minLength = 1;

  calculatedOptions = {};

  open = false;

  created() {

    this.model = ModelsClass.add(this.value, 'address');

  }

  select(address: unknown) {

    this.selectedAddress = {
      osm_id: address.osm_id,
      country: address.address.country,
      street: address.address.road,
      streetNumber: address.address.house_number,
      zipcode: address.address.postcode,
      city: address.address.city,
    };

    this.closeOptions();

  }

  remove() {

    this.selectedAddress = null;

  }

  tryOpen() {

    if (this.autocomplete) {

      this.open = true;

    }

  }

  closeOptions() {

    this.open = false;

  }

  calculateOptionsStyle() {

    // eslint-disable-next-line no-unused-expressions
    this.$store.state.height;
    // eslint-disable-next-line no-unused-expressions
    this.$store.state.width;

    const element = this.$refs.anchor as HTMLElement;
    const optionsContainer = this.$refs.options as HTMLElement;
    const input = element.querySelector('input');
    const bounds = input.getBoundingClientRect();
    let top = bounds.top + input.offsetHeight;
    const body = document.querySelector('body');
    const positionTop = bounds.bottom + optionsContainer.offsetHeight + 50 > body.offsetHeight;

    if (positionTop) {

      top = bounds.top - 5 - optionsContainer.offsetHeight;

    }

    this.calculatedOptions = {
      top: `${top}px`,
      left: `${bounds.left}px`,
      'min-width': `${element.offsetWidth}px`,
      'max-width': `${element.offsetWidth}px`,
    };

    console.log('calc style', this.calculatedOptions);

  }

  get optionsStyle() {

    if (this.$store.state.media === 'mobile') return {};

    return this.calculatedOptions;

  }

  get addressString() {

    if (!this.selectedAddress) return null;

    return `${this.selectedAddress.street} ${this.selectedAddress.streetNumber}, ${this.selectedAddress.zipcode} ${this.selectedAddress.city}, ${this.selectedAddress.country}`;

  }

  async update(address: string) {

    if (address.length > this.minLength && /\d/.test(address)) {

      const sdk = new StudioSDK('design', this.$store.state.api);
      const response = await sdk.public.lists.address(address);

      this.autocomplete = response.data;

    }

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-address-partial {

  .selected {
    display: grid;
    grid-template-columns: 1fr 35px;
    min-height: @buttonHeight;
    align-items: start;

    .addressString {
      display: grid;
      line-height: @buttonHeight;
      align-content: center;
    }

  }

}

.address-container {
  position: absolute;
  display: grid;
  background-color: @white;

  @media @tablet, @desktop {
    box-shadow: 0 0 5px -3px @textColor;
  }

  .single-address {
    display: grid;
    margin: 0;
    padding: 15px 5px;
    border: 0;
    border-bottom: solid 1px @grey1;
    background: none;

    line-height: @buttonHeight;
    text-align: left;
    cursor: pointer;

    &:hover {
      color: @color1;
    }

  }

}
</style>
