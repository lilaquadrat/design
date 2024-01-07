// import useMainStore from '@/stores/main.store'

export class Dom {

  bindings: {event: string, element: any, func: Function}[];

  // store;

  constructor () {

    this.bindings = [];

    // this.store = useMainStore();

  }

  on (events: string, selector: string, func: EventListener) {

    const splitEvents = events.split(' ');
    const selectedElement = this.getElement(selector);

    splitEvents.forEach((event) => {

      this.bindings.push({ event, element: selectedElement, func });
      selectedElement.addEventListener(event, func);

    });

  }

  onElement (events: string, element: HTMLElement, func: EventListener) {

    const splitEvents = events.split(' ');

    splitEvents.forEach((event) => {

      console.log('bind', event)

      this.bindings.push({ event, element, func });
      element.addEventListener(event, func);

    });

  }

  off (events: string, selector: string) {

    const splitEvents = events.split(' ');
    const selectedElement = this.getElement(selector);
    let item;

    splitEvents.forEach((event) => {

      item = this.bindings.find((e) => event === e.event && e.element === selectedElement);

      this.bindings.splice(this.bindings.indexOf(item), 1);

      selectedElement.removeEventListener(event, item.func);

    });

  }

  destroyBindings () {

    this.bindings.forEach((e) => {

      e.element.removeEventListener(e.event, e.func);

    });

    this.bindings = [];

  }

  getElement (selector: string) {

    let selectedElement: Document | HTMLElement;

    if (selector.length > 0) {

      selectedElement = document.querySelector(selector) as HTMLElement;

    } else {

      selectedElement = document;

    }

    return selectedElement;

  }

  // set title (title: string) {

  //   document.title = title
  //     ? `${title} ${this.store.settings?.title?.short}`
  //     : this.store.settings?.title?.full;

  // }

}

const dom = new Dom();

export default dom;