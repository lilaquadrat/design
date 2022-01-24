import vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import inview from './lila-inview';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component({
  inheritAttrs: false,
})
abstract class ExtPartial extends vue {

  @Prop({ type: Array, default: () => [] }) variant: string[];

}

export {
  Component,
  ExtPartial,
  Prop,
  Watch,
  inview,
  vue,
};
