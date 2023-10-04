export default {
  title: 'Forms/Radio',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    elements: { controls: { type: 'array' } },

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-radio-partial :elements="$props.elements" v-model="$props.value" :disabled="$props.disabled"/>',
});

export const Form = Template.bind({});

Form.args = {
  elements:[ {value: 'test1', text: 'Beschreibung Test1'} ,{value: 'test2', text: 'Beschreibung Test2'}, {value: 'test3', text: 'Beschreibung Test3'}],
  value: 'test1'
};
