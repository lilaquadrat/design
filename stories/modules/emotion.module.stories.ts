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
    intro: 'STUDIO steht f??r einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgeb??hr beinhaltet f??nf volle Jahre Support von zertifizierten Mitarbeitern. ',
    text: [
      // eslint-disable-next-line max-len
      'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein pers??nlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, h??lt sich an Absprachen und k??mmert sich innerhalb fixierter Zeiten um eine L??sung.',
      // eslint-disable-next-line max-len
      'Ein pers??nlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, h??lt sich an Absprachen und k??mmert sich innerhalb fixierter Zeiten um eine L??sung.',
      // eslint-disable-next-line max-len
      'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht f??r sich und arbeitet unabh??ngig und immer zuverl??ssig ??? egal ob als installierbare Version f??r den Computer oder als App f??r Android und iOS (in K??rze erh??ltlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht f??r sich und arbeitet unabh??ngig und immer zuverl??ssig ??? egal ob als installierbare Version f??r den Computer oder als App f??r Android und iOS (in K??rze erh??ltlich). ',
    ],
  },
  background: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  variant: ['textBackground', 'variant1', 'content-inline'],
};

export const empty = Template.bind({});

empty.args = {};
