import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Faq',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: getVariants('faq'),
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-faq-module v-bind="$props"></lila-faq-module>',
});

export const basic = Template.bind({});

basic.args = {
  textblock: {
    headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
    subline: 'Der Support ist inklusive.',
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
    variant: [],
  },
  accordion: {
    openOnStart: 'first',
    elements: [
      {
        textblock: {
          headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
        },
      },
      {
        textblock: {
          headline: 'bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna?',
          text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
        },
      },
      {
        textblock: {
          headline: 'bibendum ut tristique et egestas quis. egestas quis. Nisi est sit amet facilisis magna. egestas quis. Nisi est sit amet facilisis magna. Nisi est sit amet facilisis magna?',
          text: ['Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, elit, Lorem ipsum dolor sit amet, sed do eiusmod  Lorem ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
        },
      },
      {
        textblock: {
          headline: 'incididunt ut labore et dolore magna aliqua. Arcu felis?',
          text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
        },
      },
    ],
  },
};
