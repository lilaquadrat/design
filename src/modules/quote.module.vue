<template>
  <section :class="[variant, view, {fullscreen: isNotice}]" class="lila-text-module lila-module">
    <blockquote cite="www.google.de">{{ quote }}</blockquote>
    <figcaption>Herzog Wern, <cite>Brave new World</cite></figcaption>
    {{ link }}
    {{ citation }}
  </section>
</template>

<script lang="ts">
import Link from '@interfaces/link.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class QuoteModule extends ExtComponent {

  @Prop(String) quote: string;

  @Prop(Object) link: Link;

  @Prop(String) citation: string;


  get isNotice() {

    return this.variant.includes('notice');

  }

}
</script>
