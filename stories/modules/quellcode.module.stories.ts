export default {

  title: 'Modules/Quellcode',
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
        options: [
          'center',
          'actions',
          'notice',
          'darkmode',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-quellcode-module v-bind="$props"></lila-quellcode-module>',
});

export const basic = Template.bind({});

basic.args = {

  code: ['<!DOCTYPE html>',
    '<title>Title</title>',
    '<body>',
    '<p checked class="title" id="title">Title</p>',
    '<!-- here goes the rest of the page -->',
    '</body>',
  ],
  headline: 'HTML',
  subline: 'This is HTML',
  intro: 'HTML Quellcode',
  text: ['Dies ist das Html Quellcode Modul.',
    'Hier wird der HTML Quellcode erkannt.'],

};

