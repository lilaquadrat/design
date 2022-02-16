<template>
  <section class="lila-content-module">

    <article class="top container" :inline="inline" v-if="!!content.top.length">
      <component v-for="(single, i) in content.top" :class="single.classes" :is="`${single.type}`" :key="`module-${single.type}-${i}`" v-bind="single" />
    </article>

    <article class="container" :class="[content.settings.mode, {inline: inline}]" :inline="inline" v-if="!!content.content.length">
      <component v-for="(single, i) in content.content" :class="single.classes" :is="`${single.type}`" :key="`module-${single.type}-${i}`" v-bind="single" />
    </article>

    <article class="bottom container" :inline="inline" v-if="!!content.bottom.length">
      <component v-for="(single, i) in content.bottom" :class="single.classes" :is="`${single.type}`" :key="`module-${single.type}-${i}`" v-bind="single" />
    </article>

  </section>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { ExtComponent, Prop } from '@libs/lila-component';
import { ProvideReactive } from 'vue-property-decorator';
import ContentPrepared from '@lilaquadrat/studio/lib/src/interfaces/ContentWithPositions.interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class ContentModule extends ExtComponent {

  @ProvideReactive('linkBase') linkBase: string;

  @Prop(Object) content: ContentPrepared;

  @Prop(Boolean) inline: boolean;

  @Prop(String) routeBase: string;

  constructor() {

    super();

    this.linkBase = this.routeBase;

  }


}
</script>
<style lang="less" scoped>
@import (reference) '@{projectPath}/source/less/shared.less';

.lila-content-module {
  position: relative;
  overflow-y: hidden;

  max-width: 100%;

  .container {
    display: grid;

    grid-template-columns: 100%;

    align-items: center;
    max-width: 100%;
    .multi(margin-bottom, 4);

    .lila-module {

      &:first-child {

        .multi(margin-top, 16);

        &.fullscreen {
          .multi(margin-top, 0);
        }
      }
    }

    &.top, &.inline {
      .multi(margin-bottom, 0);

      .lila-module {

        &:first-child {
          .multi(margin-top, 0);
        }
      }
    }

    &.presentation {
      gap: @rowGapPresentation;
    }

    &.content {
      gap: @rowGapContent;
    }
  }

}
</style>
