<template>
  <section class="lila-contact-module lila-module">

    <h1>CONTACT MODULE</h1>
    <lila-textblock-partial v-bind="textblock" />
    {{ list }}
    <form @submit="handleForm">
      <fieldset>
        <legend>personal</legend>

        <label>
          <input />
          prename
        </label>
        <label>
          <input />
          lastname
        </label>

      </fieldset>
      <fieldset>
        <legend>address</legend>

        <label>
          <input />
          street & number
        </label>
        <label>
          <input />
          zipocode
        </label>
        <label>
          <input />
          city
        </label>
        <label>
          <input />
          country
        </label>

      </fieldset>

      <fieldset>
        <legend>contact</legend>

        <label>
          <input />
          email
        </label>
        <label>
          <input />
          phone
        </label>

      </fieldset>

      <fieldset>
        <legend>message</legend>

        <label>
          <textarea />
          message
        </label>

      </fieldset>

      <fieldset>

        <template v-for="(single, index) in list.agreements">
          <label :key="`agreement-${index}`">
            <input type="checkbox" :required="single.required" />
            {{ single.text }}
            <lila-content-container-partial :type="'studio'" :category="['conditions-of-use']" latest overlay />
          </label>
        </template>

      </fieldset>

      <button type="submit">submit</button>

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

    if (this.genericData.lists && this.genericData.data && Array.isArray(this.genericData.lists)) {

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

}
</style>
