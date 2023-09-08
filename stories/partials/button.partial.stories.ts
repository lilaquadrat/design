export default {
  title: 'Basics/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colorScheme: { control: { type: 'select' }, options: ['colorScheme1', 'colorScheme2', 'transparent'] },
    doublecheck: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-button-partial v-bind="$props">{{$props.text}}</lila-button-partial>',
});

export const basic = Template.bind({});

basic.args = {
  colorScheme: 'colorScheme1',
  text: 'BUTTON',
};
