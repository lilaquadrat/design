import vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import inview from './lila-inview';
import translate from '@mixins/translation';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component({
  inheritAttrs: false,
})
abstract class ExtPartial extends vue {

  @Prop({ type: Array, default: () => [] }) variant: string[];

  get renderTarget(): 'pdf' | 'web' {

    return this.$store.state.renderTarget;

  }

  // eslint-disable-next-line class-methods-use-this
  $translate(text: string, values?: (string | number)[]) {

    return translate.translate(text, undefined, undefined, values);

  }

}

export {
  Component,
  ExtPartial,
  Prop,
  Watch,
  inview,
  vue,
};
