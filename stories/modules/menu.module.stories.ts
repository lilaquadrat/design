import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Menu',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: getVariants('menu'),
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-menu-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  name: 'Company',
  variant: [],
  elements: [
    {
      text: 'SOME Link',
      link: 'https://',
      icon: 'mouse',
    },
    {
      text: 'SOME Link',
      link: 'https://',
      icon: 'arrow-right',
    },
    {
      text: 'SOME Link',
      link: '/test',
      icon: 'mouse',
    },
  ],
};

export const logo = Template.bind({});

logo.args = {
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: '/logo_192x192.png',
  },
  variant: [],
  elements: [
    {
      text: 'SOME SUBLINK',
      icon: 'mouse',
      links: [
        {
          text: 'SOME LONG LINK IS LONG',
          link: 'https://',
        },
        {
          text: 'SOME Link',
          link: 'https://',
        },
      ],
    },
    {
      text: 'SOME Link',
      link: 'https://',
    },
    {
      text: 'SOME Link',
      link: 'https://',
    },
  ],
};

export const left = Template.bind({});

left.args = {
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: '/logo_192x192.png',
  },
  variant: ['left'],
  elements: [
    {
      text: 'SOME SUBLINK',
      links: [
        {
          text: 'SOME LONG LINK IS LONG',
          link: 'https://',
          icon: 'mouse',
        },
        {
          text: 'SOME Link',
          link: 'https://',
        },
      ],
    },
    {
      text: 'SOME Link',
      link: 'https://',
      icon: 'arrow-right',
    },
    {
      text: 'SOME Link',
      link: 'https://',
    },
  ],
};

export const color = Template.bind({});

color.args = {
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: '/logo_192x192.png',
  },
  variant: ['left', 'colorScheme1'],
  elements: [
    {
      text: 'SOME SUBLINK',
      links: [
        {
          text: 'SOME LONG LINK IS LONG',
          link: 'https://',
          icon: 'mouse',
        },
        {
          text: 'SOME Link',
          link: 'https://',
        },
      ],
    },
    {
      text: 'SOME Link',
      link: 'https://',
      icon: 'arrow-right',
    },
    {
      text: 'SOME Link',
      link: 'https://',
    },
  ],
};
