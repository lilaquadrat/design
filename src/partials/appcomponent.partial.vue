<template>
  <div id="app">
    <transition mode="out-in" name="content">
      <router-view :key="`module-${$route.params.link}`"></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import {
  ExtComponent, Component,
} from '@libs/lila-component';

@Component
export default class appComponentPartial extends ExtComponent {}
</script>
