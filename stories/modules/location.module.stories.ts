import getVariants from '@mixins/getVariants';

export default {
  title: 'Modules/Location',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'multi-select',
      },
      options: getVariants('location'),
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<lila-location-module v-bind="$props"></lila-location-module>',
});

export const basic = Template.bind({});

basic.args = {
  textblock: {
    subline: 'Sie finden uns unter im Zentrum von Name der Ortschaft',
    text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'],
  },
  map: {
    showMaps: 'Karte Anzeigen',
    textblock: {
      text: ['Sie finden uns unter im Zentrum von Name der Ortschaft',
      ],
    },
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.471767935749!2d12.372921977610341!3d51.33923502297324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f823ff1388ab%3A0xe676be93217eec8!2sK%C3%BCmmel%20Apotheke!5e0!3m2!1sde!2sde!4v1714073500577!5m2!1sde!2sde',
  },
};

export const withLinks = Template.bind({});

withLinks.args = {
  textblock: {
    subline: 'Sie finden uns unter im Zentrum von Name der Ortschaft',
    text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    ],
  },
  map: {
    showMaps: 'Karte Anzeigen',
    textblock: {
      text: ['Sie finden uns unter im Zentrum von Name der Ortschaft',
      ],
    },
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.471767935749!2d12.372921977610341!3d51.33923502297324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f823ff1388ab%3A0xe676be93217eec8!2sK%C3%BCmmel%20Apotheke!5e0!3m2!1sde!2sde!4v1714073500577!5m2!1sde!2sde',
    variant: ['square'],
  },
  links: {
    value: [
      {
        text: 'Link with some longer text',
        link: 'https://testlink',
      },
      {
        text: 'Normal link',
        link: 'https://testlink',
      },
    ],
    title: 'Follow up links',
    variant: ['noIcon'],
  },
};

export const withLists = Template.bind({});

withLists.args = {
  // textblock: {
  //   subline: 'Sie finden uns unter im Zentrum von Name der Ortschaft',
  //   text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
  //   ],
  // },
  map: {
    showMaps: 'Karte Anzeigen',
    textblock: {
      text: ['Sie finden uns unter im Zentrum von Name der Ortschaft',
      ],
    },
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.471767935749!2d12.372921977610341!3d51.33923502297324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f823ff1388ab%3A0xe676be93217eec8!2sK%C3%BCmmel%20Apotheke!5e0!3m2!1sde!2sde!4v1714073500577!5m2!1sde!2sde',
  },
  list: {
    value: [
      'Entry with some longer text',
      'Normal entry',
      'entry 3',
    ],
    title: 'some nice list',
  },
};

export const textLeft = Template.bind({});

textLeft.args = {
  textblock: {
    subline: 'Sie finden uns unter im Zentrum von Name der Ortschaft',
    text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
    ],
  },
  map: {
    showMaps: 'Karte Anzeigen',
    textblock: {
      text: ['Sie finden uns unter im Zentrum von Name der Ortschaft',
      ],
    },
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.471767935749!2d12.372921977610341!3d51.33923502297324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f823ff1388ab%3A0xe676be93217eec8!2sK%C3%BCmmel%20Apotheke!5e0!3m2!1sde!2sde!4v1714073500577!5m2!1sde!2sde',
  },
  links: {
    value: [
      {
        text: 'Link with some longer text',
        link: 'https://testlink',
      },
    ],
    title: 'Follow up links',
    variant: ['noIcon'],
  },
  variant: ['textLeft'],
};
