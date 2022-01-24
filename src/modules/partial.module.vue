<template>
<section class="partial-container" v-if="modules">

  <component
  v-for="(single, i) in modules" :class="single.classes" :is="single.type" v-bind:key="`module-${i}`" v-bind="single"></component>

</section>

</template>
<script lang="ts">
import { ExtComponent, Component, Prop } from '@libs/lila-component';
import { ModuleGeneric } from '@lila2/studio/lib/interfaces';

@Component
export default class partialModule extends ExtComponent {

  @Prop(Array) modules: ModuleGeneric[];

  mounted() {

    this.checkInview();

  }

}

</script>
<style lang="less" scoped>

  .partial-container {
    display: grid;
  }

</style>
