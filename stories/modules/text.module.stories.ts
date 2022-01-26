export default {
  title: 'Modules/Text',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'center',
          'actions',
          'notice',
        ],
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
  template: '<text-module v-bind="$props"></text-module>',
});

export const basic = Template.bind({});

basic.args = {
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
        attributes: [],
      },
      {
        text: 'Normal link',
        link: 'https://testlink',
        attributes: [],
      },
    ],
    title: 'Follow up links',
  },
};

export const withActions = Template.bind({});

withActions.args = {
  ...basic.args,
  links: {
    value: [
      {
        text: 'Link with some longer text',
        link: 'https://testlink',
        attributes: [],
        variant: ['callToAction'],
      },
      {
        text: 'Normal link',
        link: 'https://testlink',
        attributes: [],
        variant: ['callToAction'],
      },
    ],
  },
  variant: ['actions'],
};

export const withLinksAndLinks = Template.bind({});

withLinksAndLinks.args = {
  ...withLinks.args,
  ...withList.args,
};

export const notice = Template.bind({});

notice.args = {
  ...basic.args,
  variant: ['notice'],
};
