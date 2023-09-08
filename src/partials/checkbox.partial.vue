<template>
    <section
    class="lila-checkbox"
      :colorConfig="{
        background: '#ffffff',
        border: '#0d0d0d',
        leftPlunk: '#8A8A8A',
        topPlunk: '#E0E0E0'
      }"
      @handleChange="noRefCheck"
    >
      <p color="#8A8A8A" :fontSize="16" fontType="body" :fontWeight="400">
        I agree to terms & conditions
      </p>
    </section>
</template>
  <style lang="less" scoped>
  @import (reference) "@{projectPath}/source/less/shared.less";
  .lila-input{
      padding: 10px;
      &.small {
          width: 20vw - 3rem;
          font-weight: 300;
      }
      &.medium {
          width: 50vw - 3rem;
          font-weight: 500;
      }
      &.large {
          width: 100vw - 3rem;
          font-weight: 900;
      }
  }

</style>
