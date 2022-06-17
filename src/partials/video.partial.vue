<template>
    <video class="lila-video-partial" @click="toggle" @keyup="toggle" v-attributes="attributes" :poster="poster" :class="[state, { loading: loading }]" :key="src" v-if="src">
      <source v-for="single in source" :key="single.media" :class="single.media" :data-src="single.source" />
      <track kind="captions" />
      <source v-if="src" :data-src="src" />
    </video>
</template>
<script lang="ts">
import { VideoSource } from '@interfaces/video.interface';
import {
  ExtComponent, Component, Prop, Watch,
} from '@libs/lila-component';

// Vue.use(VueYouTubeEmbed);

@Component
export default class VideoPartial extends ExtComponent {

  @Prop(Boolean) trigger;

  @Prop(String) poster: string;

  @Prop(String) src: string;

  @Prop(Array) attributes: string[];

  @Prop(Array) source: VideoSource[];

  @Prop(Boolean) js: boolean;

  @Prop(Boolean) preview: boolean;

  loading: boolean = true;

  state: string = 'loading';

  playing: boolean = null;

  @Watch('src')
  watchVideo() {

    this.start();

  }

  @Watch('source')
  watchMediafunction() {

    this.start();

  }

  @Watch('trigger')
  watchTriggerfunction() {

    this.toggle();

  }

  mounted() {

    this.start();

    this.DOM.onElement('playing', this.realElement, () => {

      this.playing = true;
      this.$emit('playing', true);

    });

    this.DOM.onElement('pause', this.realElement, () => {

      this.playing = false;
      this.$emit('playing', false);

    });

    this.DOM.onElement('ended', this.realElement, () => {

      this.playing = false;
      this.$emit('ended', true);

    });

  }

  toggle() {

    if (this.preview) return false;

    const element: HTMLMediaElement = this.$el as HTMLMediaElement;

    if (this.playing) {

      element.pause();

    } else {

      if (this.attributes?.includes('unmuted')) {

        element.muted = false;

      }

      element.play();

    }

    return true;

  }

  start() {

    this.$nextTick()
      .then(() => {

        if (!this.realElement || !this.src) return this.$nextTick();

        const current = this.$el.querySelector('source[src]');
        const allSource = this.$el.querySelectorAll('source');
        let newSource = this.$el.querySelector(`.${this.media}`);

        // eslint-disable-next-line prefer-destructuring
        if (allSource.length === 1) newSource = allSource[0];

        if (current) current.removeAttribute('src');
        if (newSource) newSource.setAttribute('src', newSource.getAttribute('data-src'));

        return this.$nextTick();

      })
      .then(() => {

        const element: HTMLMediaElement = this.$el as HTMLMediaElement;

        if (typeof element.load !== 'function') return;
        element.load();

        if (this.attributes?.includes('play')) {

          element.play();

        }

        if (this.attributes?.includes('muted')) {

          element.volume = 0;
          element.muted = true;

        }

      });

  }

  get media() {

    return this.$store?.state.media;

  }

  get realElement() {

    return this.$el;

  }

  get videoType() {

    return this.src?.match('^https://(www.)?youtube.com') ? 'youtube' : 'basic';

  }

  get realSrc() {

    if (this.videoType === 'youtube') {

      const url = new URL(this.src);
      const videoId = url.searchParams.get('v');

      return this.js
        ? videoId
        : `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1`;

    }

    return this.src;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-video-partial {
  display: grid;
  max-width: 100%;

  &:hover {
    cursor: pointer;
  }
}
</style>
