import getVariants from '../../src/mixins/getVariants';

export default {
  title: 'Modules/Picture',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: getVariants('picture'),
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-picture-module v-bind="$props" />',
});

export const basic = Template.bind({});


basic.args = {
  textblock: {
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
};

export const variant = Template.bind({});

variant.args = {
  textblock: {
    headline: 'some headline',
    subline: 'subline',
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['variant1'],
};

export const textVertical = Template.bind({});

textVertical.args = {
  textblock: {
    headline: 'some headline',
    text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['textPictureVertical'],
};

export const fullscreenOverlay = Template.bind({});

fullscreenOverlay.args = {
  textblock: {
    headline: 'some headline',
    text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['fullscreenOverlayEnabled'],
};
