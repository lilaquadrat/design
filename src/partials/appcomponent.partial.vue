<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import {
  ExtComponent, Component,
} from '@libs/lila-component';

@Component
export default class appComponentPartial extends ExtComponent {}
</script>
