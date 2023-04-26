import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Cookies',
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
  template: '<section><portal-target name="util" multiple /><lila-cookies-module v-bind="$props"></lila-cookies-module></section>',
});

export const module = Template.bind({});

module.args = {
  textblock: {
    headline: 'Cookie-Richtlinie',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  variant: [],
};

export const overlay = Template.bind({});

overlay.args = {
  textblock: {
    intro: 'Cookie-Richtlinie',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  variant: ['overlay'],
};
