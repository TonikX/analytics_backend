import AnalyticsService from "../../service/analytics-service";
import {EntityToEntityFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class EntityToEntityServices extends AnalyticsService{
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

    formData.append(EntityToEntityFields.ITEM1, item[EntityToEntityFields.ITEM1].id);
    formData.append(EntityToEntityFields.ITEM2, item[EntityToEntityFields.ITEM2].id);
    formData.append(EntityToEntityFields.RELATION, item[EntityToEntityFields.RELATION]);

    return this.post(`/api/relation/create`, formData);
  }

  updateEntityToEntity(item: any){
    const id = item[EntityToEntityFields.ID];

    return this.patch(`/api/relation/update/${id}`, item);
  }
}

export default EntityToEntityServices;