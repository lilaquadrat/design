export default {
  title: 'Basics/Description',
  argTypes: {
    type: { control: { type: 'select', options: ['notice', 'success', 'error'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-description-partial v-bind="$props">{{$props.text}}</lila-description-partial>',
});

export const basic = Template.bind({});

basic.args = {
  type: 'notice',
  label: 'Title',
  text: 'Description',
  padding: true,
  margin: true,
};

export const success = Template.bind({});

success.args = {
  type: 'success',
  label: 'Title',
  text: 'Description',
  padding: true,
  margin: true,
};

export const error = Template.bind({});

error.args = {
  type: 'error',
  label: 'Title',
  text: 'Description',
  padding: true,
  margin: true,
};

export const withoutLabel = Template.bind({});

withoutLabel.args = {
  type: 'notice',
  text: 'Description',
  padding: false,
  margin: true,
};

export const noBackground = Template.bind({});

noBackground.args = {
  type: 'notice',
  text: 'Description',
  padding: false,
  margin: true,
  background: false,
};
