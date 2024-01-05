import type overlayBackgroundPartialVue from '@/components/partials/overlay-background.partial.vue';
import type checkboxPartial from '@/components/partials/checkbox.partial.vue';
import type buttonPartialVue from '@/components/partials/button.partial.vue';
import type dialogPartial from '@/components/partials/dialog.partial.vue';

declare module 'vue' {
    export interface GlobalComponents {
        RouterLink: typeof import('vue-router')['RouterLink']
        RouterView: typeof import('vue-router')['RouterView']
        'lila-overlay-background-partial': typeof overlayBackgroundPartialVue
        'lila-checkbox-partial': typeof checkboxPartial
        'lila-button-partial': typeof buttonPartialVue
        'lila-dialog-partial': typeof dialogPartial
    }
}

export { }