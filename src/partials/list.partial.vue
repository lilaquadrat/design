<template>
  <section class="lila-list-links" v-if="notEmpty" :class="variant">
    <h4 v-if="title">{{ title }}</h4>

    <ul v-if="!actions || mode === 'list'">
      <li v-for="(single, index) in filteredValues" :key="`list-element-${index}`">

        <icons-partial v-if="!isNumbered && !noStyle" size="small" type="arrow-right"></icons-partial>

        <link-partial v-if="typeof(single) === 'object'" v-bind="single" />
        <template v-if="typeof(single) === 'string'">{{ single }}</template>

      </li>
    </ul>

    <link-group-partial :variant="variant" v-if="actions">

      <template v-for="(single, index) in filteredValues" >
        <link-partial v-if="typeof(single) === 'object'" v-bind="single" :key="`list-actions-element-${index}`" />
      </template>

    </link-group-partial>

  </section>
</template>
<script lang="ts">
import Link from '@interfaces/link.interface';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class listPartial extends ExtPartial {

  @Prop(Array) value: (string | Link)[];

  @Prop(String) title: string;

  @Prop(String) mode: 'list' | 'links';

  @Prop(Array) variant: string[];

  get isNumbered(): boolean {

    return this.variant?.includes('numbered');

  }

  get noStyle(): boolean {

    return this.variant?.includes('noStyle');

  }

  get actions(): boolean {

    return this.variant?.includes('actions');

  }

  get notEmpty(): boolean {

    return !!this.value?.find((single) => {

      if (typeof single === 'string') return single.length > 0;
      return single.text?.length > 0;

    });

  }

  get filteredValues(): (string | Link)[] {

    return this.value?.filter((single) => {

      if (typeof single === 'string' && single.length) return single;
      if (typeof single === 'object' && single.text && single.link) return single;
      return false;

    });

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-list-links {
  counter-reset: listItem;
  display: grid;

  gap: 10px;

  h4 {
    .multi(margin-left, 4);
  }

  ul {
    display: grid;
    gap: 10px 0;

    li {

      line-height: 20px;

      display: grid;
      grid-template-columns: 20px auto;

      align-content: start;

      font-size: @fontText;

      .icon {
        height: 20px;
        align-self: start;
      }

    }

  }

  &.noStyle, &.actions {

    h4 {
      .multi(margin-left, 0);
    }

    ul {

      li {
        grid-template-columns: 1fr;
      }

    }

  }

  &.numbered {

    ul {

      li {

        &:before {
          content: counter(listItem);
          counter-increment: listItem;
          color: @grey;
        }

      }

    }

  }

  &.actions {

    a {
      line-height: @buttonLineHeight;
      height: @buttonHeight;
    }

  }

}
</style>
