export default {
  title: 'Modules/Index',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'top',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<index-module v-bind="$props" />',
});

export const basic = Template.bind({});
basic.args = {
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
};

export const withLegend = Template.bind({});
withLegend.args = {
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
};
