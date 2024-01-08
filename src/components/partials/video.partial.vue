<template>
  <section @click="toggle" @keyup="toggle" class="lila-video-partial" :class="{ noPreload: preload === 'none' }">
    <section v-if="preload === 'none' && !loadVideo" class="preload-placeholder">
      LOAD VIDEO
    </section>
    <video v-if="(preload === 'auto' || (preload === 'none' && loadVideo)) && src && !youtubeId && renderTarget !== 'pdf'"
      ref="videoElement" v-attributes="attributes" :preload="preload" :poster="poster"
      :class="[state, { loading: loading }]" :key="src">
      <source v-for="single in source" :key="single.media" :class="single.media" :data-src="single.source" />
      <track kind="captions" />
      <source v-if="src" :data-src="src" />
    </video>
    <youtube class="iframe" v-if="youtubeId" @playing="playing" @paused="paused" @ended="ended" @ready="ready"
      v-bind="youtubeSettings"></youtube>
  </section>
</template>
<script setup lang="ts">
// import VueYouTubeEmbed, { getIdFromURL } from 'vue-youtube-embed';
import type { VideoSource } from '@/interfaces/video.interface';
import Vue, { computed, nextTick, onMounted, watch } from 'vue';

// Vue.use(VueYouTubeEmbed);

const props = withDefaults(defineProps<{

  trigger: boolean;

  poster: string;

  src: string;

  attributes?: string[];

  source: VideoSource[];

  js: boolean;

  preview: boolean;

  preload: 'auto' | 'metadata' | 'none';

}>(), {
  preload: 'auto'
});
let $refs: {
  videoElement: HTMLVideoElement;
};
let loading: boolean = true;
let state: string = 'loading';
let isPlaying: boolean | null = null;
let loadVideo: boolean | null = null;
let youtubeObject: { pause: () => void; playVideo: () => void; };
let emit = defineEmits<{
    (e: string, i:boolean): void
}>();

watch(() => props.src, watchVideo);
watch(() => props.source, watchMediafunction);

watch(() => props.trigger, watchTriggerfunction);


function watchVideo () {

  start();

}

function watchMediafunction () {
  start();
}

function watchTriggerfunction () {

  toggle();

}

watch(() => realElement.value, watchElement);

function watchElement () {

  console.log('refs changed');

}

onMounted(() => {

  start();
  bind();


});

function bind (this: any) {

  if (this.realElement) {

    this.DOM.onElement('playing', realElement, () => {

      this.isPlaying = true;
      this.$emit('playing', true);

    });

    this.DOM.onElement('pause', realElement, () => {

      isPlaying = false;
      emit('playing', false);

    });

    this.DOM.onElement('ended', realElement, () => {

      isPlaying = false;
      emit('ended', true);

    });

  }

}

function toggle (this: any) {

  if (props.preload === 'none' && !loadVideo) {

    loadVideo = true;
    nextTick(() => {

      bind();
      start();

    });
    return false;

  }

  if (props.preview) return false;

  if (videoType.value === 'basic') {

    if (!this.$refs?.videoElement) return false;

    if (isPlaying) {

      this.$refs?.videoElement.pause();

    } else {

      if (props.attributes?.includes('unmuted')) {

        this.$refs.videoElement.muted = false;

      }

      this.$refs?.videoElement.play();

    }

  }

  if (videoType.value === 'youtube') {

    if (isPlaying) {

      youtubeObject.pause();

    } else {

      youtubeObject.playVideo();

    }

  }

  return true;

}

function start (this: any) {

  if (videoType.value === 'youtube') return;

  console.log(this.$refs?.videoElement, this.$refs, this.src);

  nextTick()
    .then(() => {

      if (!this.$refs?.videoElement || !props.src) return nextTick();

      const current = this.$el.querySelector('source[src]');
      const allSource = this.$el.querySelectorAll('source');
      let newSource = this.$el.querySelector(`.${media.value}`);

      // eslint-disable-next-line prefer-destructuring
      if (allSource.length === 1) newSource = allSource[0];

      if (current) current.removeAttribute('src');
      if (newSource) newSource.setAttribute('src', newSource.getAttribute('data-src'));

      return nextTick();

    })
    .then(() => {


      if (typeof this.$refs?.videoElement?.load !== 'function') return;
      this.$refs?.videoElement?.load();

      if (props.attributes?.includes('play')) {

        this.$refs?.videoElement.play();

      }

      if (props.attributes?.includes('muted')) {

        this.$refs.videoElement.volume = 0;
        this.$refs.videoElement.muted = true;

      }

    });

}

const media = computed(() => {

  return this.$store?.state.media;

});
const realElement = computed(() => {

  return this.$refs.videoElement as HTMLMediaElement;

});
const videoType = computed(() => {

  return props.src?.match('^https://(www.)?youtube.com') ? 'youtube' : 'basic';

});
const youtubeId = computed(() => {

  if (videoType.value !== 'youtube') return false;

  return getIdFromURL(props.src);

});
const youtubeSettings = computed(() => {

  if (videoType.value !== 'youtube') return false;

  return {
    'video-id'     : youtubeId,
    'player-width' : '100%',
    'player-height': '100%',
    'player-vars'  : {
      autoplay      : props.attributes?.includes('autoplay') ? 1 : 0,
      controls      : props.attributes?.includes('controls') ? 1 : 0,
      loop          : props.attributes?.includes('loop') ? 1 : 0,
      modestbranding: 1,
      rel           : 0,
    },
    host: 'https://www.youtube-nocookie.com',
  };

});
const realSrc = computed(() => {

  if (videoType.value === 'youtube') {

    const url = new URL(props.src);
    const videoId = url.searchParams.get('v');

    return props.js
      ? videoId
      : `https://www.youtube-nocookie.com/embed/${videoId}`;

  }

  return props.src;

});

function ready (event: { target: any; }) {

  youtubeObject = event.target;

}

function playing () {

  isPlaying = true;
  emit('playing', true);

}

function paused () {

  isPlaying = false;
  emit('playing', false);

}

function ended () {

  isPlaying = false;
  emit('ended', false);

}

</script>
<style lang="less">


.lila-video-partial {
  display: grid;
  max-width: 100%;

  &:hover {
    cursor: pointer;
  }

  video,
  .preload-placeholder {
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
