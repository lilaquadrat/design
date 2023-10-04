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
      options: getVariants('contact'),
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
    headline: 'Contact Module',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  variant: [],
  genericData: {
    data: {
      1: {
        _id: '64e8a1d3d96549a0378c9d2a',
        name: 'Liste 12',
        description: 'fasfdd',
        payment: 'free',
        state: 'open',
        mode: 'contact',
        categories: [
          {
            id: 'id-base',
            name: 'base',
            amount: 0,
            available: true,
            price: {
              currency: '',
              amount: 0,
              tax: 19,
            },
          },
          {
            id: 'id-hilfe',
            name: 'hilfe',
            amount: 0,
            available: true,
            price: {
              currency: '',
              amount: 0,
              tax: 19,
            },
          },
          {
            id: 'id-anfrage',
            name: 'anfrage',
            amount: 0,
            available: true,
            price: {
              currency: '',
              amount: 0,
              tax: 19,
            },
          },
        ],
        agreements: [
          {
            contentId: 'contact-dsgvo',
            predefined: true,
            text: 'Ich stimme zu, dass meine persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) verarbeitet werden dürfen. Ich habe die Datenschutzrichtlinie gelesen und verstanden.',
            required: true,
          },
          {
            text: 'sdfasdf',
            contentId: '61e2de3585f79bcb5e58c518',
            required: true,
          },
          {
            text: 'bdfhg',
            contentId: '6213769a11814099b0ecc292',
          },
          {
            text: 'djhahjkjhdka',
            contentId: 'hallo',
          },
        ],
        company: 'lilaquadrat',
        project: 'homepage',
        history: {
          version: 4,
          created: '2023-08-25T12:42:59.228Z',
          source: 'lists-app',
          updated: '2023-08-25T16:24:16.289Z',
        },
      },
    },
    lists: [1],
  },
};
