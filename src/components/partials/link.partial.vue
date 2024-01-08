<script setup lang="ts">
import { computed, getCurrentInstance, inject, type ComputedRef } from 'vue';

const props = defineProps<{
    link: string
    text?: string
    icon?: string
    attributes?: string[]
    classes?: string[]
    variant?: string[]
}>();
const linkMode: 'event' | 'link' | undefined = inject('linkMode');
const linkBase = inject('linkBase');
const linkWithBase: ComputedRef<string> = computed(() => linkBase ? `${linkBase}/${props.link}` : props.link); 
const type: ComputedRef<'router-link' | 'a'> = computed(() => linkMode === 'event' ? 'a' : 'router-link'); 
const emit = defineEmits<{
  (e: string, id: string): void
}>();
const event = ($event: MouseEvent) => {

  if (props.attributes?.includes('event') || linkMode === 'event') {

    $event.preventDefault();

    const instance = getCurrentInstance();

    if (linkMode === 'event') {

      instance?.emit('integratedLink', {link: props.link.slice(1), text: props.text});
      // this.$root.$emit('integratedLink', { link: this.link, text: this.text });

    } else {

      emit(props.link.slice(1), props.text);
      instance?.emit(props.link.slice(1), props.text);

      // this.$emit(this.link.slice(1), this.text);
      // this.$root.$emit(this.link.slice(1), this.text);

    }


  }

};

</script>
<template>
  <component
    v-if="link"
    :class="[variant, classes, {hasIcon: icon}]"
    class="lila-link"
    :is="type"
    :to="linkWithBase"
    :href="linkWithBase"
    @click="event"
    >
    <lila-icons-partial v-if="icon" :type="icon" size="small" />
    {{ text }}
    <slot v-if="!text"></slot>
  </component>
</template>
<style lang="less" scoped>

.lila-link {

  color: @link;
  .font-normal;
  .trans(color);

  &:hover {
    color: @linkHover;
  }

  &.hasIcon {

    .lila-icon-partial {
      display: inline
    }
  }

  &.callToAction {
    .trans(background);

    display: inline-block;
    height: @buttonHeight;

    background-color: @color4;
    color: @white;

    font-size: @fontTextSmaller;

    line-height: @linkLineHeight;

    text-transform: uppercase;

    transition: background @aTime @aType;

    .font-head;
    .multi(padding, 0, 3);

    &:hover {
      background-color: @color5;
    }

    &.colorScheme2 {
      border-color: @color3;
      color: @color3;

      &:hover {
        border-color: @color1;
        color: @color1;
      }

      &.router-link-active {
        background-color: @grey;

        &:hover {
          background-color: @grey1;
          color: @textColor;
        }
      }
    }

    &.white {
      border-color: @white;
      background-color: transparent;
      color: @white;

      &:hover {
        border-color: @color1;
        color: @color1;
      }
    }
  }
}
</style>