import log from 'loglevel';

export default (store) => {

  const windowRef: any = window;
  // eslint-disable-next-line no-underscore-dangle
  const SSRState = windowRef.__INITIAL_STATE__;
  /**
     * if true we have a initial store and prerendered html
    */
  let SSR: boolean = false;

  /**
     * check if a state is stored and use it
     */
  if (SSRState) {

    store.replaceState(SSRState);
    SSR = true;

    log.info('%c[DESIGN]%cSSR ACTIVE', 'background: #3f2d56; color: #CCC;', 'padding: 10px');

  }

  return SSR;

};
