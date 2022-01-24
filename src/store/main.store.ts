import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Call, Response } from 'src/libs/lila-call';
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
  editor: {
    content: null,
    active: false,
  },
};

function storeFactory(): Store<MainStoreState> {

  return new Vuex.Store({
    state,
    modules: {},
    mutations: {

      init(mainstate) {

        mainstate.inited = true;

      },

      setData(mainstate, data) {

        mainstate.data = data;

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

      getData(store, params: any) {

        const call = new Call();
        let apiLink: string = '/data';

        if (params.link) {

          apiLink = !params.id
            ? `/data/${params.link}`
            : `/data/${params.link}/${params.id}`;

        }

        return call.get('api', apiLink, {})
          .then((data: Response) => {

            this.commit('setData', data.r);

          })
          .catch((e) => {

            console.error(e);

          });

      },

      getContent(store, params: any) {

        const call = new Call();

        return call.get('api', `/data/link/${params.link}`, {})
          .then((data: Response) => {

            this.commit('setData', data.r);

          })
          .catch((e) => {

            console.error(e, params.link);
            if (params.link === 404) return;
            this.commit('set404', {});

          });

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

}

export default storeFactory();

export {
  state,
  storeFactory,
};
