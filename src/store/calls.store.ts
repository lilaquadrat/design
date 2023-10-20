import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuid } from 'uuid';
import GenericStore from '@interfaces/GenericStore.interface';
import hardCopy from '@mixins/hardCopy';
import CallsStoreState from './callStoreState.interface';

Vue.use(Vuex);

const state = {
  calls: {},
};
const CallsStore: GenericStore<CallsStoreState> = {
  namespaced: true,
  strict: true,
  state,
  mutations: {

    update(storeState, data) {


      storeState.calls[data.id].state = data.state;

    },

  },
  actions: {

    add(store) {

      const id = uuid();

      Vue.set(store.state.calls, id, { state: 'pending' });

      return id;

    },

  },
};

export {
  state,
  CallsStore,
};
