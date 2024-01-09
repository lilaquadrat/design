import type {
  Company,
  Editor, HttpStatusCode, Me, Project, PublishMethod,
  Hosting, Domain, ApiResponses, AppFilter,
  ListOfModels, Tracker, TrackerStatistics, DataObject, Media,
  MediaContentFiles, PublishContentGroup, Publish, Customers, List, ListParticipants, Content,
  EditorBase, Location,
} from '@lilaquadrat/studio/lib/interfaces';
import hardCopy from '../mixins/hardCopy';
import type Contact from '../models/Contact.model';
import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';

const mockJs = {};
const ISMOCK = false;

export type SDKResponse<T> = {
  data: T
  status: HttpStatusCode
  cacheLifetime?: number
  cacheTime?: number;
  isCache?: boolean
};

export type SDKCache = {
  group?: string
  action?: string
  id?: string
  cacheLifetime?: number
  cacheTime?: number;
};

export type SDKCallOptions = {
  /**
   * ignore the cache and always execute the call
   */
  bypassCache?: boolean
  group?: string,
  action?: string,
  /**
   * if a id is given, use it as key for atomic cache flushing
   *
   * e.g. ``flushId(id)``
   *
   * instead of the whole action category
   *
   * e.g. ``flushCache(group, action)``
   *
   */
  id?: string
  /**
   * in milliseconds
   */
  cacheLifetime?: number
};

let cachedCalls: Record<string, SDKResponse<any> & SDKCache> = {};

export default class StudioSDK {

  readonly endpoints = {
    live: {
      api  : 'https://api.lilaquadrat.de',
      media: 'https://media.lilaquadrat.de',
    },
    next: {
      api  : 'https://next-api.lilaquadrat.de',
      media: 'https://next-media.lilaquadrat.de',
    },
  };

  customEndpoints = {
    api  : '',
    media: '',
  };

  authToken: string;

  mode: 'live' | 'next' | 'custom' | null;

  company: string;

  project: string;

  app: string;

  universalModel: string;

  options: {
    company?: string,
    project?: string,
    authToken?: string,
    mode?: StudioSDK['mode'],
    customEndpoints?: { api: string, media: string }
    universalModel?: string
  };

  constructor (
    app: string,
    options: StudioSDK['options'],
  ) {

    this.authToken = options.authToken;

    this.customEndpoints = options.customEndpoints;

    this.mode = options.customEndpoints ? 'custom' : options.mode || 'live';

    this.company = options.company;

    this.project = options.project;

    this.app = app;

    this.universalModel = options.universalModel;

  }

  private getUrl (type: 'api' | 'media', methodArray: (string | number)[], options?: { noCompanyProject?: boolean }) {

    const method = methodArray.filter((single) => single);
    const urlArray = [];
    let useEndpoint: string;

    console.log(124, this.mode);

    if (this.mode === 'custom') {

      useEndpoint = this.customEndpoints[type];

    } else {

      useEndpoint = this.endpoints[this.mode][type];

    }

    urlArray.push(useEndpoint);
    urlArray.push(...method);

    return urlArray.filter((single) => single).join('/');

  }

  private getHeaders () {

    const headers: Record<string, string> = {
      'studio-app': this.app,
    };

    if (this.authToken) {

      headers.Authorization = `bearer ${this.authToken}`;

    }

    return headers;

  }

  static getCacheKeyMock (url: string) {

    const key = new URL(url);

    return key.pathname + key.search;

  }

  static getCacheKey (url: string) {

    let key: string = url;

    key = key.replace(/:|\/|\?|=|&/ig, '-');

    return key;

  }

  static getCache () {

    return cachedCalls;

  }

