export default {
  title: 'Basics/Checkbox',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-checkbox-partial v-bind="$props">{{ $props.text }}</lila-checkbox-partial>',
});

export const Basic = Template.bind({});

Basic.args = {

};

