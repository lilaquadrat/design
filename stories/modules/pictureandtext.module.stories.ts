export default {
  title: 'Modules/PictureAndText',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'variant1',
          'fit',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-pictureandtext-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  textblock: {
    headline: 'Some nice Picture and Text',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: [],
};

export const pictureRatio = Template.bind({});

pictureRatio.args = {
  textblock: {
    headline: 'Some nice Picture and Text',
    subline: 'Nice and short subline',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    text: [
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    ],
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'woman400x200.jpg',
  },
  variant: [],
};

export const variant = Template.bind({});

variant.args = {
  textblock: {
    headline: 'Some nice Picture and Text',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    text: [
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    ],
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['variant1'],
};

export const variantFitImage = Template.bind({});

variantFitImage.args = {
  textblock: {
    headline: 'Some nice Picture and Text',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    text: [
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    ],
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['variant1', 'fit'],
};

export const withList = Template.bind({});

withList.args = {
  ...basic.args,
  list: {
    value: [
      'Entry with some longer text',
      'Normal entry',
      'entry 3',
      'entry 4',
      'entry 5',
    ],
    title: 'some nice list',
  },
};

export const withLinks = Template.bind({});

withLinks.args = {
  ...basic.args,
  links: {
    value: [
      {
        text: 'Link with some longer text',
        link: 'https://testlink',
      },
      {
        text: 'Normal link',
        link: 'https://testlink',
      },
    ],
    title: 'Follow up links',
  },
};
