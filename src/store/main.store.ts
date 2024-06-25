import Vue from 'vue';
import Vuex from 'vuex';
import StudioSDK, { SDKResponse } from '@libs/StudioSDK';
import { Content } from '@lilaquadrat/studio/lib/interfaces';
import { CallsStore } from './calls.store';
import Translations from './translations.store';
import MainStoreState from './mainStoreState.interface';


Vue.use(Vuex);

const state: MainStoreState = {
  data: {},
  layout: {},
  title: '',
  media: '',
  description: '',
  partials: {},
  settings: {},
  translation: {},
  overlay: {
    content: {},
    active: false,
  },
  content: [],
  fullscreen: false,
  availableModules: [],
  availableModulesWithRevision: { revision: 0, modules: [] },
  editor: {
    content: null,
    active: '',
  },
  renderTarget: 'web',
  api: {
    mode: 'custom',
    customEndpoints: {
      api: 'http://localhost:9090',
      media: 'http://localhost:9091',
    },
    company: 'company',
    project: 'project',
  },
};

export default new Vuex.Store({


  state,
  modules: {
    Calls: CallsStore,
    Translations,
  },
  mutations: {

    init(mainstate) {

      mainstate.inited = true;

    },

    setData(mainstate, data) {

      mainstate.data = data;

    },

    renderTarget(mainstate, target: MainStoreState['renderTarget']) {

      mainstate.renderTarget = target;

    },

    layout(mainstate, data) {

      mainstate.layout = data;

    },

    set404(mainstate) {

      mainstate.data = { status: 404 };

    },

    setMedia(mainstate, data) {

      mainstate.media = data;

    },

    setSettings(mainstate, data) {

      mainstate.settings = data;

    },

    setApi(mainstate, data) {

      mainstate.api = data;

    },

    setTranslation(mainstate, data) {

      mainstate.translation = data;

    },

    setOverlay(mainstate, data) {

      mainstate.overlay.content = data;
      mainstate.overlay.active = true;

    },

    clearOverlay(mainstate) {

      mainstate.overlay.content = {};

    },

    setContent(mainstate, content: any) {

      mainstate.content = content;

    },

    setAvailableModules(mainstate, availableModules: any[]) {

      mainstate.availableModules = availableModules;

    },

    setAvailableModulesWithRevision(mainstate, data:{ revision: number, modules: any[]}) {

      mainstate.availableModulesWithRevision = data;

    },

    setFullscreen(mainstate, fullscreen: boolean) {

      mainstate.fullscreen = fullscreen;

    },

    setEditorActive(mainstate, active: string | number) {

      mainstate.editor.active = active;

    },

  },

  actions: {
    hideOverlay() {

      this.state.overlay.active = false;

    },

    async getContent(store, params: { predefined: boolean, latest: boolean, id: string, categories?: string[] }) {

      let data: SDKResponse<Content> = null;
      const sdk = new StudioSDK('design', store.state.api);

      if (params.predefined && !params.latest) {

        data = await sdk.public.content.predefined(params.id);

      } else if (params.predefined && params.latest) {

        data = await sdk.public.content.predefinedLatest(params.categories);

      } else {

        data = await sdk.public.content.getByInternalId(params.id);

      }

      return data;

    },

    fullscreen(store, fullscreen: boolean) {

      if (!document) return;

      const { body } = document;

      if (fullscreen) {

        body.classList.add('fullscreen');

      } else {

        body.classList.remove('fullscreen');

      }

      store.commit('setFullscreen', state);

    },

  },
});

// function storeFactory(): Store<MainStoreState> {

//   return new Vuex.Store({
//     state,
//     modules: {},
//     mutations: {

//       init(mainstate) {

//         mainstate.inited = true;

//       },

//       setData(mainstate, data) {

//         mainstate.data = data;

//       },

//       renderTarget(mainstate, target: MainStoreState['renderTarget']) {

//         mainstate.renderTarget = target;

//       },

//       layout(mainstate, data) {

//         mainstate.layout = data;

//       },

//       set404(mainstate) {

//         mainstate.data = { status: 404 };

//       },

//       setMedia(mainstate, data) {

//         mainstate.media = data;

//       },

//       setSettings(mainstate, data) {

//         mainstate.settings = data;

//       },

//       setApi(mainstate, data) {

//         mainstate.api = data;

//       },

//       setTranslation(mainstate, data) {

//         mainstate.translation = data;

//       },

//       setOverlay(mainstate, data) {

//         mainstate.overlay.content = data;
//         mainstate.overlay.active = true;

//       },

//       clearOverlay(mainstate) {

//         mainstate.overlay.content = {};

//       },

//       setContent(mainstate, content: any) {

//         mainstate.content = content;

//       },

//       setAvailableModules(mainstate, availableModules: any[]) {

//         mainstate.availableModules = availableModules;

//       },

//       setFullscreen(mainstate, fullscreen: boolean) {

//         mainstate.fullscreen = fullscreen;

//       },

//       setEditorActive(mainstate, active: string | number) {

//         mainstate.editor.active = active;

//       },

//     },

//     actions: {
//       hideOverlay() {

//         this.state.overlay.active = false;

//       },

//       getData(store, params: any) {

//         const call = new Call();
//         let apiLink: string = '/data';

//         if (params.link) {

//           apiLink = !params.id
//             ? `/data/${params.link}`
//             : `/data/${params.link}/${params.id}`;

//         }

//         return call.get('api', apiLink, {})
//           .then((data: Response) => {

//             this.commit('setData', data.r);

//           })
//           .catch((e) => {

//             console.error(e);

//           });

//       },

//       getContent(store, params: any) {

//         const call = new Call();

//         return call.get('api', `/data/link/${params.link}`, {})
//           .then((data: Response) => {

//             this.commit('setData', data.r);

//           })
//           .catch((e) => {

//             console.error(e, params.link);
//             if (params.link === 404) return;
//             this.commit('set404', {});

//           });

//       },

//       fullscreen(store, fullscreen: boolean) {

//         if (!document) return;

//         const { body } = document;

//         if (fullscreen) {

//           body.classList.add('fullscreen');

//         } else {

//           body.classList.remove('fullscreen');

//         }

//         store.commit('setFullscreen', state);

//       },

//     },
//   });

// }

export {
  state,
};
