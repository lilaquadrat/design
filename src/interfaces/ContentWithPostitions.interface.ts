import { Editor, ModuleGeneric } from '@lila2/studio/lib/interfaces';

export default interface ContentWithPositions {
    settings: Editor['settings']
    top: ModuleGeneric[]
    content: ModuleGeneric[]
    bottom: ModuleGeneric[]
};
