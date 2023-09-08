export default {
<<<<<<< HEAD
  title: 'Forms/Textarea',
=======
  title: 'Basics/Textarea',
>>>>>>> origin/feedForms
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

<<<<<<< HEAD
export const Form = Template.bind({});

Form.args = {
=======
export const Basic = Template.bind({});

Basic.args = {
>>>>>>> origin/feedForms
};

