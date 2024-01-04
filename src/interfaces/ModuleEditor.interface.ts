export default interface ModuleEditor {

    id: string;

    type: string;

    changed?: boolean;

    variant?: string[];

    dataStrings?: string[];
};
