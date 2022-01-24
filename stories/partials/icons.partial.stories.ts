export default {
  title: 'Basics/Icons',
  argTypes: {
    type: { control: { type: 'select', options: ['arrow-left', 'arrow-right', 'mouse'] } },
    colorScheme: { control: { type: 'select', options: ['colorScheme1', 'colorScheme2', 'white'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<icons-partial v-bind="$props">Links</icons-partial>',
});

export const basic = Template.bind({});

basic.args = {
  type: 'arrow-left',
  colorScheme: 'colorScheme1',
  size: 'medium',
};
