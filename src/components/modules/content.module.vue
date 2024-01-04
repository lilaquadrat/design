<script setup lang="ts">
import type { ChildData, ContentWithPositions } from '@lilaquadrat/studio/lib/interfaces';
import { provide } from 'vue';

const props = defineProps<{
  content: ContentWithPositions
  inline?: boolean
  routeBase?: string
  linkEvents?: boolean
  linkBase?: string
  linkMode?: string
  contentChildData?: ChildData
}>();

provide('linkMode', props.linkMode);
provide('linkBase', props.linkBase);

</script>

<template>
  <article class="lila-content-module">

    <article class="top container" :inline="inline" v-if="!!content.top?.length">
      <component v-for="(single, i) in content?.top" :class="single.classes" :is="`${single.type}`" :key="`module-${single.type}-${i}`" v-bind="single" :additional="content.additional" position="top" />
    </article>

    <article class="container" :class="[content.settings.mode, {inline: inline}]" :inline="inline" v-if="!!content.content?.length">
      <component v-for="(single, i) in content.content"  :class="single.classes" :is="`${single.type}`" :key="`module-${single.type}-${i}`" v-bind="single" :additional="content.additional" position="content" />
    </article>

    <article class="bottom container" :inline="inline" v-if="!!content.bottom?.length">
      <component v-for="(single, i) in content.bottom" :class="single.classes" :is="`${single.type}`" :key="`module-${single.type}-${i}`" v-bind="single" :additional="content.additional" position="bottom" />
    </article>


    CONTENT MODULE12 PROP
    
  </article>
</template>

<style lang="less" scoped>
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

    &.top,
    &.inline {
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