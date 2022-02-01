export default {
  title: 'Modules/Compare',
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-compare-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  structure: [
    {
      headline: 'Structure #1',
      description: 'some description',
      list: [
        'Feature #1',
        'Feature #2',
        'Feature #3',
      ],
    },
    {
      headline: 'Structure #2',
      description: 'some structure with a extended description',
      list: [
        'Feature is longer #1',
        'Feature is quite longer #2',
        'Feature #3',
      ],
    },
    {
      headline: 'Structure #3',
      description: 'some description',
      list: [
        'Feature #1',
        'Feature #2',
        'Feature #3',
      ],
    },
  ],
  elements: [
    {
      headline: 'Element #1',
      description: 'some description',
      elements: [
        [
          'yes',
          'yes',
          'no',
        ],
        [
          'depends',
          'content',
          '25',
        ],
        [
          'n/a',
          'n/a',
          'n/a',
        ],
      ],
    },
    {
      headline: 'Element #2',
      description: 'some longer element description',
      elements: [
        [
          'no',
          'no',
          'no',
        ],
        [
          'yes',
          'yes',
          'yes',
        ],
        [
          '',
          'yes',
          'empty',
        ],
      ],
    },
  ],
  textblock: {
    headline: 'Some nice Headline',
    subline: 'Some nice subline',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
};
