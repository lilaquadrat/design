<template>
  <section class="lila-highlight" :class="[variant]" v-if="notEmpty">
    <pre :key="keyhelper">
      <code>
        <template v-for="(singleText) in codeSanitized">
          {{ singleText }}
        </template>
      </code>
    </pre>
  </section>
</template>
<script lang="ts">
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import less from 'highlight.js/lib/languages/less';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import yaml from 'highlight.js/lib/languages/yaml';

import {
  Component, ExtPartial, Prop, Watch,
} from '../libs/lila-partial';

@Component
export default class highlightPartial extends ExtPartial {

  @Prop(Array) text: string[];

  @Prop(Array) code: string[];

  @Prop(String) headline: string;

  keyhelper: string = Date.now().toString();

  get notEmpty(): boolean {

    return !!this.code;

  }

  get codeSanitized() {

    return this.code;

  }

  @Watch('code')
  contentFunction(): void {

    this.keyhelper = Date.now().toString();
    this.$nextTick().then(() => {

      hljs.highlightElement(this.$el.querySelector('pre code'));

    });

  }

  mounted() {

    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('less', less);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('markdown', markdown);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('scss', scss);
    hljs.registerLanguage('yaml', yaml);

    hljs.highlightElement(this.$el.querySelector('pre code'));

  }

}
</script>

<style lang="less">
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-highlight {
  pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  // highlight.js standard css code (github.css)
  .hljs {
    color: #24292e;
    background: #fff;
  }
  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable.language_ {
    color: #d73a49;
  }
  .hljs-title,
  .hljs-title.class_,
  .hljs-title.class_.inherited__,
  .hljs-title.function_ {
    color: #6f42c1;
  }
  .hljs-attr,
  .hljs-attribute,
  .hljs-literal,
  .hljs-meta,
  .hljs-number,
  .hljs-operator,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-variable {
    color: #005cc5;
  }
  .hljs-meta .hljs-string,
  .hljs-regexp,
  .hljs-string {
    color: #032f62;
  }
  .hljs-built_in,
  .hljs-symbol {
    color: #e36209;
  }
  .hljs-code,
  .hljs-comment,
  .hljs-formula {
    color: #6a737d;
  }
  .hljs-name,
  .hljs-quote,
  .hljs-selector-pseudo,
  .hljs-selector-tag {
    color: #22863a;
  }
  .hljs-subst {
    color: #24292e;
  }
  .hljs-section {
    color: #005cc5;
    font-weight: 700;
  }
  .hljs-bullet {
    color: #735c0f;
  }
  .hljs-emphasis {
    color: #24292e;
    font-style: italic;
  }
  .hljs-strong {
    color: #24292e;
    font-weight: 700;
  }
  .hljs-addition {
    color: #22863a;
    background-color: #f0fff4;
  }
  .hljs-deletion {
    color: #b31d28;
    background-color: #ffeef0;
  }

  // highlight.js standard css code (github-dark.css)
  &.darkmode {
    .hljs {
      color: #c9d1d9;
      background: #0d1117;
    }
    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
      color: #ff7b72;
    }
    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
      color: #d2a8ff;
    }
    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-variable {
      color: #79c0ff;
    }
    .hljs-meta .hljs-string,
    .hljs-regexp,
    .hljs-string {
      color: #a5d6ff;
    }
    .hljs-built_in,
    .hljs-symbol {
      color: #ffa657;
    }
    .hljs-code,
    .hljs-comment,
    .hljs-formula {
      color: #8b949e;
    }
    .hljs-name,
    .hljs-quote,
    .hljs-selector-pseudo,
    .hljs-selector-tag {
      color: #7ee787;
    }
    .hljs-subst {
      color: #c9d1d9;
    }
    .hljs-section {
      color: #1f6feb;
      font-weight: 700;
    }
    .hljs-bullet {
      color: #f2cc60;
    }
    .hljs-emphasis {
      color: #c9d1d9;
      font-style: italic;
    }
    .hljs-strong {
      color: #c9d1d9;
      font-weight: 700;
    }
    .hljs-addition {
      color: #aff5b4;
      background-color: #033a16;
    }
    .hljs-deletion {
      color: #ffdcd7;
      background-color: #67060c;
    }
  }
}
</style>
