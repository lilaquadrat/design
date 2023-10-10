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
  template: '<lila-select-partial v-bind="$props">Select Partial</lila-select-partial>',
});

export const Form = Template.bind({});

Form.args = {
  placeholder: 'Select',
  required: true,
  disabled: false,
  options: [
    {
      value: 'option1',
      text: 'Option A',
      description: 'Option A is a primary choice to consider.',
    },
    {
      value: 'option2',
      text: 'Option B',
      description: 'This is your secondary choice.',
    },
    {
      value: 'option3',
      text: 'Option C',
      description: 'C is often preferred by many.',
    },
    {
      value: 'option4',
      text: 'Option D',
      description: 'D stands out in its own unique way.',
    },
  ],


};


