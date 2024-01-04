import { Store } from 'vuex';
import GenericState from './GenericState.interface';

export default interface GenericStore<T extends GenericState> {
  namespaced: boolean;
  strict: boolean;

  state: T;

  mutations: {
    [key: string]: (state: T, data: any) => void;
  };

  actions: {
    [key: string]: (store: Store<T>, data: any) => Promise<any> | void;
  };

  getters?: {
    [key: string]: (store: Store<T>, data: any) => string | number | {[key: string]: any};
  };
};
