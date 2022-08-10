export default {
  title: 'Modules/Emotion',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'scrollNotice',
          'bright',
          'dark',
          'variant1',
          'picture-switch',
          'content-inline',
          'textBackground',
          'height50',
          'height80',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-emotion-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  textblock: {
    headline: 'some headline',
    subline: 'subline',
  },
  background: {
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
    copyright: 'copyright text',
    source: [
      {
        media: 'only screen and (min-width: 600px)',
        src: 'women2.jpg',
        file: {
          id: 'df',
          filename: 'd',
          src: 'women2.jpg',
          thumb: 'd',
        },
      },
      {
        media: 'only screen and (min-width: 900px)',
        src: 'women3.jpg',
        file: {
          id: '',
          filename: '',
          src: 'women3.jpg',
          thumb: '',
        },
      },
      {
        media: 'only screen and (min-width: 1200px)',
        src: 'women1.jpg',
        file: {
          id: '',
          filename: '',
          src: 'women1.jpg',
          thumb: '',
        },
      },
    ],
  },
  variant: ['bright'],
  links: [
    {
      link: 'http:///test',
      text: 'SOME LINK',
      variant: ['callToAction'],
    },
    {
      link: '#more',
      text: 'show me more',
      variant: ['more'],
    },
    {
      link: 'http://',
      text: 'normal link',
    },
  ],
};

export const textCentered = Template.bind({});

textCentered.args = {
  textblock: {
    headline: 'some headline',
    subline: 'subline',
  },
  background: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
    copyright: 'copyright text',
  },
  variant: ['bright', 'variant1'],
  links: [
    {
      link: 'http:///test',
      text: 'SOME LINK',
      variant: ['callToAction'],
    },
    {
      link: 'http://',
      text: 'normal link',
    },
  ],
};

export const withPicture = Template.bind({});

withPicture.args = {
  textblock: {
    headline: 'some headline',
    subline: 'subline',
  },
  background: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
    copyright: 'copyright text',
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: '/logo_192x192.png',
  },
  variant: ['bright', 'variant1'],
  links: [
    {
      link: 'http:///test',
      text: 'SOME LINK',
      variant: ['callToAction'],
    },
    {
      link: '#more',
      text: 'show me more',
      variant: ['more'],
    },
  ],
};

export const inlineContent = Template.bind({});

inlineContent.args = {
  textblock: {
    headline: 'some headline',
    subline: 'subline',
  },
  background: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['bright', 'content-inline'],
  links: [
    {
      link: 'http:///test',
      text: 'SOME LINK',
      variant: ['callToAction'],
    },
    {
      link: '#more',
      text: 'show me more',
      variant: ['more'],
    },
  ],
};

export const textBackground = Template.bind({});

textBackground.args = {
  textblock: {
    headline: 'some headline',
    subline: 'subline',
    // eslint-disable-next-line max-len
    intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
    text: [
      // eslint-disable-next-line max-len
      'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      // eslint-disable-next-line max-len
      'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      // eslint-disable-next-line max-len
      'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    ],
  },
  background: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['textBackground', 'variant1', 'content-inline'],
};
