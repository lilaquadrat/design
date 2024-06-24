export default {
  title: 'Basics/Location',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
    },
  },
};

const template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-location-partial v-bind="$props" />',
});

export const basic = template.bind({});

basic.args = {
  src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.471767935749!2d12.372921977610341!3d51.33923502297324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f823ff1388ab%3A0xe676be93217eec8!2sK%C3%BCmmel%20Apotheke!5e0!3m2!1sde!2sde!4v1714073500577!5m2!1sde!2sde',

};

export const square = template.bind({});

square.args = {
  src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.471767935749!2d12.372921977610341!3d51.33923502297324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f823ff1388ab%3A0xe676be93217eec8!2sK%C3%BCmmel%20Apotheke!5e0!3m2!1sde!2sde!4v1714073500577!5m2!1sde!2sde',
  variant: ['square'],
};
