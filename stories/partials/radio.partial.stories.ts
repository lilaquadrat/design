export default {
  title: 'Forms/Radio',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    elements: { controls: { type: 'array' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-radio-partial :elements="$props.elements" v-model="$props.value" :disabled="$props.disabled" :required="$props.required"> {{$props.label}} </lila-radio-partial>',
});

export const Form = Template.bind({});

Form.args = {
  label: 'Radio Button',
  disabled: false,
  required: true,
  elements: [
    {
      value: 'test1',
      text: 'Description Test1',
      description: 'This is a basic test description for Test1.',
    },
    {
      value: 'test2',
      text: 'Description Test2',
      description: 'Test2 description is slightly longer to differentiate it from the other descriptions.',
    },
    {
      value: 'test3',
      text: 'Description Test3',
      description: 'A short description for Test3.',
    },
  ],
  value: 'test1',
};
