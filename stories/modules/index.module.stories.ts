import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Index',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: getVariants('index'),
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-index-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  links: {
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
