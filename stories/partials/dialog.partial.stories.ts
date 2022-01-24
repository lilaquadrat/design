export default {
  title: 'Basics/Dialog',
  argTypes: {
    variant: { control: { type: 'multi-select', options: ['error', 'success', 'color1', 'color3'] } },
    type: { control: { type: 'select', options: ['check', 'confirm'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<dialog-partial v-bind="$props">{{$props.text}}</dialog-partial>',
});

export const basic = Template.bind({});

basic.args = {
  message: 'Are you sure about that?',
  description: 'Here is some description why this is important.',
  variant: [],
  type: 'check',
};

export const error = Template.bind({});

error.args = {
  message: 'That went not well.',
  description: 'Here is some description why this is important.',
  variant: ['error'],
  type: 'confirm',
};

export const success = Template.bind({});

success.args = {
  message: 'That went really well.',
  variant: ['success'],
  type: 'confirm',
};

export const customText = Template.bind({});

customText.args = {
  message: 'Are you sure about that?',
  description: 'Here is some description why this is important.',
  variant: [],
  type: 'check',
  translations: {
    cancel: 'please dont',
    confirm: 'I´am in.',
    acknowledge: 'Understood',
  },
};
