import vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import translate from '@mixins/translation';
import inview from './lila-inview';

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

    console.log('trams;ate');

    return translate.translate(text, undefined, undefined, values);

  }

  // eslint-disable-next-line class-methods-use-this
  $translateDiff(textToTranslate: string, value: number) {

    return translate.translateWithDiff(textToTranslate, value);

  }

  async $traceable<T>(promise: Promise<T>, time = 3000) {

    const id = await this.$store.dispatch('Calls/add', promise);
    const minimum = new Promise<void>((resolve) => {

      setTimeout(() => {

        console.log('minimum promise resolved');
        resolve();

      }, time);

    });


    Promise.all([minimum, promise])
      .then(() => {

        console.log('all resolved');

        this.$store.commit('Calls/update', { id });

      });

    return this.$store.state.Calls.calls[id];


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
