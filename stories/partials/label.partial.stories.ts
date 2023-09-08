export default {
  title: 'Basics/Label',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    multi: { control: { type: 'radio' }, options: ['font-size', 'float', 'color', 'text-transform'] },
    disabled: { control: { type: 'boolean' } },
  },

};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-label-partial  v-bind="$props" />',
});

export const Basic = Template.bind({});

Basic.args = {
  label: 'label',
};
