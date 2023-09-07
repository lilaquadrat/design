export default {
  title: 'Basics/Select',
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

export const Basic = Template.bind({});

Basic.args = {
  placeholder: 'Edit your text',
  size: 'medium',
};


