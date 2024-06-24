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
        title: 'Follow up Details',
        variant:['noIcon']
      },
    },
    {
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
        variant:['noIcon']
      },
    },
    {
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
        variant:['noIcon']
      },
    },

    {
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
          {
            text: 'Link with some longer text',
            link: 'https://testlink',
          },
          {
            text: 'Normal link',
            link: 'https://testlink',
          },
          {
            text: 'Link with some longer text',
            link: 'https://testlink',
          },
          {
            text: 'Normal link',
            link: 'https://testlink',
          },
        ],
        title: 'Details',
        variant:['noIcon']
      },
    },
    {
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
        title: 'sitemap',
        variant:['noIcon']
      },
    },
   ],
   variant: ['noPicture']
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
  textblock: {
    // headline: 'headline',
    // subline: 'subline',
    intro: 'Kontakt',
    text: [
      'Streetnane of company Postcode Streetname Number',
      'Postcode Streetname'
    ],
  },
  list: {
    value: [
      'This is a list item',
      'this an other list item',
      'I am a third list item',
    ],
    title: 'some nice list',
  },
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
    variant:['noIcon']
  },
  sitemap: [
    {
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
        variant:['noIcon']
      },
    },
    {
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
        variant:['noIcon']
      },
    },
    {
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
        variant:['noIcon']
      },
    },
    {
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
        variant:[]
      },
    },
  ],
  variant: ['footerWithIcon'],
};
