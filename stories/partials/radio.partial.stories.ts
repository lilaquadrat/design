export default {
<<<<<<< HEAD
  title: 'Forms/Radio',
=======
  title: 'Basics/Radio',
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
  template: '<lila-radio-partial v-bind="$props" />',
});

<<<<<<< HEAD
export const Form = Template.bind({});

Form.args = {
=======
export const Basic = Template.bind({});

Basic.args = {
>>>>>>> origin/feedForms
  label: 'label',
};
