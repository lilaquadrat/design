export default {
  title: 'Basics/Radio',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-radio-partial v-bind="$props" />',
});

export const Basic = Template.bind({});

Basic.args = {
  label: 'label',
};
