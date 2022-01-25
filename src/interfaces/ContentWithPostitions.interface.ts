import { Editor, ModuleGeneric } from '@lilaquadrat/studio/lib/interfaces';

export default interface ContentWithPositions {
    settings: Editor['settings']
    top: ModuleGeneric[]
    content: ModuleGeneric[]
    bottom: ModuleGeneric[]
}
