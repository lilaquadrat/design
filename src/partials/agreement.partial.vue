<template>
  <section class="lila-agreement-partial">
    <lila-checkbox-partial :value="value" @input="changeHandler"><slot /></lila-checkbox-partial>

    <lila-content-container-partial :predefined="predefined" :id="contentId" overlay>Inhalte anzeigen</lila-content-container-partial>
  
  </section>
</template>
<script lang="ts">
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class agreementPartial extends ExtPartial {

  @Prop(String) name: string;

  @Prop(Boolean) value: boolean;

  @Prop(String) error: string;

  @Prop(String) contentId: string;

  @Prop(Boolean) required: boolean;

  @Prop(Boolean) predefined: boolean;

  @Prop(String) description: string;

  @Prop(Boolean) disabled: boolean;

  @Prop(String) text: string;

  textType: string = 'word';

  changeHandler(checked: boolean): void {

    this.$emit('input', checked);

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-agreement-partial {

  display: grid;
  width: 100%;
  grid-template-columns: 45px 1fr;
  gap: 5px 0;

  .lila-label-parent-container {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .content-container-full {
    grid-column-start: 2;
    grid-row-start: 2;
  }

}
</style>
