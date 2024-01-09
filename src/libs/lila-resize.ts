const isNode = typeof window === 'undefined';

class Resize {

  timeout: any;

  debounceTime: number = 250;

  resizedEvent: Event;

  mediaEvent: Event;

  media: string = 'mobile';

  _realHeight: number = 0;

  constructor() {

    if (isNode) return;

    this.resizedEvent = new Event('resized');
    this.mediaEvent = new Event('media');
    this._realHeight = window.innerHeight;

    this.getMediaQuery();

    window.addEventListener('resize', () => {

      this.debounce();

    });

  }

  get realHeight() {

    return this._realHeight;

  }

  trigger() {

    this.getMediaQuery();
    this._realHeight = window.innerHeight;
    window.dispatchEvent(this.resizedEvent);

  }

  getMediaQuery(): void {

    const element = document.getElementById('mediadetection');

    console.log('get query', element);


    if (!element) return;

    for (const child of element.children) {

      if (window.getComputedStyle(child).display === 'block') {

        console.log('get query 1', child, window.innerWidth);

        if (this.media !== child.getAttribute('class')) {

          this.media = child.getAttribute('class');
          window.dispatchEvent(this.mediaEvent);

        } else {

          this.media = child.getAttribute('class');

        }

        break;

      }

    }

  }

  debounce() {

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.trigger();

    }, this.debounceTime);

  }

}

const resize = new Resize();

export default resize;
