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
  template: '<lila-textarea-partial  v-bind="$props">textarea</lila-textarea-partial>',
});

export const Form = Template.bind({});

Form.args = {
  placeholder: 'Enter your Text here',
  required: true,
  disabled: false,
  maxLength: 500
};

