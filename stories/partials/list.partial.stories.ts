export default {
  title: 'Basics/List',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: [
        'numbered',
        'noStyle',
        'actions',
      ],
    },
    title: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-list-partial v-bind="$props">Links</lila-list-partial>',
});

export const TextOnly = Template.bind({});

TextOnly.args = {
  value: [
    'Entry with some longer text',
    // eslint-disable-next-line max-len
    'This is some very long text. Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
    'entry 3',
    'entry 4',
    'entry 5',
  ],
  variant: ['numbered'],
  title: 'Some nice list.',
};

export const Links = Template.bind({});

Links.args = {
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
};

export const Actions = Template.bind({});

Actions.args = {
  variant: ['actions'],
  value: [
    {
      text: 'First Action',
      link: 'https://testlink',
    },
    {
      text: 'Call To Action',
      link: 'https://testlink',
      variant: ['callToAction'],
    },
    {
      text: 'Third Action',
      link: 'https://testlink',
    },
  ],
};
