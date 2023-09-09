export default {
  title: 'Basics/Indicator',
  parameters: {
    layout: 'centered',
  },
};

const template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-indicator-partial  v-bind="$props" />',
});

export const basic = template.bind({});

basic.args = {
  // eslint-disable-next-line max-len
  id: 'conditions-of-use',
  small: true,
  medium: false,
  large: false,
};
