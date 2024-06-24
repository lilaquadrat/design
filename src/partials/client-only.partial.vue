<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class ClientOnly extends Vue {

  private isMounted: boolean = false;


  mounted() {

    this.isMounted = true;
    this.$nextTick(() => {

      this.$forceUpdate();

    });

  }

  render(h) {

    if (this.isMounted) {

      return this.$slots.default;

    }

    return h(); // Return an empty vnode

  }

}
</script>
