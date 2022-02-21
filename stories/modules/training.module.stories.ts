export default {
  title: 'Modules/Training',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'offsetTop',
          'indexVariant',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-training-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
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
  variant: [],
};
