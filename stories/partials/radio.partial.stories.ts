export default {
  title: 'Forms/Radio',
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

export const Form = Template.bind({});

Form.args = {
  label: 'label',
};
