export default {
  title: 'Modules/Picturegroup',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'variant1',
          'variant2',
          'variant3',
          'variant4',
          'variant5',
          'small',
          'noText',
          'fullscreen',
          'contact',
          'color1',
          'color3',
          'product',
          'fit',
          'centerText',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-picturegroup-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  textblock: {
    headline: 'Some nice Picturegroup',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
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
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
    },
  ],
  variant: ['variant1'],
};

export const variant2 = Template.bind({});

variant2.args = {
  ...basic.args,
  elements: [
    ...basic.args.elements,
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
  ],
  variant: ['variant2'],
};

export const variant3 = Template.bind({});

variant3.args = {
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
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
  ],
  variant: ['variant3'],
};

export const variant4 = Template.bind({});

variant4.args = {
  elements: [
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
  ],
  variant: ['variant4'],
};

export const variant4WithText = Template.bind({});

variant4WithText.args = {
  elements: [
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        intro: 'Internal link',
      },
      link: {
        link: '/test',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        intro: 'External Link',
      },
      link: {
        link: 'http://google.com',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
  ],
  variant: ['variant4'],
};

export const variant4WithTextBackground = Template.bind({});

variant4WithTextBackground.args = {
  ...variant4WithText.args,
  textblock: {
    headline: 'some nice headline',
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
  variant: ['variant4', 'color1', 'centerText'],
};

export const variant5 = Template.bind({});

variant5.args = {
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
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
  ],
  variant: ['variant5'],
};

export const fitImages = Template.bind({});

fitImages.args = {
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
        src: '320.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'icon-32x32.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'icon-32x32.png',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
    },
  ],
  variant: ['variant5', 'fit'],
};

export const contact = Template.bind({});

contact.args = {
  elements: [
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        headline: 'Max Mustermann',
        subline: 'CTO',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      links: {
        title: 'Links',
        value: [
          {
            text: 'Phone: +49 176 55 47 49 45',
            link: 'tel:+49 176 55 47 49 45',
          },
          {
            text: 'E-Mail',
            link: 'mailto:max@mustermann.de',
          },
        ],
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        headline: 'Maxine Mustermann',
      },
      links: {
        title: 'Links',
        value: [
          {
            text: 'Phone: +49 176 55 47 49 45',
            link: 'tel:+49 176 55 47 49 45',
          },
          {
            text: 'E-Mail',
            link: 'mailto:max@mustermann.de',
          },
        ],
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        headline: 'Maxine Mustermann',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        headline: 'Maxine Mustermann',
        subline: 'CTO',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      links: {
        title: 'Links',
        value: [
          {
            text: 'Phone: +49 176 55 47 49 45',
            link: 'tel:+49 176 55 47 49 45',
          },
          {
            text: 'E-Mail',
            link: 'mailto:max@mustermann.de',
          },
        ],
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        headline: 'Maxine Mustermann',
        subline: 'CTO',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      links: {
        title: 'Links',
        value: [
          {
            text: 'Phone: +49 176 55 47 49 45',
            link: 'tel:+49 176 55 47 49 45',
          },
          {
            text: 'E-Mail',
            link: 'mailto:max@mustermann.de',
          },
        ],
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        headline: 'Max Mustermann #2',
        subline: 'CTO',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      links: {
        title: 'Links',
        value: [
          {
            text: 'Phone: +49 176 55 47 49 45',
            link: 'tel:+49 176 55 47 49 45',
          },
          {
            text: 'E-Mail',
            link: 'mailto:max@mustermann.de',
          },
        ],
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '320.png',
      },
      textblock: {
        // eslint-disable-next-line max-len
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
    },
  ],
  variant: ['contact', 'variant1', 'fit'],
};

export const product = Template.bind({});

product.args = {
  elements: [
    {
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: '650.png',
      },
      textblock: {
        headline: 'Max Mustermann',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      links: {
        value: [
          {
            text: 'buy this product',
            link: '#buy',
            variant: ['callToAction'],
          },
        ],
      },
    },
  ],
  variant: ['product'],
};
