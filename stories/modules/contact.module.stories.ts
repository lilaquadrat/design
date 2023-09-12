import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Contact',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: getVariants('cookies'),
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-contact-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  textblock: {
    headline: 'Cookie-Richtlinie',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  list: {
    value: [
      'entry 1',
      'entry 2',
    ],
    title: 'some nice list',
  },
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
  variant: [],
};
