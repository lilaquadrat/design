export default {
  title: 'Modules/Gallery',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'fullscreen',
          'variant2',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<gallery-module v-bind="$props" />',
});

export const basic = Template.bind({});
basic.args = {
  textblock: {
    // eslint-disable-next-line max-len
    headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  variant: [],
  elements: [
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
    },
  ],
};

export const multiPictures = Template.bind({});
multiPictures.args = {
  textblock: {
    // eslint-disable-next-line max-len
    headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  variant: [],
  elements: [
    {
      pictures: [
        {
          source: [],
          alt: 'IMAGE ALT',
          src: 'women1.jpg',
        },
        {
          source: [],
          alt: 'IMAGE ALT',
          src: 'women2.jpg',
        },
        {
          source: [],
          alt: 'IMAGE ALT',
          src: 'women3.jpg',
        },
      ],
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
    },
    {
      pictures: [
        {
          source: [],
          alt: 'IMAGE ALT',
          src: 'women1.jpg',
        },
        {
          source: [],
          alt: 'IMAGE ALT',
          src: 'women2.jpg',
        },
        {
          source: [],
          alt: 'IMAGE ALT',
          src: 'women3.jpg',
        },
      ],
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
    },
  ],
};

export const noDescription = Template.bind({});
noDescription.args = {
  textblock: {
    // eslint-disable-next-line max-len
    headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  variant: [],
  elements: [
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
    },
  ],
};

export const elementIndicator = Template.bind({});
elementIndicator.args = {
  textblock: {
    // eslint-disable-next-line max-len
    headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  variant: ['variant2'],
  elements: [
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
      textblock: {
        headline: 'Lorem ipsum ',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
      textblock: {
        headline: 'eiusmod tempor',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
      textblock: {
        headline: 'tempor incididunt ut',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
      textblock: {
        headline: 'consectetur adipiscing',
      },
    },
  ],
};
