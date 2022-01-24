import vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import inview from 'src/libs/lila-inview';
import Dom from 'src/libs/lila-dom';

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

  @Prop({ type: Array, default: () => [] }) variant: string[];

  constructor() {

    super();

    if (this.$store) {

      this.DOM = new Dom(this.$store);

    }

  }

  // /**
  //  * add a eventlistener to this element
  //  * calls the [[Inview.check]] function
  //  *
  //  * @memberof ExtComponent
  //  */
  checkInview() {

    window.addEventListener('scrolled', () => {

      inview.check(this);

    });

  }

  attachScrollCheck(elements: NodeListOf<Element> | Element[]) {

    elements.forEach((element) => {

      inview.addScrollListener(element);

    });

  }

  // /**
  //  * check if the global variable window exists
  //  * if so,  we are in a browser, if not we are in nodejs
  //  *
  //  * @readonly
  //  * @memberof ExtComponent
  //  */
  // get isNode() {

  //   return typeof window === 'undefined';

  // }

}

export {
  Component,
  ExtComponent,
  Prop,
  Watch,
  inview,
  vue,
};
