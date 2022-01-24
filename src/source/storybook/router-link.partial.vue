<template>
  <a :href="to">{{ text }}<slot v-if="!text"></slot></a>
</template>
<script lang="ts">
import {
  ExtComponent, Component, Prop,
} from '@libs/lila-component';

@Component
export default class RouterLinkPartial extends ExtComponent {

  @Prop(String) to: string;

  @Prop(String) text: string;

}
</script>
