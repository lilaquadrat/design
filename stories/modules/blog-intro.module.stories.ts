import dayjs from "dayjs";

export default {
  title: 'Modules/BlogIntro',
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<blog-intro-module v-bind="$props" />',
});

export const basic = Template.bind({});
basic.args = {
  textblock: {
    headline: 'Some nice Headline',
    subline: 'Some nice subline',
    // eslint-disable-next-line max-len
    intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  },
  picture: {
    source: [],
    alt: 'IMAGE ALT',
    src: 'women1.jpg',
  },
  author: 'Mathias Schübel',
  date: dayjs().format('DD.MM.YYYY'),
};

export const link = Template.bind({});
link.args = {
  ...basic.args,
  link: {
    link: '/somelint',
  },
};
