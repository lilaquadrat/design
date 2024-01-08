<template>
    <section class="lila-overlay-background" ref="background" :class="[backgroundMode]" @keydown="checkClose" @click="checkClose">
      <slot></slot>
    </section>
</template>
<script setup lang="ts">
import { computed, nextTick, onDeactivated, onMounted } from 'vue';

const props = defineProps < {
  background: 'none' | 'mobile' | 'tablet' | 'desktop';
}> ();
let emit = defineEmits<{
    (e: string): void
}>();
const backgroundMode= computed(() => {

  return props.background || 'mobile';

});

function checkClose ($e: { target: any; }) {

  if (this.$refs.background !== $e.target) return;

  emit('close');

}

onMounted(() => {

  nextTick(() => {

    if (this.$store) this.$store.dispatch('fullscreen', true);
    emit('mounted');

  });

});

onDeactivated(() => {

  if (this.$store) this.$store.dispatch('fullscreen', false);

});
// not sure sbout this.$store
</script>
<style lang="less">


.lila-overlay-background {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, .5);

  @media @tablet, @desktop {
    background-color: transparent;
  }
  .index(10);

  &.mobile {
    background-color: rgba(0, 0, 0, .5);

    @media @tablet, @desktop {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  &.none {
    background-color: transparent;

    @media @tablet, @desktop {
      background-color: transparent;
    }
  }

  &.tablet {

    @media @tablet {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  &.desktop {

    @media @tablet, @desktop {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  .content-container {
    .index(11);
    position: absolute;
  }

}
</style>
