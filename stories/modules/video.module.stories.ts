export default {
  title: 'Modules/Video',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: ['small', 'middle', 'fullscreen'],
      },
    },
    js: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<video-module v-bind="$props"></video-module>',
});

export const basic = Template.bind({});

basic.args = {
  video: {
    src: 'video.mp4',
  },
  textblock: {},
  variant: [],
};

export const withPoster = Template.bind({});

withPoster.args = {
  video: {
    src: 'video.mp4',
  },
  poster: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  textblock: {
    headline: 'Some Headline for this Video',
    subline: 'play this video',
  },
  variant: [],
};

export const withControls = Template.bind({});

withControls.args = {
  video: {
    src: 'video.mp4',
    attributes: ['controls'],
  },
  poster: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  textblock: {
    headline: 'Some Headline for this Video',
    subline: 'play this video',
  },
};
