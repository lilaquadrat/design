import getVariants from '@mixins/getVariants';

export default {

  title: 'Modules/Quote',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: getVariants('quote'),
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-quote-module v-bind="$props" />',
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

export const shortQuoteRight = Template.bind({});

shortQuoteRight.args = {

  quote: 'TRANSPARENT',
  link: {
    text: 'lilaquadrat.de',
    link: 'https://lilaquadrat.de',
  },
  citation: 'lilaquadrat',
  variant: ['authRight', 'quoteRight'],

};

export const longQuoteCenter = Template.bind({});

longQuoteCenter.args = {

  // eslint-disable-next-line max-len
  quote: '12. There will come a day, much quicker than your parents would wish, when you will no longer be comfortable living at home. You will want to move out and establish a home of your own. After that time, your mother and father will be more like your friends than your parents. And someday, if they live long enough, you will be more like a parent to them than a son or daughter.',
  link: {
    text: 'Life on the Edge: The Next Generation\'s Guide to a Meaningful Future',
    link: 'https://www.goodreads.com/work/quotes/42670060-life-on-the-edge-the-next-generation-s-guide-to-a-meaningful-future',
  },
  citation: 'James C. Dobson',
  variant: ['authCenter', 'quoteCenter'],

};

export const longQuoteRightSmall = Template.bind({});

longQuoteRightSmall.args = {

  ...longQuoteCenter.args,
  variant: ['authRight', 'quoteRight', 'small'],

};
