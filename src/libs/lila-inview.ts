const isNode = typeof window === 'undefined';

class Inview {

  timeout: any;

  debounceTime: number = 50;

  isTop: boolean;

  scrolledEvent: any;

  constructor() {

    if (isNode) return;

    this.scrolledEvent = new Event('scrolled');
    this.checkIsTop();

    window.addEventListener('scroll', () => {

      this.debounce();

    });

  }

  addScrollListener(element: Element) {

    element.addEventListener('scroll', () => {

      this.debounce();

    });

  }

  trigger() {

    this.checkIsTop();
    window.dispatchEvent(this.scrolledEvent);

  }

  checkIsTop() {

    if (window.scrollY > 0) {

      this.isTop = false;

    } else {

      this.isTop = true;

    }

  }

  debounce() {

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.trigger();

    }, this.debounceTime);

  }

  check(component) {

    const element = component.$el;

    if (typeof element.getBoundingClientRect !== 'function') return;

    const height = window.outerHeight / 2;
    const rect = element.getBoundingClientRect();
    const top = rect.top - height + 10;
    const bottom = rect.bottom - height + 10;
    let state: string;

    if (top > 0) {

      state = 'inview-after';

    }

    if (top <= 0 && bottom >= 0) {

      state = 'inview-current';

    }

    if (bottom < 0) {

      state = 'inview-before';

    }

    component.view = state;

    if (state === 'inview-current' && component.fullscreen) {

      this.adjustScrolling(component, rect.top);

    }

  }

  checkImage(component) {

    const element = component.$el;

    if (typeof element.getBoundingClientRect !== 'function') return;

    const height = document.body.getBoundingClientRect().height * 2;
    const rect = element.getBoundingClientRect();
    const { top } = rect;
    const { bottom } = rect;

    if (component.loading) return;

    if (top <= height && bottom >= 0) {

      component.loading = true;
      return;

    }

    if (top <= 0 && bottom + height >= 0) {

      component.loading = true;

    }

  }

  adjustScrolling(component, top) {

    const offset = window.outerHeight / 10;

    if (top < offset && top > (offset * -1)) {

      component.$el.scrollIntoView({
        behavior: 'smooth',
      });

    }

  }

}

const inview = new Inview();

export default inview;
