export default {
  title: 'Basics/Video',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    attributes: {
      control: {
        type: 'multi-select',
      },
      options: [
        'autoplay',
        'unmuted',
        'loop',
        'controls',
      ],
    },
  },
};

const template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-video-partial v-bind="$props">{{$props.text}}</lila-video-partial>',
});

export const basic = template.bind({});

basic.args = {
  src: './video.mp4',
  attributes: ['autoplay', 'mute'],
};

export const controls = template.bind({});

controls.args = {
  src: './video.mp4',
  attributes: ['autoplay', 'mute', 'controls'],
};

export const withPoster = template.bind({});

withPoster.args = {
  src: './video.mp4',
  poster: '/900.png',
};
