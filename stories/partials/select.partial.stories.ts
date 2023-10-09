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
  options: [
    {
      "value": "option1",
      "text": "Option A"
    },
    {
      "value": "option2",
      "text": "Option B"
    },
    {
      "value": "option3",
      "text": "Option C"
    },
    {
      "value": "option4",
      "text": "Option D"
    }
  ]

};


