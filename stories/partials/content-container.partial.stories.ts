export default {
  title: 'Basics/ContentContainer',
  parameters: {
    layout: 'centered',
  },
};

const template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-content-container-partial v-bind="$props">open overlay</lila-content-container-partial>',
});

export const basic = template.bind({});

basic.args = {
  // eslint-disable-next-line max-len
  id: 'conditions-of-use',
  predefined: true,
  latest: true,
};

export const error = template.bind({});

error.args = {
  id: 'NOT_FOUND',
};


export const overlay = template.bind({});

overlay.args = {
  overlay: true,
  id: 'conditions-of-use',
  predefined: true,
  latest: true,
};

