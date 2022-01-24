<template functional>
  <section class="content-module">

    <article class="top container" :inline="props.inline" v-if="!!props.data.top.length">
      <component v-for="(single, i) in props.data.top" :class="single.classes" :is="single.type" :key="`module-${single.type}-${i}`" v-bind="single" />
    </article>

    <article class="container" :class="[props.data.settings.mode, {inline: props.inline}]" :inline="props.inline" v-if="!!props.data.content.length">
      <component v-for="(single, i) in props.data.content" :class="single.classes" :is="single.type" :key="`module-${single.type}-${i}`" v-bind="single" />
    </article>

    <article class="bottom container" :inline="props.inline" v-if="!!props.data.bottom.length">
      <component v-for="(single, i) in props.data.bottom" :class="single.classes" :is="single.type" :key="`module-${single.type}-${i}`" v-bind="single" />
    </article>

  </section>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import ContentData from '@interfaces/ContentData.interface';
import FunctionalComponent from '../libs/lila-functional';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component({ functional: true })
export default class ContentModule extends FunctionalComponent<ContentData> {}
</script>
<style lang="less" scoped>
@import (reference) '@{projectPath}/source/less/shared.less';

.content-module {

  max-width: 100%;
  overflow-y: hidden;
  position: relative;

  .container {
    display: grid;
    max-width: 100%;

    align-items: center;

    grid-template-columns: 100%;
    .multi(margin-bottom, 4);

    &.top, &.inline {
        .multi(margin-bottom, 0);
    }

    .module {
        &:first-child {

            .multi(margin-top, 16);

            &.fullscreen {
                .multi(margin-top, 0);
            }
        }
    }

    &.inline {
      .module {
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
