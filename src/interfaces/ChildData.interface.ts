import { Editor } from '@lilaquadrat/studio/lib/interfaces';

export default interface ChildData {
    data: {
        [key: Editor['id']]: Editor
    }
    index: string[]
}
