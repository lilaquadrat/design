import { Editor } from '@lila2/studio/lib/interfaces';

export default interface ChildData {
    data: {
        [key: Editor['id']]: Editor
    }
    index: string[]
}
