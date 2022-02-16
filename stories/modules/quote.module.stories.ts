export default {

  title: 'Modules/Quote',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'authRight',
          'authCenter',
          'quoteRight',
          'quoteCenter',
          'small',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-quote-module v-bind="$props"></lila-quote-module>',
});

export const basic = Template.bind({});

basic.args = {

  quote: [
    'Test',
  ],
  link: {
    text: 'text',
    link: '/somelint',
  },
  citation: 'Max Mustermann',

};

