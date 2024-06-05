export enum fields {
    LITERATURE_LIST = 'LITERATURE_LIST',
    LITERATURE_DIALOG = 'LITERATURE_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
}

export enum fetchingTypes {
    GET_LITERATURE = 'GET_LITERATURE',
    DELETE_LITERATURE = 'DELETE_LITERATURE',
    UPDATE_LITERATURE = 'UPDATE_LITERATURE',
    CREATE_LITERATURE = 'CREATE_LITERATURE',
}

export enum literatureFields {
    ID = 'id',
    DESCRIPTION = 'description',
    DESCRIPTION_EBSCO = 'bib_reference',
}
export enum literatureEbscoFields {
    ID = 'accession_number',
    DESCRIPTION = 'bib_reference',
}
