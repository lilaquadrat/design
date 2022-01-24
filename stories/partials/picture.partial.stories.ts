export default {
  title: 'Basics/Picture',
  argTypes: {
  },
};

const Template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<picture-partial v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {
  source: [],
  alt: 'IMAGE ALT',
  src: 'women1.jpg',
  copyright: 'copyright',
};

export const responsive = Template.bind({});

responsive.args = {
  source: [
    {
      src: '/650.png',
      media: 'only screen and (min-width: 600px) and (max-width: 899px)',
    },
    {
      src: '/900.png',
      media: 'only screen and (min-width: 900px)',
    },
  ],
  alt: 'IMAGE ALT',
  src: '320.png',
};
