/* eslint-disable max-len */
export default {
  title: 'Modules/Facts',
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-facts-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  textblock: {
    headline: 'Some nice Headline',
    subline: 'Some nice subline',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  elements: [
    {
      textblock: {
        subline: 'some fact',
        // eslint-disable-next-line max-len
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'icon-32x32.png',
      },
      variant: ['fit'],
    },
    {
      textblock: {
        subline: 'second fact',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ],
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'icon-32x32.png',
      },
    },
    {
      textblock: {
        subline: 'third fact',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'icon-32x32.png',
      },
    },
  ],
};

export const variant = Template.bind({});

variant.args = {
  textblock: {
    headline: 'Some nice Headline',
    subline: 'Some nice subline',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  elements: [
    {
      textblock: {
        subline: 'some fact',
        // eslint-disable-next-line max-len
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      },
    },
    {
      textblock: {
        subline: 'second fact',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        subline: 'third fact',
        text: [
          'Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
          'Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
          'Nisi est sit amet facilisis magna.',
        ],
      },
    },
  ],
  variant: ['variant1'],
};

export const variant2 = Template.bind({});

variant2.args = {
  textblock: {
    headline: 'Some nice Headline',
    subline: 'Some nice subline',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  elements: [
    {
      textblock: {
        headline: 'some fact',
        // eslint-disable-next-line max-len
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'logo_512x512.png',
      },
      variant: ['fit'],
    },
    {
      textblock: {
        headline: 'second fact',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ],
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'logo_512x512.png',
      },
    },
    {
      textblock: {
        headline: 'third fact',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'logo_512x512.png',
      },
    },
  ],
  variant: ['variant2'],
};
