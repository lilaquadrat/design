import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Prices',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: getVariants('prices'),
      },
    },
    links: {
      control: { type: 'object' },
    },
    list: {
      control: { type: 'object' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-prices-module v-bind="$props"></lila-prices-module>',
});

export const basic = Template.bind({});

basic.args = {
  content: {},
  variant: [],
  textblock: {
    headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
    subline: 'Der Support ist inklusive.',
    // eslint-disable-next-line max-len
    intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
  },
  elements: [
    {
      price: '149€',
      interval: '/month',
      textblock: {
        headline: 'Einsteiger.',
        intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit.',
      },
      facts: [
        // eslint-disable-next-line max-len
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        // eslint-disable-next-line max-len
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        // eslint-disable-next-line max-len
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
      more: {
        link: 'somelink',
        text: 'i want to know more',
      },
    },
    {
      price: '1049€',
      interval: '/month',
      textblock: {
        headline: 'Standard.',
        intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit.',
        text: [
          // eslint-disable-next-line max-len
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      facts: [
        'Fact 1',
        'Fact 2',
        'Fact 3',
        'Fact 4',
      ],
      callToAction: {
        link: 'somelink',
        text: 'Call to Action',
      },
      variant: ['highlight'],
    },
    {
      price: '49€',
      interval: '/month',
      textblock: {
        headline: 'Einsteiger Plus',
        intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit.',
        text: [
          // eslint-disable-next-line max-len
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      facts: [
        // eslint-disable-next-line max-len
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        // eslint-disable-next-line max-len
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        // eslint-disable-next-line max-len
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
      more: {
        link: 'somelink',
        text: 'i want to know more',
      },
    },
  ],
};
