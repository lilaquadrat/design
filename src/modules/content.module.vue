<template>
  <section class="lila-content-module">

    <article class="top container" :inline="inline" v-if="!!content.top.length">
      <component v-for="single in content.top" :class="single.classes" :is="`${single.type}`" :key="single.uuid" v-bind="single" :additional="content.additional" position="top" />
    </article>

    <article class="container" :class="[content.settings.mode, {inline: inline}]" :inline="inline" v-if="!!content.content.length">
      <template v-for="single in content.content">
        <component :class="single.classes" :is="`${single.type}`" :key="single.uuid" v-bind="single" :additional="content.additional" position="content" />
      </template>
    </article>

    <article class="bottom container" :inline="inline" v-if="!!content.bottom.length">
      <component v-for="single in content.bottom" :class="single.classes" :is="`${single.type}`" :key="single.uuid" v-bind="single" :additional="content.additional" position="bottom" />
    </article>

  </section>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { ExtComponent, Prop } from '@libs/lila-component';
import { ProvideReactive } from 'vue-property-decorator';
import { ChildData } from '@lilaquadrat/studio/lib/interfaces';
import ContentPrepared from '@lilaquadrat/studio/lib/src/interfaces/ContentPrepared.interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class ContentModule extends ExtComponent {

  @ProvideReactive('linkBase') linkBase: string;

  @ProvideReactive('linkMode') linkMode: string;

  @ProvideReactive('contentChildData') contentChildData?: ChildData;

  @Prop(Object) content: ContentPrepared;

  @Prop(Object) childData: ChildData;

  @Prop(Boolean) inline: boolean;

  @Prop(String) routeBase: string;

  @Prop(Boolean) linkEvents: boolean;

  constructor() {

    super();

    this.linkBase = this.routeBase;
    this.linkMode = this.linkEvents ? 'event' : 'link';

  }

}
</script>
<style lang="less" scoped>
@import (reference) '@{projectPath}/source/less/shared.less';

.lila-content-module {
  position: relative;

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

    &.top {
      .multi(margin-bottom, 0);

      .lila-module {

        &:first-child {
          .multi(margin-top, 0);
        }
      }
    }

    &.inline {
      .multi(margin-bottom, 8);

      .lila-module {

        &:first-child {
          .multi(margin-top, 8);
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
