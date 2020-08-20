import BaseService from "../../service/base-service";
import {EntityToEntityFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class EntityToEntityServices extends BaseService{
    getEntitiesToEntities(currentPage: number, searchQuery: Object, sortingField: string, sortingMode: SortingType, domainId: number|null){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/relation?page=${currentPage}&item1=${searchQuery[EntityToEntityFields.ITEM1]}&item2=${searchQuery[EntityToEntityFields.ITEM2]}&relation=${searchQuery[EntityToEntityFields.RELATION]}&ordering=${sortingSymbol}${sortingField}&domain=${domainId || ''}`);
    }

    deleteEntityToEntity(itemId: number){
        return this.delete(`/api/relation/detail/${itemId}`);
    }

    createEntityToEntity(item: any){
        const formData = new FormData();

        return this.post(`/api/relation/create`, formData);
    }

    updateEntityToEntity(item: any){
        const formData = new FormData();
        const id = item[EntityToEntityFields.ID];

        return this.patch(`/api/relation/update/${id}`, formData);
    }
}

export default EntityToEntityServices;