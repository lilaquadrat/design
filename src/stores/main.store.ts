import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Content } from '@lilaquadrat/studio/lib/interfaces';

export const useMainStore = defineStore('main', () => {

  const data = ref<Partial<Content>>({});
  const layout = ref<Partial<Content>>({});
  const fullscreen = ref<boolean>(false);

  function setData (value: Partial<Content>) {

    data.value = value;

  }

  function setFullscreen (value: boolean) {

    fullscreen.value = value;

  }

  return { 
    setData, 
    data, 
    layout, 
    fullscreen, 
    setFullscreen 
  }

})


export default useMainStore;