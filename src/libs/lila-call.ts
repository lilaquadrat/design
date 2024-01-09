class Endpoints {

  endpoints: {} = {};

  constructor(endpoints: Endpoint[]) {

    if (!endpoints) return;

    endpoints.map((endpoint) => {

      let url: string;

      endpoint.context
        ? url = `${window.location.protocol}//${window.location.host}${endpoint.url}`
        : url = endpoint.url;

      this.endpoints[endpoint.name] = url;

    });

  }

}

/**
 *
 *
 * @export
 * @class Response
 */
export class Response {

  /**
   * http responsecode
   *
   * @type {number}
   * @memberof Response
   */
  status: number;

  /**
   * response from url
   *
   * @type {*}
   * @memberof Response
   */
  r: any;

  constructor(status: number, r: any) {

    this.status = status;
    this.r = r;

  }

}

export class Call extends Endpoints {

  beforeSend: Function;

  onprogress: (event) => void;

  fileUpload: boolean = false;

  /**
   *Creates an instance of Call.
   * @memberof Call
   */
  constructor(endpoints?: Endpoint[]) {

    super(endpoints);

  }

  options: {
    type: string,
    dataType: string,
  };

  /**
   *
   *
   * @param {string} endpoint
   * @param {string} method
   * @param {object} [data]
   * @returns
   * @memberof Call
   */
  get(endpoint: string, method: string, data?: object, headers?: { [key: string]: string }) {

    return this.call(this.getUrl(endpoint, method), 'GET', data, headers);

  }

  /**
   *
   *
   * @param {string} endpoint
   * @param {string} method
   * @param {object} [data]
   * @returns
   * @memberof Call
   */
  post(endpoint: string, method: string, data?: object, headers?: { [key: string]: string }) {

    return this.call(this.getUrl(endpoint, method), 'POST', data, headers);

  }

  delete(endpoint: string, method: string, data?: object, headers?: { [key: string]: string }) {

    return this.call(this.getUrl(endpoint, method), 'DELETE', data, headers);

  }

  /**
   *
   *
   * @param {string} url
   * @param {string} type
   * @param {object} [data]
   * @returns
   * @memberof Call
   */
  call(url: string, type: string, data?: object | FormData, headers?: { [key: string]: string }) {

    const req = new XMLHttpRequest();
    let response: string;
    let sendData: string | FormData;
    let requestUrl: string;

    if (data) {

      if (data.constructor.name !== 'FormData') {

        sendData = this.serializeObject(data);

      } else {

        sendData = data as FormData;
        this.fileUpload = true;

      }

    }

    type === 'GET' && sendData
      ? requestUrl = `${url}?${sendData}`
      : requestUrl = url;

    const p = new Promise((r, e) => {

      req.open(type, requestUrl);

      if (type === 'POST' && data && !this.fileUpload) {

        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      }

      if (headers) {

        Object.keys(headers).map((key: string) => {

          req.setRequestHeader(key, headers[key]);

        });

      }

      req.onreadystatechange = (event) => {

        if (req.readyState === 4) {

          req.getResponseHeader('Content-Type')
            ? response = this.modifyContent(req.responseText, req.getResponseHeader('Content-Type'))
            : response = req.responseText;

          req.status >= 200 && req.status < 300
            ? r(new Response(req.status, response))
            : e(new Response(req.status, response));

        }

      };

      if (this.onprogress) {

        req.onprogress = (event) => {

          this.onprogress(event);

        };

      }

      if (this.beforeSend) {

        this.beforeSend(req, data, () => {

          req.send(sendData);

        });

      } else {

        req.send(sendData);

      }

    });

    return p;

  }

  /**
   *
   *
   * @param {{[key: string]: any}} object
   * @param {string} [prefix]
   * @returns
   * @memberof Call
   */
  serializeObject(object: { [key: string]: any }, prefix?: string) {

    if (object === null || object === undefined) return;

    return Object
      .keys(object)
      .map((key) => {

        let returnString: string;

        prefix
          ? returnString = `${prefix}[${key}]`
          : returnString = key;

        typeof (object[key]) === 'object'
          ? returnString = this.serializeObject(object[key], returnString)
          : returnString += `=${encodeURIComponent(object[key])}`;

        if (returnString) return returnString;

      })
      .filter((single) => single)
      .join('&');

  }

  /**
   *
   *
   * @param {string} endpoint
   * @param {string} method
   * @returns
   * @memberof Call
   */
  getUrl(endpoint: string, method: string) {

    if (!endpoint) return `${window.location.protocol}//${window.location.host}/${method}`;

    return this.endpoints[endpoint] ? this.endpoints[endpoint] + method : `${window.location.protocol}//${window.location.host}/${endpoint}${method}`;

  }

  /**
   *
   *
   * @param {string} content
   * @param {string} contentType
   * @returns
   * @memberof Call
   */
  modifyContent(content: string, contentType: string) {

    let newContent: string;

    if (contentType.match(/^application\/json/)) {

      newContent = JSON.parse(content);

    } else {

      newContent = content;

    }

    return newContent;

  }

  /**
   *
   *
   * @param {string} name
   * @param {string} url
   * @memberof Call
   */
  addEndpoint(name: string, url: string) {

    if (this[name]) {

      console.warn(`${name} already taken. you cannot set an endpoint with a taken name.`);

    } else {

      this[name] = function () {

        // let matchedArguments;
        if (arguments.length < 2) {

          console.error('to few arguments. path and callback is needed');

        }

      };

    }

  }

}
