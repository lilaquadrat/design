export default {
  title: 'Basics/Label',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    styleScheme: { control: { type: 'radio' }, options: ['font-size', 'color', 'text-uppercase', 'font-weight', 'multi'] },
    disabled: { control: { type: 'boolean' } },
  },

};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-label-partial  v-bind="$props">{{$props.label}}</lila-label-partial>',
});

export const basic = Template.bind({});

basic.args = {
  label: 'label',
};
