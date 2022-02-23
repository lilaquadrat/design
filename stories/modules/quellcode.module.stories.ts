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

  code: '<!DOCTYPE html>\n<title>Title</title>\n<body>\n    <p checked class="title" id="title">Title</p>\n    <!-- here goes the rest of the page -->\n</body>',
  headline: 'HTML',
  subline: 'This is HTML',
  intro: 'HTML Quellcode',
  text: ['Dies ist das Html Quellcode Modul.',
    'Hier wird der HTML Quellcode automatisch erkannt.'],

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

  code: '.hljs{color:#24292e;background:#fff} .hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title, .hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}',
  headline: 'HTML',
  subline: 'This is HTML',
  intro: 'HTML Quellcode',
  text: ['Dies ist das Html Quellcode Modul.',
    'Hier wird der HTML Quellcode automatisch erkannt.'],

};
