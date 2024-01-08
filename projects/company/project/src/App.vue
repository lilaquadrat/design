<script setup lang="ts">


</script>

<template>
  <RouterView />
</template>

<style lang="less">
body {
  .font-normal;

  @media print {
    background: transparent;
    background-attachment: scroll;
  }

  color: @textColor;

  font-size: @fontText;
  .lineHeight(@fontText, 1.5);
}

@page {
  margin: 0;
  size: 210mm 297mm;
}

* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  background-repeat: no-repeat;

  list-style-type: none;

  text-decoration: none;
}


</style>
