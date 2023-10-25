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

  public traceId: string = '';

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

  /**
   * will add the promise to vuex and make its status available.
   *
   * additionally provides a minimum time before the promise gets resolved
   */
  async $traceable<T>(promise: Promise<T>, time = 3000) {

    // add the new call to vuex and fetch the id
    const id = await this.$store.dispatch('Calls/add', promise);
    const minimum = new Promise<void>((resolve) => {

      setTimeout(() => resolve(), time);

    });

    this.traceId = id;

    // the minimum promise will hold the execution of allsettled
    const results = await Promise.allSettled([minimum, promise]);

    // no error will be thrown, we need to check the result of the given promise
    if (results[1].status === 'rejected') {

      this.$store.commit('Calls/update', { id, state: 'rejected' });
      throw results[1].reason;

    } else {

      this.$store.commit('Calls/update', { id, state: 'resolved' });
      return results[1].value;

    }

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
