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
  template: '<lila-checkbox-partial v-bind="$props">{{ $props.text }}</lila-checkbox-partial>',
});

export const Form = Template.bind({});

Form.args = {

};

