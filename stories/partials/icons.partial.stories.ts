export default {
  title: 'Basics/Icons',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: { type: 'select' }, options: ['arrow-left', 'arrow-right', 'mouse'] },
    colorScheme: { control: { type: 'select' }, options: ['colorScheme1', 'colorScheme2', 'white'] },
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-icons-partial v-bind="$props">Links</lila-icons-partial>',
});

export const Basic = Template.bind({});

Basic.args = {
  type: 'arrow-left',
  colorScheme: 'colorScheme1',
  size: 'medium',
};
