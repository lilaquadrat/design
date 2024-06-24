import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Footer',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: { control: { type: 'object' } },
    variant: {
      control: {
        type: 'multi-select',
      },
      options: getVariants('footer'),
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-footer-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  legal: 'some legal information',
  social: {
    title: 'Social',
    elements: [
      {
        link: {
          link: 'https://fb.com',
        },
        picture: {
          source: [],
          alt: 'IMAGE ALT',
          src: 'icon-32x32.png',
        },
      },
      {
        link: {
          link: 'https://twitter.com',
        },
        picture: {
          source: [],
          alt: 'IMAGE ALT',
          src: 'icon-32x32.png',
        },
      },
    ],
  },
  contact: {
    title: 'Contact',
    link: {
      text: 'Call us: +012283838',
      link: 'tel:012222',
    },
  },
  sitemap: [
    {
      title: 'Sitemap 1',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 2',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
  ],
};

export const footerWithIcon = Template.bind({});

footerWithIcon.args = {
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'logo_512x512.png',
  },
  legal: 'Terms of privacy',
  social: {
    title: 'Follow us',
    elements: [
      {
        link: {
          link: 'https://fb.com',
        },
        picture: {
          source: [],
          alt: 'IMAGE ALT',
          src: 'icon-32x32.png',
        },
      },
      {
        link: {
          link: 'https://twitter.com',
        },
        picture: {
          source: [],
          alt: 'IMAGE ALT',
          src: 'icon-32x32.png',
        },
      },
      {
        link: {
          link: 'https://fb.com',
        },
        picture: {
          source: [],
          alt: 'IMAGE ALT',
          src: 'icon-32x32.png',
        },
      },
      {
        link: {
          link: 'https://fb.com',
        },
        picture: {
          source: [],
          alt: 'IMAGE ALT',
          src: 'icon-32x32.png',
        },
      },
    ],
  },
  contact: {
    title: 'Contact',
    link: {
      text: 'Call us: +012283838',
      link: 'tel:012222',
    },
  },
  information: {
    textblock: {
      // headline: 'headline',
      // subline: 'subline',
      intro: 'Kontakt',
      text: [
        'Streetnane of company Postcode Streetname Number',
        'Postcode Streetname'
      ],
    },
    // list: {
    //   title: 'Liste',
    //   elements: [
    //     'At vero eos',
    //     'et accusam et justo',

    //   ],
    // },
    // links: {
    //   title: 'Links',
    //   elements: [
    //     {
    //       text: 'SEE ON MAP',
    //       link: '/test',
    //     },
    //     {
    //       text: '+03456789012283838',
    //       link: '/test',
    //     },
    //   ],
    // },
  },
  sitemap: [
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },
    {
      title: 'Sitemap 3',
      elements: [
        {
          text: 'Link #1',
          link: '/test',
        },
        {
          text: 'Link #2',
          link: '/test',
        },
        {
          text: 'Link #3',
          link: '/test',
        },
        {
          text: 'Link #4',
          link: '/test',
        },
        {
          text: 'Link #5',
          link: '/test',
        },
      ],
    },

  ],
  variant: ['footerWithIcon'],
};