  static handleCall<T, D = any> (call: AxiosRequestConfig<D>, options?: SDKCallOptions): Promise<SDKResponse<T>> {

    if (ISMOCK) {

      if (call.method !== 'GET') return Promise.resolve({ data: {} as T, status: 200 });

      const key = StudioSDK.getCacheKeyMock(call.url);

      console.group(`SDK_MOCK_CALL: [${call.method}] ${key}`);

      // if url is not in MockJs.ts, error will be thrown
      if (!mockJs[key]) {

        console.error(key);
        console.groupEnd();
        throw new Error('MOCK_DATA_MISSING');

      }

      console.log({ data: mockJs[key].data as T, status: mockJs[key].status });
      console.groupEnd();

      return Promise.resolve({ data: mockJs[key].data as T, status: mockJs[key].status });

    }

    if (call.method === 'GET' && !options?.bypassCache) {

      const cacheHit = StudioSDK.cache<T>(axios.getUri(call), undefined, options);

      if (cacheHit) return Promise.resolve(cacheHit);

    }

    return axios.request(call)
      .then((response) => {

        if (call.method === 'GET') StudioSDK.cache(axios.getUri(call), response, options);

        return response;

      })
      .then((response) => ({ data: response.data, status: response.status }));

  }

  static cache<T> (url: string, response?: AxiosResponse<T>, options?: SDKCallOptions) {

    const key = options?.id ? options.id : StudioSDK.getCacheKey(url);

    if (response) {

      const useKey = options?.id
        ? options.id
        : key;

      cachedCalls[useKey] = {
        data         : response.data,
        status       : response.status,
        action       : options?.action,
        group        : options?.group,
        cacheLifetime: options?.cacheLifetime ? Date.now() + (options?.cacheLifetime || 0) : null,
        cacheTime    : Date.now(),
      } as SDKResponse<T> & SDKCache;

      return undefined;

    }

    const useCache = cachedCalls[key];

    if (!useCache) return null;

    if (useCache.cacheLifetime && useCache.cacheLifetime < Date.now()) {

      console.debug('cache found but lifetime');

      delete cachedCalls[key];
      return null;

    }

    const returnCache = hardCopy(useCache);

    delete returnCache?.action;
    delete returnCache?.group;
    delete returnCache?.id;

    returnCache.isCache = true;

    return returnCache;

  }

  static flushCache (group?: string, action?: string) {

    if (group || action) {

      Object.keys(cachedCalls).forEach((key) => {

        let flush: boolean = false;
        const singleCache = cachedCalls[key];

        if (group && action) {

          if (singleCache.group === group && singleCache.action === action) flush = true;

        } else if (group) {

          if (singleCache.group === group) flush = true;

        } else if (action) {

          if (singleCache.action === action) flush = true;

        }

        if (flush) {

          delete cachedCalls[key];

        }

      });

    } else {

      cachedCalls = {};

    }

  }

  static flushId (id: string) {

    delete cachedCalls[id];

  }

