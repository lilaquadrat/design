<template>
  <div id="app">
    <router-view />
    <lila-client-only-partial><portal-target name="overlay" multiple /></lila-client-only-partial>
    <lila-client-only-partial>TEST</lila-client-only-partial>
  </div>
</template>
<script lang="ts">
import {
  ExtComponent, Component,
} from '@libs/lila-component';

@Component
export default class appComponentPartial extends ExtComponent { }
</script>
