export default {
<<<<<<< HEAD
  title: 'Forms/Select',
=======
  title: 'Basics/Select',
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
  template: '<lila-select-partial  v-bind="$props" />',
});

<<<<<<< HEAD
export const Form = Template.bind({});

Form.args = {
=======
export const Basic = Template.bind({});

Basic.args = {
>>>>>>> origin/feedForms
  placeholder: 'Edit your text',
  size: 'medium',
};