  public = {
    content: {

      fetch: (type: string, link: string, options?: { state?: 'draft' | 'publish' }) => StudioSDK.handleCall<Editor>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['public', 'content', type, link]),
          headers: this.getHeaders(),
          params : options,
        },
      ),

      search: (type: string, search: string, site: number = 1, options?: { state?: 'draft' | 'publish' }) => {

        const params = { search, ...options };

        return StudioSDK.handleCall<Editor>(
          {
            method : 'GET',
            url    : this.getUrl('api', ['public', 'content', type, 'search', site.toString()]),
            headers: this.getHeaders(),
            params,
          },
        );

      },

      predefined: (id: string) => StudioSDK.handleCall<Editor>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['public', 'content', 'lilaquadrat', 'studio', id]),
          headers: this.getHeaders(),
        },
        {
          group : 'editor',
          action: 'single',
          id,
        },
      ),

      predefinedLatest: (categories: string[]) => StudioSDK.handleCall<Editor>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['public', 'content', 'lilaquadrat', 'studio', 'latest']),
          headers: this.getHeaders(),
          params : {
            category: categories,
          },
        },
        {
          group : 'editor',
          action: 'single',
        },
      ),

      getById: (id: string) => StudioSDK.handleCall<Editor>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['public', 'content', this.company, this.project, id]),
          headers: this.getHeaders(),
        },
        {
          group : 'editor',
          action: 'single',
          id,
        },
      ),

      getByInternalId: (id: string) => StudioSDK.handleCall<Editor>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['public', 'content', this.company, this.project, 'internal', id]),
          headers: this.getHeaders(),
        },
        {
          group : 'editor',
          action: 'single',
          id,
        },
      ),

    },

    lists: {
      join: (listId: string, person: Contact, message: string, category: string, agreements: any) => StudioSDK.handleCall<Customers>(
        {
          method : 'POST',
          url    : this.getUrl('api', ['public', 'lists', 'participants', this.company, this.project, listId, 'join']),
          headers: this.getHeaders(),
          data   : {
            person,
            agreements,
            message,
            category,
          },
        },
      ),
      address: (address: string) => StudioSDK.handleCall<ListOfModels<Location>>(
        {
          method : 'get',
          url    : this.getUrl('api', ['public', 'lists', 'participants', this.company, this.project, 'address']),
          headers: this.getHeaders(),
          params : {
            address,
          },
        },
      ),
      state: (listId: string) => StudioSDK.handleCall<any>(
        {
          method : 'get',
          url    : this.getUrl('api', ['public', 'lists', this.company, this.project, listId, 'state']),
          headers: this.getHeaders(),
        },
      ),
    },
  };


  editor = {
    getById: (id: string) => StudioSDK.handleCall<Editor>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['editor', this.company, this.project, id]),
        headers: this.getHeaders(),
      },
      {
        group : 'editor',
        action: 'single',
        id,
      },
    ),

    getByInternalId: (id: string) => StudioSDK.handleCall<Editor>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['editor', this.company, this.project, 'internal', id]),
        headers: this.getHeaders(),
      },
      {
        group : 'editor',
        action: 'single',
        id,
      },
    ),


    settings: (data: { company: string, project: string }) => StudioSDK.handleCall<Editor>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['editor', data.company, data.project, 'settings']),
        headers: this.getHeaders(),
      },
      {
        group : 'editor',
        action: 'settings',
      },
    ),

    list: (site: number = 0, sort?: string, order?: number, options?: { layout?: boolean, partial?: boolean, active?: boolean, search?: string, tags?: string[] }) => {

      const params = {
        sort,
        order,
        ...(options || {}),
      };

      return StudioSDK.handleCall<ListOfModels<Content>>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['editor', this.company, this.project, 'list', site]),
          headers: this.getHeaders(),
          params,
        },
        {
          group : 'editor',
          action: 'list',
        },
      );

    },
  };

  health = {

    health: () => StudioSDK.handleCall<void>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['health']),
        headers: this.getHeaders(),
      },
    ),

  };

  customers = {

    list: (site: number = 0, search?: string, tags?: string[], type?: string, sort?: number, order?: string) => StudioSDK.handleCall<DataObject<Customers>>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['customers', this.company, this.project, 'list', site]),
        headers: this.getHeaders(),
        params : {
          search,
          tags,
          sort,
          order,
          type,
        },
      },
      {
        group : 'customers',
        action: 'list',
      },
    ),

    single: (id: string) => StudioSDK.handleCall<Customers>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['customers', this.company, this.project, id]),
        headers: this.getHeaders(),
      },
      {
        group : 'customers',
        action: 'single',
        id,
      },
    ),

    tags: (search: string) => StudioSDK.handleCall<string[]>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['customers', this.company, this.project, 'tags', search]),
        headers: this.getHeaders(),
      },
      {
        group : 'customers',
        action: 'tags',
      },
    ),

    update: (id: string, data: Customers) => StudioSDK.handleCall<Customers>(
      {
        method : 'PUT',
        url    : this.getUrl('api', ['customers', this.company, this.project, id]),
        headers: this.getHeaders(),
        data,
      },
    ),

    add: (data: Customers) => StudioSDK.handleCall<Customers>(
      {
        method : 'POST',
        url    : this.getUrl('api', ['customers', this.company, this.project]),
        headers: this.getHeaders(),
        data,
      },
    ),

    remove: (id: string) => StudioSDK.handleCall<Customers>(
      {
        method : 'DELETE',
        url    : this.getUrl('api', ['customers', this.company, this.project, id]),
        headers: this.getHeaders(),
      },
    ),

  };

  lists = {

    single: (id: string) => StudioSDK.handleCall<List>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['lists', this.company, this.project, id]),
        headers: this.getHeaders(),
      },
      {
        group : 'lists',
        action: 'single',
        id,
      },
    ),

    add: (data: List) => StudioSDK.handleCall<List>(
      {
        method : 'POST',
        url    : this.getUrl('api', ['lists', this.company, this.project]),
        headers: this.getHeaders(),
        data,
      },
    ),

    update: (id: string, data: List) => StudioSDK.handleCall<List>(
      {
        method : 'PUT',
        url    : this.getUrl('api', ['lists', this.company, this.project, id]),
        headers: this.getHeaders(),
        data,
      },
    ),

    remove: (id: string) => StudioSDK.handleCall<List>(
      {
        method : 'DELETE',
        url    : this.getUrl('api', ['lists', this.company, this.project, id]),
        headers: this.getHeaders(),
      },
    ),

    getByInternalId: (id: string) => StudioSDK.handleCall<List>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['lists', this.company, this.project, id]),
        headers: this.getHeaders(),
      },
      {
        group : 'lists',
        action: 'single',
        id,
      },
    ),

    list: (site: number = 0, search?: string, tags?: string[], state?: string, sort?: string, order?: number) => StudioSDK.handleCall<DataObject<List[]>>(
      {
        method : 'GET',
        url    : this.getUrl('api', ['lists', this.company, this.project, 'list', site]),
        headers: this.getHeaders(),
        params : {
          search,
          tags,
          sort,
          order,
          state,
        },
      },
      {
        group : 'lists',
        action: 'list',
      },
    ),

    participants: {

      single: (listId: string, id: string) => StudioSDK.handleCall<ListParticipants>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['lists', 'participants', this.company, this.project, listId, id]),
          headers: this.getHeaders(),
        },
        {
          group : 'listParticipants',
          action: 'single',
          id,
        },
      ),

      udpateState: (listId: string, id: string, state: ListParticipants['state']) => StudioSDK.handleCall<ListParticipants>(
        {
          method : 'PUT',
          url    : this.getUrl('api', ['lists', 'participants', this.company, this.project, listId, 'state', id]),
          headers: this.getHeaders(),
          data   : { state },
        },
        {
          group : 'listParticipants',
          action: 'single',
          id,
        },
      ),

      udpateNote: (listId: string, id: string, note: ListParticipants['note']) => StudioSDK.handleCall<ListParticipants>(
        {
          method : 'PUT',
          url    : this.getUrl('api', ['lists', 'participants', this.company, this.project, listId, 'note', id]),
          headers: this.getHeaders(),
          data   : { note },
        },
        {
          group : 'listParticipants',
          action: 'single',
          id,
        },
      ),

      remove: (listId: string, id: string) => StudioSDK.handleCall<ListParticipants>(
        {
          method : 'DELETE',
          url    : this.getUrl('api', ['lists', 'participants', this.company, this.project, listId, id]),
          headers: this.getHeaders(),
        },
      ),

      list: (listId: string, site: number = 0, search?: string, tags?: string[], state?: string[], sort?: string, order?: number) => StudioSDK.handleCall<DataObject<ListParticipants>>(
        {
          method : 'GET',
          url    : this.getUrl('api', ['lists', 'participants', this.company, this.project, listId, 'list', site]),
          headers: this.getHeaders(),
          params : {
            search,
            tags,
            sort,
            order,
            state,
          },
        },
        {
          group : 'listParticipants',
          action: 'list',
        },
      ),

    },
  };

}
