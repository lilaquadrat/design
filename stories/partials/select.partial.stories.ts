export default {
  title: 'Forms/Select',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
  },

};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-select-partial  v-bind="$props" />',
});

export const Form = Template.bind({});

Form.args = {
  placeholder: 'Edit your text',
  size: 'medium',
};


