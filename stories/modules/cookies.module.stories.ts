import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Cookies',
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
  template: '<lila-cookies-module v-bind="$props" />',
});

export const module = Template.bind({});

module.args = {
  textblock: {
    headline: 'Cookie-Richtlinie',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  variant: [],
};

export const overlayFull = Template.bind({});

overlayFull.args = {
  textblock: {
    intro: 'Cookie-Richtlinie',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  variant: ['overlay', 'overlayFull'],
};

export const overlayRight = Template.bind({});

overlayRight.args = {
  textblock: {
    intro: 'Cookie-Richtlinie',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  variant: ['overlay', 'overlayRight'],
};
