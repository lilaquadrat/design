export default {
  title: 'Forms/Textarea',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
  },

};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-textarea-partial  v-bind="$props" />',
});

export const Form = Template.bind({});

Form.args = {
  placeholder: 'Enter your Text here',
};

