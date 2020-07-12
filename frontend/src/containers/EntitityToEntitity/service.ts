import BaseService from "../../service/base-service";
import {EntityToEntityFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class TrainingEntitiesServices extends BaseService{
    getTrainingEntities(currentPage: number, searchQuery: Object, sortingField: string, sortingMode: SortingType, domainId: number|null){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/relation?page=${currentPage}&item1=${searchQuery[EntityToEntityFields.ITEM1]}&item2=${searchQuery[EntityToEntityFields.ITEM2]}&relation=${searchQuery[EntityToEntityFields.RELATION]}&ordering=${sortingSymbol}${sortingField}&domain=${domainId || ''}`);
    }

    deleteTrainingEntities(itemId: number){
        return this.delete(`/api/item/detail/${itemId}`);
    }

    createTrainingEntities(item: any){
        const formData = new FormData();

        return this.post(`/api/item/create`, formData);
    }

    updateTrainingEntities(item: any){
        const formData = new FormData();
        const id = item[EntityToEntityFields.ID];

        return this.patch(`/api/item/detail/${id}`, formData);
    }
}

export default TrainingEntitiesServices;