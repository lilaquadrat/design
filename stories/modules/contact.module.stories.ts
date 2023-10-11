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
    mode: {
      options: ['form', 'feedback'],
      control: { type: 'radio' },
      default: 'form',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-contact-module :editor="{modes: $props.mode }" v-bind="$props" />',
});

export const reservation = Template.bind({});

reservation.args = {
  textblock: {
    headline: 'Reserve your spot',
    text: ['Welcome to our online ticket reservation platform. Whether you re planning a night out at the theater, attending a concert, or looking forward to a sports event, securing your tickets has never been easier. Our user-friendly form ensures a smooth reservation experience, allowing you to secure your spot at your desired event in just a few clicks.'],
  },
  categoryTextblock: {
    headline: 'Select your Category',
    text: ['You can decide which category you want to use.'],
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
        mode: 'reservation',
        categories: [
          {
            id: 'id-base',
            name: 'Base',
            description: 'Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten.',
            amount: 10,
            available: true,
            price: {
              currency: '€',
              amount: 15,
              tax: 19,
            },
          },
          {
            id: 'id-anfrage',
            name: 'Anfrage',
            amount: 0,
            available: true,
            price: {
              currency: '€',
              amount: 0,
              tax: 19,
            },
          },
          {
            id: 'id-hilfe',
            name: 'Hilfe',
            description: 'Ich stimme zu, dass meine persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) verarbeitet werden dürfen.',
            amount: 0,
            available: true,
            price: {
              currency: '€',
              amount: 3.99,
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
      2: {
        modules: [
          {
            type: 'text-module',
            headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
            subline: 'Der Support ist inklusive.',
            intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
            text: [
              'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
              'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
              'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
            ],
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
          },
          {
            type: 'picture-module',
            textblock: {
              headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
              intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
            },
            picture: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'women2.jpg',
            },
            variant: ['textPictureVertical'],
          },
        ],
      },
    },
    lists: [1],
    editor: [2],
  },
};

export const contact = Template.bind({});

contact.args = {
  textblock: {
    headline: 'Contact Module',
    text: ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
  },
  categoryTextblock: {
    headline: 'Select your Category',
    text: ['You can decide which category you want to use.'],
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
            name: 'Base',
            description: 'Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten.',
            amount: 10,
            available: true,
            price: {
              currency: '€',
              amount: 15,
              tax: 19,
            },
          },
          {
            id: 'id-anfrage',
            name: 'Anfrage',
            amount: 0,
            available: true,
            price: {
              currency: '€',
              amount: 0,
              tax: 19,
            },
          },
          {
            id: 'id-hilfe',
            name: 'Hilfe',
            description: 'Ich stimme zu, dass meine persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) verarbeitet werden dürfen.',
            amount: 0,
            available: true,
            price: {
              currency: '€',
              amount: 3.99,
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
