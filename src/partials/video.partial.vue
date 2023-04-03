<template>
<section @click="toggle" @keyup="toggle" class="lila-video-partial" :class="{noPreload: preload === 'none'}">
    <section v-if="preload === 'none' && !loadVideo" class="preload-placeholder">
      LOAD VIDEO
    </section>
    <video v-if="(preload === 'auto' || (preload === 'none' && loadVideo)) && src && !youtubeId && renderTarget !== 'pdf'" ref="videoElement" v-attributes="attributes" :preload="preload" :poster="poster" :class="[state, { loading: loading }]" :key="src">
      <source v-for="single in source" :key="single.media" :class="single.media" :data-src="single.source" />
      <track kind="captions" />
      <source v-if="src" :data-src="src" />
    </video>
    <youtube class="iframe" v-if="youtubeId" @playing="playing" @paused="paused" @ended="ended" @ready="ready" v-bind="youtubeSettings"></youtube>
</section>
</template>
<script lang="ts">
import { VideoSource } from '@interfaces/video.interface';
import {
  ExtComponent, Component, Prop, Watch,
} from '@libs/lila-component';
import VueYouTubeEmbed, { getIdFromURL } from 'vue-youtube-embed';
import Vue from 'vue';

Vue.use(VueYouTubeEmbed);

@Component
export default class VideoPartial extends ExtComponent {

  $refs: {
    videoElement: HTMLVideoElement;
  };

  @Prop(Boolean) trigger;

  @Prop(String) poster: string;

  @Prop(String) src: string;

  @Prop(Array) attributes?: string[];

  @Prop(Array) source: VideoSource[];

  @Prop(Boolean) js: boolean;

  @Prop(Boolean) preview: boolean;

  @Prop({ type: String, default: 'auto' }) preload: 'auto' | 'metadata' | 'none';

  loading: boolean = true;

  state: string = 'loading';

  isPlaying: boolean = null;

  loadVideo: boolean = null;

  youtubeObject;

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

  @Watch('realElement', { deep: true })
  watchElement() {

    console.log('refs changed');

  }

  mounted() {

    this.start();
    this.bind();


  }

  bind() {

    if (this.realElement) {

      this.DOM.onElement('playing', this.realElement, () => {

        this.isPlaying = true;
        this.$emit('playing', true);

      });

      this.DOM.onElement('pause', this.realElement, () => {

        this.isPlaying = false;
        this.$emit('playing', false);

      });

      this.DOM.onElement('ended', this.realElement, () => {

        this.isPlaying = false;
        this.$emit('ended', true);

      });

    }

  }

  toggle() {

    if (this.preload === 'none' && !this.loadVideo) {

      this.loadVideo = true;
      this.$nextTick(() => {

        this.bind();
        this.start();

      });
      return false;

    }

    if (this.preview) return false;

    if (this.videoType === 'basic') {

      if (!this.$refs?.videoElement) return false;

      if (this.isPlaying) {

        this.$refs?.videoElement.pause();

      } else {

        if (this.attributes?.includes('unmuted')) {

          this.$refs.videoElement.muted = false;

        }

        this.$refs?.videoElement.play();

      }

    }

    if (this.videoType === 'youtube') {

      if (this.isPlaying) {

        this.youtubeObject.pause();

      } else {

        this.youtubeObject.playVideo();

      }

    }

    return true;

  }

  start() {

    if (this.videoType === 'youtube') return;

    console.log(this.$refs?.videoElement, this.$refs, this.src);

    this.$nextTick()
      .then(() => {

        if (!this.$refs?.videoElement || !this.src) return this.$nextTick();

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


        if (typeof this.$refs?.videoElement?.load !== 'function') return;
        this.$refs?.videoElement?.load();

        if (this.attributes?.includes('play')) {

          this.$refs?.videoElement.play();

        }

        if (this.attributes?.includes('muted')) {

          this.$refs.videoElement.volume = 0;
          this.$refs.videoElement.muted = true;

        }

      });

  }

  get media() {

    return this.$store?.state.media;

  }

  get realElement() {

    return this.$refs.videoElement as HTMLMediaElement;

  }

  get videoType() {

    return this.src?.match('^https://(www.)?youtube.com') ? 'youtube' : 'basic';

  }

  get youtubeId() {

    if (this.videoType !== 'youtube') return false;

    return getIdFromURL(this.src);

  }

  get youtubeSettings() {

    if (this.videoType !== 'youtube') return false;

    return {
      'video-id': this.youtubeId,
      'player-width': '100%',
      'player-height': '100%',
      'player-vars': {
        autoplay: this.attributes?.includes('autoplay') ? 1 : 0,
        controls: this.attributes?.includes('controls') ? 1 : 0,
        loop: this.attributes?.includes('loop') ? 1 : 0,
        modestbranding: 1,
        rel: 0,
      },
      host: 'https://www.youtube-nocookie.com',
    };

  }

  get realSrc() {

    if (this.videoType === 'youtube') {

      const url = new URL(this.src);
      const videoId = url.searchParams.get('v');

      return this.js
        ? videoId
        : `https://www.youtube-nocookie.com/embed/${videoId}`;

    }

    return this.src;

  }

  ready(event) {

    this.youtubeObject = event.target;

  }

  playing() {

    this.isPlaying = true;
    this.$emit('playing', true);

  }

  paused() {

    this.isPlaying = false;
    this.$emit('playing', false);

  }

  ended() {

    this.isPlaying = false;
    this.$emit('ended', false);

  }

}
</script>
<style lang="less">
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-video-partial {
  display: grid;
  max-width: 100%;

  &:hover {
    cursor: pointer;
  }

  video, .preload-placeholder {
    display: grid;
    max-width: 100%;
  }

  .preload-placeholder {
    align-content: center;
    justify-content: center;
    min-height: 100px;
    background-color: @grey1;
    color: @color1;
    .font-head;
  }

  .iframe {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: auto;
    padding: 56.25% 0 0 0;

    iframe {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
