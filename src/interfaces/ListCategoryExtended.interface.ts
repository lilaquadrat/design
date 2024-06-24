import { ListCategory } from '@lilaquadrat/studio/lib/interfaces';

type ListCategoryExtended = ListCategory &
    {
        used?: number
        available?: number
        percentUsed?: number
        percentAvailable?: number
    };

export default ListCategoryExtended;
