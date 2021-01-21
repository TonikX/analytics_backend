import AnalyticsService from "../../service/analytics-service";
import {RolesFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class RolesService extends AnalyticsService{
    getRoles(currentPage: number, searchQuery: Object, sortingField: string, sortingMode: SortingType, role: string|null){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/roles?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&role=${role || ''}`);
    }

    deleteRole(itemId: number){
        return this.delete(`/api/role/delete/${itemId}`);
    }

    createRole(item: any){
        const formData = new FormData();

        formData.append(RolesFields.ROLE, item[RolesFields.ROLE]);
        formData.append(RolesFields.TITLE, item[RolesFields.TITLE]);

        return this.post(`/api/role/create`, formData);
    }

    updateRole(item: any){
        const id = item[RolesFields.ID];

        return this.patch(`/api/role/update/${id}`, item);
    }

    getRole(id: any){
        return this.get(`/api/role/detail/${id}`);
    }

    getSkills(id: number, currentPage: number, searchQuery: Object, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/skillsofroleinrole/${id}?page=${currentPage}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteSkill(itemId: number){
        return this.delete(`/api/skillsofroleinrole/delete/${itemId}`);
    }

    createSkill(item: any){
        const formData = new FormData();

        formData.append(RolesFields.LEVEL, item[RolesFields.LEVEL]);
        formData.append(RolesFields.ITEM, item[RolesFields.ITEM][RolesFields.ID]);
        formData.append(RolesFields.ROLE, item[RolesFields.ROLE]);

        return this.post(`/api/skillsofroleinrole/create`, formData);
    }

    updateSkill(item: any){
        const id = item[RolesFields.ID];

        return this.patch(`/api/skillsofroleinrole/update/${id}`, {
            [RolesFields.LEVEL]: item[RolesFields.LEVEL],
            [RolesFields.ITEM]: item[RolesFields.ITEM][RolesFields.ID],
        });
    }
}

export default RolesService;