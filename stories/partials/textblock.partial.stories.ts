export default {
  title: 'Basics/Textblock',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: { controls: { type: 'array' } },
  },
};

const Template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-textblock-partial v-bind="$props">{{$props.slotData}}</lila-textblock-partial>',
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
};
