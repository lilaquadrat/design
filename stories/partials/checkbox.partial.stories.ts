export default {
  title: 'Forms/Checkbox',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-checkbox-partial v-model="$props.value" :description="$props.description" :disabled="$props.disabled" :required="$props.required">{{ $props.text }}</lila-checkbox-partial>',
});

export const Form = Template.bind({});

Form.args = {
  value: true,
  disabled: false,
  required: true,
  text: 'This is a checkbox',
  description: 'Test2 description is slightly longer to differentiate it from the other descriptions.',
};

