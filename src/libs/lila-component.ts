import vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import inview from 'src/libs/lila-inview';
import Dom from 'src/libs/lila-dom';
import { AdditionalContentInformation, ModuleIndexOptions } from '@lilaquadrat/studio/lib/interfaces';
import translate from '@mixins/translation';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component({
  inheritAttrs: false,
})
abstract class ExtComponent extends vue {

  public state: string = '';

  public view: string = '';

  public fullscreen: boolean = false;

  public DOM: Dom;

  public triggerScroll: boolean = true;

  public traceId: string = '';

  @Prop({ type: Array, default: () => [] }) variant: string[];

  @Prop({ type: Object, default: () => { } }) index: ModuleIndexOptions;

  @Prop(String) position: 'top' | 'content' | 'bottom';

  @Prop(Object) additional: AdditionalContentInformation;

  constructor() {

    super();

    if (this.$store) {

      this.DOM = new Dom(this.$store);

    }

  }

  // eslint-disable-next-line class-methods-use-this
  $translate(text: string, values?: (string | number)[]) {

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

  // /**
  //  * add a eventlistener to this element
  //  * calls the [[Inview.check]] function
  //  *
  //  * @memberof ExtComponent
  //  */
  checkInview() {

    window?.addEventListener('scrolled', () => {

      inview.check(this);

    });

  }

  // eslint-disable-next-line class-methods-use-this
  attachScrollCheck(elements: NodeListOf<Element> | Element[]) {

    elements.forEach((element) => {

      inview.addScrollListener(element);

    });

  }

  get id() {

    if (this.index?.anchor) return this.index.anchor;
    return false;

  }

  get renderTarget() {

    return this.$store.state.renderTarget;

  }

}

export {
  Component,
  ExtComponent,
  Prop,
  Watch,
  inview,
  vue,
};
