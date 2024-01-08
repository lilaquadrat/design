<script setup lang="ts">
import { computed } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import type { Content } from '@lilaquadrat/studio/lib/interfaces';
import dayjs from 'dayjs';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode: 'presentation'
  },
  state  : 'publish',
  modules: [
    // {
    //   type     : 'blog-intro-module',
    //   textblock: {
    //     headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
    //     subline : 'Der Support ist inklusive.',
    //     intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
    //   },
    //   picture: {
    //     source: [],
    //     alt   : 'IMAGE ALT',
    //     src   : 'women1.jpg',
    //   },
    //   author: 'Max Mustermann',
    //   date  : dayjs().format('DD.MM.YYYY'),
    // },
    {
      type     : 'contact-module',
      textblock: {
        headline: 'Reserve your spot',
        text    : ['Welcome to our online ticket reservation platform. Whether you re planning a night out at the theater, attending a concert, or looking forward to a sports event, securing your tickets has never been easier. Our user-friendly form ensures a smooth reservation experience, allowing you to secure your spot at your desired event in just a few clicks.'],
      },
      categoryTextblock: {
        headline: 'Select your Category',
        text    : ['You can decide which category you want to use.'],
      },
<<<<<<< HEAD
      author: 'Max Mustermann',
      date  : dayjs().format('DD.MM.YYYY'),
    },
    {
      type    : 'text-module',
      headline: 'Some headline',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type     : 'picture-module',
      textblock: {
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
        copyright: '© lilaquadrat',
      },
      variant: ['small'],
    },
    {
      type    : 'text-module',
      headline: 'some headline',
      subline : 'some subline',
      intro   : 'some intro',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      ],
    },
    {
      type   : 'text-module',
      subline: 'Der Support ist inklusive.',
      text   : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : [],
      elements: [
        {
          textblock: {
            headline: 'some headline',
            subline : 'some subline',
            intro   : 'some intro',
          },
          picture: {
            source: [],
            alt   : 'IMAGE ALT',
            src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
=======
      variant    : [],
      genericData: {
        data: {
          1: {
            _id        : '6464c12d074ca92142352b64',
            name       : 'Neue Liste Test',
            description: 'gute beschreibung1212',
            payment    : 'optional',
            state      : 'open',
            mode       : 'contact',
            categories : [
              {
                id    : 'standard',
                name  : 'standard',
                amount: 15,
                price : {
                  currency: 'euro',
                  amount  : 45,
                  tax     : 19,
                },
              },
            ],
            company: 'company',
            project: 'project',
            history: {
              version: 18,
              created: '2023-05-17T11:57:33.982Z',
              source : 'lists-app',
              updated: '2023-10-20T15:06:10.507Z',
            },
            participants: {
              max      : 15,
              confirmed: 2,
              available: true,
            },
            agreements: [
              {
                contentId : 'contact-dsgvo',
                predefined: true,
                text      : 'Ich stimme zu, dass meine persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) verarbeitet werden dürfen. Ich habe die Datenschutzrichtlinie gelesen und verstanden.',
                required  : true,
              },
              {
                text     : 'adfasdf',
                contentId: 'layout-test',
                required : true,
              },
              {
                text     : 'sdrtfgrfgh',
                contentId: 'pdftest',
              },
            ],
          },
          2: {
            modules: [
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                text    : [
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
                type     : 'picture-module',
                textblock: {
                  headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                  intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
                },
                picture: {
                  source: [],
                  alt   : 'IMAGE ALT',
                  src   : 'women2.jpg',
                },
                variant: ['textPictureVertical'],
              },
            ],
>>>>>>> 8d3795d (update contact-module)
          },
        },
        lists : [1],
        editor: [2],
      },
    },
    // {
    //   type    : 'text-module',
    //   headline: 'Some headline',
    //   text    : [
    //     'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    //     'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    //   ],
    // },
    // {
    //   type     : 'picture-module',
    //   textblock: {
    //     intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    //   },
    //   picture: {
    //     source   : [],
    //     alt      : 'IMAGE ALT',
    //     src      : 'women1.jpg',
    //     copyright: '©lilaquadrat',
    //   },
    //   variant: ['small'],
    // },
    // {
    //   type: 'text-module',
    //   text: [
    //     'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //   ],
    // },
    // {
    //   type   : 'text-module',
    //   subline: 'Der Support ist inklusive.',
    //   text   : [
    //     'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    //     'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    //   ],
    // },
    // {
    //   type: 'gallery-module',
    //   textblock: {
    //     headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    //   },
    //   variant: [],
    //   elements: [
    //     {
    //       picture: {
    //         source: [],
    //         alt: 'IMAGE ALT',
    //         src: 'women1.jpg',
    //       },
    //     },
    //     {
    //       picture: {
    //         source: [],
    //         alt: 'IMAGE ALT',
    //         src: 'women1.jpg',
    //       },
    //     },
    //   ],
    // },
    // {
    //   type   : 'text-module',
    //   subline: 'Jedes Anliegen verdient gehör.',
    //   text   : [
    //     'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    //     'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    //     'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    //   ],
    // },
    // {
    //   type     : 'cookies-module',
    //   textblock: {
    //     intro: 'cookies',
    //     text : [
    //       'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //       'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
    //     ],
    //   },
    //   variant: ['overlay', 'overlayRight'],
    // },
    // {
    //   type  : 'footer-module',
    //   legal : 'some legal information',
    //   social: {
    //     title   : 'Social',
    //     elements: [
    //       {
    //         link: {
    //           link: 'https://fb.com',
    //         },
    //         picture: {
    //           source: [],
    //           alt   : 'IMAGE ALT',
    //           src   : 'icon-32x32.png',
    //         },
    //       },
    //       {
    //         link: {
    //           link: 'https://twitter.com',
    //         },
    //         picture: {
    //           source: [],
    //           alt   : 'IMAGE ALT',
    //           src   : 'icon-32x32.png',
    //         },
    //       },
    //     ],
    //   },
    //   contact: {
    //     title: 'Contact',
    //     link : {
    //       text: 'Call us: +012283838',
    //       link: 'tel:012222',
    //     },
    //   },
    //   sitemap: [
    //     {
    //       title   : 'Sitemap 1',
    //       elements: [
    //         {
    //           text: 'Link #1',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #2',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #3',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #4',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #5',
    //           link: '/test',
    //         },
    //       ],
    //     },
    //     {
    //       title   : 'Sitemap 2',
    //       elements: [
    //         {
    //           text: 'Link #1',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #2',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #3',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #4',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #5',
    //           link: '/test',
    //         },
    //       ],
    //     },
    //     {
    //       title   : 'Sitemap 3',
    //       elements: [
    //         {
    //           text: 'Link #1',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #2',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #3',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #4',
    //           link: '/test',
    //         },
    //         {
    //           text: 'Link #5',
    //           link: '/test',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};
const contentMerged = computed(() => prepareContent(content)); 

</script>

<template>
    <article class="content-screen screen">

        <lila-content-module linkMode="event" linkBase="/baseurl" :content="contentMerged" />

    </article>
</template>