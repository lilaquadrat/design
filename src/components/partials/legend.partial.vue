<template>
  <section class="lila-legend">
    <p v-for="(single, index) in text" :key="`legend-${index}`">
      {{ single }}
    </p>
  </section>
</template>
<script setup lang="ts">
const props = defineProps < {
  text: string[];
}> ();

</script>
<style lang="less" scoped>


.lila-legend {

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: end;
  font-size: @fontTextSmaller;

  p {
    text-align: right;
  }
}
</style>
