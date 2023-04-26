export default {
  title: 'Basics/Headlines',
  parameters: {
    layout: 'centered',
  },
};

const TemplateH1 = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-textblock-partial v-bind="$props" />',
});

export const h1 = TemplateH1.bind({});

h1.args = {
  headline: 'This is the news of tomorrow',
};

const TemplateH2 = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-textblock-partial v-bind="$props" />',
});

export const h2 = TemplateH2.bind({});

h2.args = {
  subline: 'This is the news of tomorrow',
};

const TemplateH3 = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-textblock-partial v-bind="$props" />',
});

export const h3 = TemplateH3.bind({});

h3.args = {
  intro: 'This is the news of tomorrow',
};
