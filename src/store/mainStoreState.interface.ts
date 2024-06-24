import GenericState from '@interfaces/GenericState.interface';
import StudioSDK from '@libs/StudioSDK';
import { DesignModule } from '@lilaquadrat/studio/lib/interfaces';

export default interface MainStoreState extends GenericState {
    data: any,
    title: string,
    media: string,
    description: string,
    partials: any,
    settings: any,
    translation: any,
    overlay: {
        content: any,
        active: boolean,
    },
    content: any,
    fullscreen: boolean,
    availableModules: DesignModule[],
    editor: {
        content?: any,
        active?: string,
    },
    renderTarget?: 'pdf' | 'web'
    api?: {
        mode?: StudioSDK['mode'],
        company?: string,
        project?: string,
        customEndpoints?: {
            api: string,
            media: string
        }
    }
}
