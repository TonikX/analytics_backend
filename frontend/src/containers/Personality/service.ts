import AnalyticsService from "../../service/analytics-service";
import { groupType } from "./AddModal/types";

class PersonalityServices extends AnalyticsService{
    getPersonality(persId: number){
        return this.get(`api/user_management/crud_single_user/${persId}`)
    }

    updateGroups({newGroups, id}: any) {
        return this.patch(`/api/user_management/crud_single_user/${id}`,{
            groups: newGroups
        })
    }
}

export default PersonalityServices;