<template>
  <div id="app">
    <router-view :key="`module-${$route.params.link}`" />
    <portal-target name="overlay" multiple />
  </div>
</template>
<script lang="ts">
import {
  ExtComponent, Component,
} from '@libs/lila-component';

@Component
export default class appComponentPartial extends ExtComponent {}
</script>
