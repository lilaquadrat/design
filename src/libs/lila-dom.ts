import MainStoreState from '@store/mainStoreState.interface';
import { Store } from 'vuex';

const isNode = typeof window === 'undefined';

export default class Dom {

  bindings: {event: string, element: any, func: Function}[];

  store: Store<any>;

  constructor(store: Store<MainStoreState>) {

    this.bindings = [];
    this.store = store;

  }

  on(events: string, selector: string, func: EventListener) {

    const splitEvents = events.split(' ');
    const selectedElement = this.getElement(selector);

    splitEvents.forEach((event) => {

      this.bindings.push({ event, element: selectedElement, func });
      selectedElement.addEventListener(event, func);

    });

  }

  onElement(events: string, element: Element, func: EventListener) {

    const splitEvents = events.split(' ');

    splitEvents.forEach((event) => {

      this.bindings.push({ event, element, func });
      element.addEventListener(event, func);

    });

  }

  off(events: string, selector: string) {

    const splitEvents = events.split(' ');
    const selectedElement = this.getElement(selector);
    let item;

    splitEvents.forEach((event) => {

      item = this.bindings.find((e) => event === e.event && e.element === selectedElement);

      this.bindings.splice(this.bindings.indexOf(item), 1);

      selectedElement.removeEventListener(event, item.func);

    });

  }

  destroyBindings() {

    this.bindings.forEach((e) => {

      e.element.removeEventListener(e.event, e.func);

    });

    this.bindings = [];

  }

  getElement(selector: string) {

    let selectedElement: Document | HTMLElement;

    if (selector.length > 0) {

      selectedElement = document.querySelector(selector) as HTMLElement;

    } else {

      selectedElement = document;

    }

    return selectedElement;

  }

  set title(title: string) {

    document.title = title
      ? `${title} ${this.store.state.settings?.title?.short}`
      : this.store.state.settings?.title?.full;

  }

}
