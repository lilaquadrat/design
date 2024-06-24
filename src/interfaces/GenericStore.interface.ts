import StudioSDK from '@libs/StudioSDK';
import {
  GetterTree, MutationTree, ActionTree,
} from 'vuex';
import GenericState from './GenericState.interface';

export default interface GenericStore<T extends GenericState> {
  namespaced: boolean;
  strict: boolean;

  state: T;

  mutations: MutationTree<T>;

  actions: ActionTree<T, any>;

  getters?: GetterTree<T, any>;

  sdkOptions?: () => StudioSDK['options']
}
