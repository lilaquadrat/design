export default {
  title: 'Basics/Accordion',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    multiOpen: { control: { type: 'boolean' } },
    disableControls: { control: { type: 'boolean' } },
    openOnStart: {
      control: {
        type: 'select',
      },
      options: [
        'first',
        'all',
      ],
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-accordion-partial v-bind="$props"></lila-accordion-partial>',
});

export const basic = Template.bind({});

basic.args = {
  multiOpen: false,
  elements: [
    {
      textblock: {
        headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. egestas quis. Nisi est sit amet facilisis magna. egestas quis. Nisi est sit amet facilisis magna. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, elit, Lorem ipsum dolor sit amet, sed do eiusmod  Lorem ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],

      },
    },
    {
      textblock: {
        headline: 'incididunt ut labore et dolore magna aliqua. Arcu felis?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
  ],
};

export const multiOpen = Template.bind({});

multiOpen.args = {
  multiOpen: true,
  elements: [
    {
      textblock: {
        headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. egestas quis. Nisi est sit amet facilisis magna. egestas quis. Nisi est sit amet facilisis magna. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, elit, Lorem ipsum dolor sit amet, sed do eiusmod  Lorem ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],

      },
    },
    {
      textblock: {
        headline: 'incididunt ut labore et dolore magna aliqua. Arcu felis?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
  ],
};

export const openOnStart = Template.bind({});

openOnStart.args = {
  multiOpen: false,
  openOnStart: 'first',
  elements: [
    {
      textblock: {
        headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. egestas quis. Nisi est sit amet facilisis magna. egestas quis. Nisi est sit amet facilisis magna. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, elit, Lorem ipsum dolor sit amet, sed do eiusmod  Lorem ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],

      },
    },
    {
      textblock: {
        headline: 'incididunt ut labore et dolore magna aliqua. Arcu felis?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
  ],
};

export const disabledControls = Template.bind({});

disabledControls.args = {
  multiOpen: false,
  openOnStart: 'first',
  disableControls: true,
  elements: [
    {
      textblock: {
        headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
    {
      textblock: {
        headline: 'bibendum ut tristique et egestas quis. egestas quis. Nisi est sit amet facilisis magna. egestas quis. Nisi est sit amet facilisis magna. Nisi est sit amet facilisis magna?',
        text: ['Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, elit, Lorem ipsum dolor sit amet, sed do eiusmod  Lorem ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],

      },
    },
    {
      textblock: {
        headline: 'incididunt ut labore et dolore magna aliqua. Arcu felis?',
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
      },
    },
  ],
};
