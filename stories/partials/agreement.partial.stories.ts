export default {
  title: 'Forms/Agreements',
  parameters: {
    layout: 'centered'
  },
};

const template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-agreement-partial v-bind="$props" v-model="$props.value">Ich stimme zu, dass meine persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) verarbeitet werden dürfen. Ich habe die Datenschutzrichtlinie gelesen und verstanden.</lila-agreement-partial>',
});

export const basic = template.bind({});

basic.args = {
  // eslint-disable-next-line max-len
  contentId: 'contact-dsgvo',
  predefined: true,
  latest: true,
  value: false
};
