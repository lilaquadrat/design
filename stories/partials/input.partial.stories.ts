export default {
  title: 'Forms/Input',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
  },

};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-input-partial v-bind="$props">input partial</lila-input-partial>',
});

export const Form = Template.bind({});

Form.args = {
  placeholder: 'Edit your text',
  required: true,
  disabled: true
};


