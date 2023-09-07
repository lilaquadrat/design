export default {
  title: 'Basics/Textarea',
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

export const Basic = Template.bind({});

Basic.args = {
};

