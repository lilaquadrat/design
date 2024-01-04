<template>
  <section  ref="el" class="lila-partial-container lila-module" v-if="modules">

    <component v-for="(single, i) in modules" :class="single.classes" :is="single.type" v-bind:key="`module-${i}`"
      v-bind="single"></component>

  </section>
</template>
<script setup lang="ts">
import type { ModuleGeneric } from '@lilaquadrat/studio/lib/interfaces';
import { onMounted, ref } from 'vue';
import checkInview from '../../mixins/checkin';

const props = defineProps<{
  modules: ModuleGeneric[];

}>();
let el = ref(null);

onMounted(() => {

  checkInview(el);

});


</script>
<style lang="less" scoped>
.lila-partial-container {
  display: grid;
}
</style>
