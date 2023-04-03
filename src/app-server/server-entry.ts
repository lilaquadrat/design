import { RenderContext } from '@lilaquadrat/studio/lib/interfaces';
import MainStoreState from '@store/mainStoreState.interface';
import createApp from './app-server';

export default (context: RenderContext & {rendered: () => void, state: MainStoreState}) => new Promise((resolve, reject) => {

  const { app, router, store } = createApp();

  router.push(context.url)
    .catch((e) => {

      console.error('ROUTE PUSH ERROR', e);

    });

  store.commit('setSettings', context.settings);
  store.commit('setData', context.data);
  store.commit('layout', context.layout);
  store.commit('setTranslation', context.translation);
  store.commit('setMedia', 'mobile');
  store.commit('setFullscreen', true);
  store.commit('renderTarget', context.renderTarget || 'web');
  store.commit('init');

  router.onReady(
    () => {

      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {

        return reject(new Error('ROUTE_NOT_FOUND'));

      }

      context.rendered = () => {

        context.state = store.state;

      };

      return resolve(app);

    },
    reject,
  );

})
  .catch((e) => {

    console.error(e);

  });
