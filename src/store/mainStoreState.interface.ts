import GenericState from '@interfaces/GenericState.interface';

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
    availableModules: any[],
    editor: {
        content?: any,
        active?: string | number | false,
    },
}
