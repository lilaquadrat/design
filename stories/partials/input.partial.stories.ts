export default {
  title: 'Basics/Input',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: { type: 'radio' }, options: ['small', 'medium', 'large'] },
    disabled: { control: { type: 'boolean' } },
  },

};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-input-partial  v-bind="$props" />',
});

export const Basic = Template.bind({});

Basic.args = {
  placeholder: 'Edit your text',
  size: 'medium',
};


