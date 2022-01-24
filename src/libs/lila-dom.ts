import { Store } from 'vuex';

let isNode: boolean;

typeof window === 'undefined'
  ? isNode = true
  : isNode = false;

export default class Dom {

  bindings: {event: string, element: any, func: Function}[];

  store: Store<any>;

  constructor(store: Store<any>) {

    this.bindings = [];
    this.store = store;

  }

  on(events: string, selector: string, func: EventListener) {

    const splitEvents = events.split(' ');
    const selectedElement = this.getElement(selector);

    splitEvents.map((event) => {

      this.bindings.push({ event, element: selectedElement, func });
      selectedElement.addEventListener(event, func);

    });

  }

  onElement(events: string, element: Element, func: EventListener) {

    const splitEvents = events.split(' ');

    splitEvents.map((event) => {

      this.bindings.push({ event, element, func });
      element.addEventListener(event, func);

    });

  }

  off(events: string, selector: string) {

    const splitEvents = events.split(' ');
    const selectedElement = this.getElement(selector);
    let item;

    splitEvents.map((event) => {

      item = this.bindings.find((e) => event === e.event && e.element === selectedElement);

      this.bindings.splice(this.bindings.indexOf(item), 1);

      selectedElement.removeEventListener(event, item.func);

    });

  }

  destroyBindings() {

    this.bindings.map((e) => {

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

    title
      ? document.title = `${title} ${this.store.state.settings.title.short}`
      : document.title = this.store.state.settings.title.full;

  }

}
