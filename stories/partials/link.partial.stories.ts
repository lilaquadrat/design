export default {
  title: 'Basics/Links',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: [
        'colorScheme2',
        'callToAction',
        'white',
      ],
    },
    icon: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div>Some text with a <lila-link-partial v-bind="$props">Links</lila-link-partial> in it.</div>',
});

export const basic = Template.bind({});

basic.args = {
  text: 'some link',
  link: 'http://test.de/link',
  attributes: ['static'],
};

export const callToAction = Template.bind({});

callToAction.args = {
  text: 'some link',
  link: 'http://test.de/link',
  attributes: ['static'],
  variant: ['callToAction'],
};

export const icon = Template.bind({});

icon.args = {
  text: 'some link',
  link: 'http://test.de/link',
  attributes: ['static'],
  icon: 'arrow-right',
  variant: [],
};
