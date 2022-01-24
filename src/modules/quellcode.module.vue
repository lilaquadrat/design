<template>
  <section :class="[variant, view]" class="module picture-module">
    <textblock-partial v-bind="$props" />
    <highlight-partial v-bind="$props"></highlight-partial>
  </section>
</template>
<script lang="ts">
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class QuellcodeModule extends ExtComponent {

  @Prop(Array) text: string[];

  @Prop(Array) code: string[];

  @Prop(String) headline: string;

  @Prop(String) subline: string;

  @Prop(String) intro: string;

}
</script>
