import { Store } from 'vuex';

export default class StoreClass {

  $store: Store<any>;

  constructor(store?: Store<any>) {

    if (store) this.$store = store;

  }

  injectStore(store: Store<any>) {

    this.$store = store;

  }

}
