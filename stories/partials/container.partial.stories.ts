import dayjs from 'dayjs';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';

/* eslint-disable max-len */
export default {
  title: 'Container',
  argTypes: {
    mode: { control: { type: 'select' }, options: ['presentation', 'content'] },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  // eslint-disable-next-line no-template-curly-in-string
  template: '<lila-content-module :content="$props"></lila-content-module>',
});

export const presentation = Template.bind({});

presentation.args = prepareContent({
  settings: {
    mode: 'presentation',
  },
  modules: [
    {
      type: 'emotion-module',
      textblock: {
        headline: 'some headline',
        subline: 'subline',
      },
      background: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
        copyright: 'copyright text',
      },
      variant: ['bright', 'variant1'],
      links: [
        {
          link: 'http:///test',
          text: 'SOME LINK',
          variant: ['callToAction'],
        },
        {
          link: 'http://',
          text: 'normal link',
        },
      ],
    },
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
      type: 'quote-module',
      quote: 'TRANSPARENT',
      link: {
        text: 'lilaquadrat.de',
        link: 'https://lilaquadrat.de',
      },
      citation: 'lilaquadrat',
      variant: ['authCenter', 'quoteCenter', 'small'],
    },
    {
      type: 'facts-module',
      textblock: {
        headline: 'Some nice Headline',
        subline: 'Some nice subline',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      elements: [
        {
          textblock: {
            subline: 'some fact',
            text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
          },
        },
        {
          textblock: {
            subline: 'second fact',
            text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
          },
        },
        {
          textblock: {
            subline: 'third fact',
            text: [
              'Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
              'Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
              'Nisi est sit amet facilisis magna.',
            ],
          },
        },
      ],
      variant: ['variant1'],
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
    {
      type: 'faq-module',
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
    },
    {
      type: 'quellcode-module',
      code: '<!DOCTYPE html>\n<title>Title</title>\n<body>\n    <p checked class="title" id="title">Title</p>\n    <!-- here goes the rest of the page -->\n</body>',
      headline: 'HTML',
      subline: 'This is HTML',
      intro: 'HTML Quellcode',
      text: ['Dies ist das Quellcode Modul.',
        'Hier wird der Quellcode automatisch erkannt und eingefärbt.'],
      variant: ['darkmode', 'center'],
    },
    {
      type: 'picture-module',
      textblock: {
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women2.jpg',
      },
    },
    {
      type: 'index-module',
      index: {
        value: [
          {
            text: 'Link with some longer text',
            link: 'https://testlink',
          },
          {
            text: 'Normal link',
            link: 'https://testlink',
          },
          {
            text: 'Link 3',
            link: 'https://testlink',
          },
          {
            text: 'Link 4',
            link: 'https://testlink',
          },
        ],
        title: 'Some nice Index',
      },
      legend: {
        text: [
          'some legend #1',
          'some legend #2',
          'some legend #3',
        ],
      },
    },
    {
      type: 'gallery-module',
      textblock: {
        headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant: [],
      elements: [
        {
          picture: {
            source: [],
            alt: 'IMAGE ALT',
            src: 'women3.jpg',
          },
          textblock: {
            // eslint-disable-next-line max-len
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
          },
        },
        {
          picture: {
            source: [],
            alt: 'IMAGE ALT',
            src: 'women2.jpg',
          },
          textblock: {
            // eslint-disable-next-line max-len
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
          },
        },
      ],
    },
    {
      type: 'cookies-module',
      textblock: {
        intro: 'cookies',
        text: [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      variant: ['overlay'],
    },
    {
      type: 'footer-module',
      legal: 'some legal information',
      social: {
        title: 'Social',
        elements: [
          {
            link: {
              link: 'https://fb.com',
            },
            picture: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'icon-32x32.png',
            },
          },
        ],
      },
      contact: {
        title: 'Contact',
        link: {
          text: 'Call us: +012283838',
          link: 'tel:012222',
        },
      },
      sitemap: [
        {
          title: 'Sitemap 1',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title: 'Sitemap 2',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title: 'Sitemap 3',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
      ],

    },
  ],
});

export const content = Template.bind({});

content.args = prepareContent({
  settings: { mode: 'content' },
  modules: [
    {
      type: 'blog-intro-module',
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline: 'Der Support ist inklusive.',
        intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
      },
      author: 'Max Mustermann',
      date: dayjs().format('DD.MM.YYYY'),
    },
    {
      type: 'text-module',
      text: [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type: 'picture-module',
      textblock: {
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      picture: {
        source: [],
        alt: 'IMAGE ALT',
        src: 'women1.jpg',
        copyright: '© lilaquadrat',
      },
      variant: ['small'],
    },
    {
      type: 'text-module',
      text: [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      ],
    },
    {
      type: 'text-module',
      subline: 'Der Support ist inklusive.',
      text: [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type: 'gallery-module',
      textblock: {
        headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant: [],
      elements: [
        {
          picture: {
            source: [],
            alt: 'IMAGE ALT',
            src: 'women1.jpg',
          },
        },
        {
          picture: {
            source: [],
            alt: 'IMAGE ALT',
            src: 'women1.jpg',
          },
        },
      ],
    },
    {
      type: 'text-module',
      subline: 'Jedes Anliegen verdient gehör.',
      text: [
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type: 'footer-module',
      legal: 'some legal information',
      social: {
        title: 'Social',
        elements: [
          {
            link: {
              link: 'https://fb.com',
            },
            picture: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'icon-32x32.png',
            },
          },
        ],
      },
      contact: {
        title: 'Contact',
        link: {
          text: 'Call us: +012283838',
          link: 'tel:012222',
        },
      },
      sitemap: [
        {
          title: 'Sitemap 1',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title: 'Sitemap 2',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title: 'Sitemap 3',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
      ],

    },
    {
      type: 'cookies-module',
      textblock: {
        intro: 'cookies',
        text: [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      variant: ['overlay', 'overlayRight'],
    },
  ],
});

export const training = Template.bind({});

training.args = prepareContent({
  settings: { mode: 'content' },
  modules: [
    {
      type: 'training-module',
      variant: [],
      childData: {
        index: [
          'video1',
          'video2',
          'content1',
          'video3',
        ],
        data: {},
      },
    },
  ],
  childData: {
    index: [
      'video1',
      'video2',
      'content1',
      'video3',
    ],
    data: {
      video1: {
        settings: {
          title: 'Video #1 Title',
          description: 'Description for Video #1',
          mode: 'content',
        },
        modules: [
          {
            type: 'text-module',
            headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
            subline: 'Der Support ist inklusive.',
            // eslint-disable-next-line max-len
            intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
            variant: [],
          },
          {
            type: 'video-module',
            video: {
              src: 'video.mp4',
            },
            poster: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'women1.jpg',
            },
            textblock: {
              headline: 'VIDEO1',
              subline: 'play this video',
            },
            variant: [],
          },
          {
            type: 'video-module',
            video: {
              src: 'video.mp4',
            },
            poster: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'women1.jpg',
            },
            textblock: {
              headline: 'VIDEO1',
              subline: 'play this video',
            },
            variant: [],
          },
          {
            type: 'text-module',
            headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
            subline: 'Der Support ist inklusive.',
            // eslint-disable-next-line max-len
            intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
            variant: [],
          },
          {
            type: 'text-module',
            headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
            subline: 'Der Support ist inklusive.',
            // eslint-disable-next-line max-len
            intro: 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
            variant: [],
          },
          {
            type: 'video-module',
            video: {
              src: 'video.mp4',
            },
            poster: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'women1.jpg',
            },
            textblock: {
              headline: 'VIDEO1',
              subline: 'play this video',
            },
            variant: [],
          },
        ],
      },
      content1: {
        settings: {
          title: 'Content #1 Title',
          description: 'Description for Content #1',
        },
        modules: [
          {
            type: 'video-module',
            video: {
              src: 'video.mp4',
            },
            poster: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'women1.jpg',
            },
            textblock: {
              headline: 'VIDEO1',
              subline: 'play this video',
            },
            variant: [],
          },
        ],
      },
      video2: {
        settings: {
          title: 'Video #2 Title',
          description: 'Description for Video #2',
        },
        modules: [
          {
            type: 'video-module',
            video: {
              src: 'video.mp4',
            },
            poster: {
              source: [],
              alt: 'IMAGE ALT',
              src: 'women1.jpg',
            },
            textblock: {
              headline: 'VIDEO3',
              subline: 'play this video',
            },
            variant: [],
          },
        ],
      },
    },
  },
});
