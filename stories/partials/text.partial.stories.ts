export default {
  title: 'Basics/Text',
};

const template = (args: unknown, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<p>{{$props.text}}</p>',
});

export const basic = template.bind({});

basic.args = {
  // eslint-disable-next-line max-len
  text: 'Of the many cultural changes the last few years have wrought, one of the most striking has been the demise of the Great Man: the person so celebrated for his distinguished contributions to not only his field, but to society at large, that anyone who examined too closely the foibles and crimes of his personal behavior was dismissed as a scold or a shrew. The human instinct is to make gods of men (not just males, but mostly), while later witnessing their downfall with either a kind of grim glee or an aggrieved pity. Yet no one is, or ever has been, worthy of celebration in all aspects of their life — a person can accomplish wondrous things and still be a terrible human, and our unwillingness to accept that paradoxical binary means that we keep repeating the same patterns of idolization and recrimination, again and again. ',
};
