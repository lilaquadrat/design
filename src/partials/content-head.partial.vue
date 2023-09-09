<template>
  <section class="content-head">
    <h3><slot /></h3>
    <lila-button-partial v-if="!hideButton" type="button" icon="close" size="medium" color-scheme="transparent" @click="close"><lila-icons-partial type="close"/></lila-button-partial>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class contentHeadPartial extends Vue {

  @Prop(Boolean) hideButton: boolean;

  close() {

    this.$emit('close');

  }


}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.content-head {

  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: @buttonHeight;
  box-shadow: 0 5px 5px -5px @grey;
  .index(5);

  h3 {
    display: grid;
    align-content: center;
    overflow: hidden;
    background-color: @white;
    color: @color1;
    text-overflow: ellipsis;
    white-space: nowrap;
    .multi(padding, 0, 8);

  }

}
</style>
