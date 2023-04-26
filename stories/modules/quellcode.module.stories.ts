import getVariants from '../../src/mixins/getVariants';

export default {

  title: 'Modules/Quellcode',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: getVariants('quellcode'),
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-quellcode-module v-bind="$props" />',
});

export const basic = Template.bind({});

basic.args = {

  code: '<!DOCTYPE html>\n<title>Title</title>\n<body>\n    <p checked class="title" id="title">Title</p>\n    <!-- here goes the rest of the page -->\n</body>',
  headline: 'HTML',
  subline: 'This is HTML',
  intro: 'HTML Quellcode',
  text: ['Dies ist das Quellcode Modul.',
    'Hier wird der Quellcode automatisch erkannt und eingefärbt.'],

};

export const Darkmode = Template.bind({});

Darkmode.args = {
  ...basic.args,
  variant: ['darkmode'],
};

export const Center = Template.bind({});

Center.args = {
  ...basic.args,
  variant: ['center'],
};

export const CodeLongLine = Template.bind({});

CodeLongLine.args = {

  code: '@font-face {font-family: Chunkfive; src: url("Chunkfive.otf");}body, .usertext {color: #F0F0F0; background: #600;font-family: Chunkfive, sans;--heading-1: 30px/32px Helvetica, sans-serif;}}',
  headline: 'CSS',
  subline: 'This is CSS',
  intro: 'CSS Quellcode',
  text: ['Dies ist das Quellcode Modul.',
    'Hier wird der CSS Quellcode automatisch erkannt und eingefärbt.'],

};
