<template>
  <section class="lila-highlight">
    <pre>
      <code>
        <!-- Todo: Code-txt doesnt automatically update -->
        <p v-for="(singleText, index) in code" :key="`code-${index}`">
          {{ singleText }}
        </p>
    </code>
    </pre>
  </section>
</template>

<script lang="ts">
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { Component, ExtPartial, Prop } from '../libs/lila-partial';
// import 'highlight.js/styles/github.css';

// Todo: import ts , js , css, less, html, bash, markdown, json, scss(sass), yaml

@Component
export default class highlightPartial extends ExtPartial {

  @Prop(Array) text: string[];

  @Prop(Array) code: string[];

  @Prop(String) headline: string;

  mounted() {

    hljs.registerLanguage('javascript', javascript);
    hljs.configure({ languages: ['javascript', 'typescript'] });
    hljs.highlightAll();

  }

}
</script>
