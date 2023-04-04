export type SortingType = Types.ASC | Types.DESC | '';

export enum Types {
    ASC = 'asc',
    DESC = 'desc'
}

export interface SortingButtonProps {
    mode?: string;
    changeMode: Function;
}
