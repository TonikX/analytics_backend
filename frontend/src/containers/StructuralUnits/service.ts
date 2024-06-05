import AnalyticsService from "../../service/analytics-service";
import {structuralUnitFields, structuralUnitUserFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class StructuralUnitsService extends AnalyticsService{
    getStructuralUnits(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/structural_unit_set/?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getStructuralUnit(id: number){
        return this.get(`/api/structural_unit_set/${id}`);
    }

    addUserToStructuralUnit(data: any){
        return this.post(`/api/user_structural_unit_set/`, {
            structural_unit: data[structuralUnitUserFields.STRUCTURAL_UNIT],
            status: data[structuralUnitUserFields.STATUS],
            user: data.user?.id
        });
    }

    removeUserFromStructuralUnit(id: number){
        return this.delete(`/api/user_structural_unit_set/${id}`);
    }

    updateUserFromStructuralUnit(data: any){
        return this.patch(`/api/user_structural_unit_set/${data.id}/`, {
            structural_unit: data[structuralUnitUserFields.STRUCTURAL_UNIT],
            status: data[structuralUnitUserFields.STATUS],
            user: data.user?.id
        });
    }

    deleteStructuralUnit(id: number){
        return this.delete(`/api/structural_unit_set/${id}`);
    }

    createStructuralUnit(StructuralUnit: any){
        const formData = new FormData();

        formData.append(structuralUnitFields.TITLE, StructuralUnit[structuralUnitFields.TITLE]);

        return this.post(`api/structural_unit_set/`, formData);
    }

    changeStructuralUnit(StructuralUnit: any){
        const formData = new FormData();
        const id = StructuralUnit[structuralUnitFields.ID];

        formData.append(structuralUnitFields.TITLE, StructuralUnit[structuralUnitFields.TITLE]);

        return this.put(`/api/structural_unit_set/${id}/`, formData);
    }
}

export default StructuralUnitsService;
