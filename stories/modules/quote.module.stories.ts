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

  quote: 'Be yourself; everyone else is already taken',
  link: {
    text: 'text',
    link: '/somelink',
  },
  citation: 'Oscar Wilde',

};

