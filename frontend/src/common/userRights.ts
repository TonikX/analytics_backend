export const EXPERTISE_MASTER = "expertise_master";
export const EXPERTISE_MEMBER = "expertise_member";
export const EXPERT = "experts";

export const ROLES_AND_PROFESSIONS_MASTER = "roles_and_professions_master";

export const OP_LEADER = "op_leader";
export const OP_DEVELOPER = "op_developer";
export const ITEMS_EDITOR = "items_editor";
export const ACADEMIC_PLAN_DEVELOPER = "academic_plan_developer";
export const EDUCATION_PLAN_DEVELOPER = "education_plan_developer";
export const BLOCK_MODULE_EDITOR = "blockmodule_editor";

export const EXPERTISE_GROUP = [EXPERTISE_MASTER, EXPERTISE_MEMBER, EXPERT];

export const OP_GROUP = [OP_LEADER, OP_DEVELOPER, ACADEMIC_PLAN_DEVELOPER];

export const PROFESSIONS_GROUP = [EXPERT, ROLES_AND_PROFESSIONS_MASTER];

export const CHARACTERISTIC_GROUP = [EXPERTISE_MASTER, ACADEMIC_PLAN_DEVELOPER, EDUCATION_PLAN_DEVELOPER, OP_LEADER];

export const isUserInExpertiseGroup = (groups: Array<string>) => {
    return groups.some(group => Boolean(EXPERTISE_GROUP.indexOf(group)));
}

export const isUserInOpGroup = (groups: Array<string>) => {
    return groups.some(group => OP_GROUP.indexOf(group) !== -1);
}

export const isUserInItemsEditorGroup = (groups: Array<string>) => {
    return groups.some(group => group === ITEMS_EDITOR);
}

export const isUserCanSeeProfessions = (groups: Array<string>) => {
    return groups.includes(ROLES_AND_PROFESSIONS_MASTER);
}

export const isUserCanSeeCharacteristic = (groups: Array<string>) => {
    return groups.some(group => CHARACTERISTIC_GROUP.indexOf(group) !== -1);
}

export const isUserCanSeeEducationalModules = (groups: Array<string>) => {
    return groups.some(group => group === BLOCK_MODULE_EDITOR);
}

export const isUserExpertiseMaster = (groups: Array<string>) => {
    return groups.includes(EXPERTISE_MASTER);
}