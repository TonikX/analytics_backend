import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../EducationalProgram/actions";
import {getCompetenceMatrix, getEducationalProgramCharacteristicId} from "../../getters";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import get from "../index";
import {CompetenceFields} from "../../../Competences/enum";
import {IndicatorType} from "../../../Indicators/types";
import {IndicatorsFields} from "../../../Indicators/enum";
import Table from "@material-ui/core/Table";

type Discipline = {
    name: string;
    modules_in_discipline_block: DisciplineModule[]
};

enum DISCIPLINE_MODULE_TYPE {
    universal_module = 'universal_module',
    universal_fundamental_module = 'universal_fundamental_module',
    physical_culture = 'physical_culture',
    philosophy_thinking = 'philosophy_thinking',
    digital_culture = 'digital_culture',
    entrepreneurial_culture = 'entrepreneurial_culture',
    soft_skills = 'soft_skills',
    ognp = 'ognp',
    natural_science_module = 'natural_science_module',
    general_professional_module = 'general_professional_module',
    elective_module = 'elective_module',
    interdisciplinary_module_of_the_faculty = 'interdisciplinary_module_of_the_faculty',
    faculty_module = 'faculty_module',
    math_module = 'math_module',
    digital_culture_in_professional_activities = 'digital_culture_in_professional_activities',
    specialization_module = 'specialization_module',
    gia = 'gia',
    practice = 'practice',
    optional_disciplines = 'optional_disciplines',
    profile_professional_module = 'profile_professional_module',
    f_ognp = 'f_ognp'
}

enum CHANGE_TYPE {
    REQUIRED = 'Required',
    OPTIONALLY = 'Optionally',
    OGNP_SET = 'OGNP_set',
    SET_SPECIALIZATION = 'Set_specialization',
    FACULTATIV = 'Facultativ',
    OPT_SPECIALIZATION = 'Opt_specialization',
    LANG = 'Lang',
    MODULE = 'Module',
}

type DisciplineModule = {
    name: string;
    type: typeof DISCIPLINE_MODULE_TYPE;
    change_blocks_of_work_programs_in_modules: WorkProgramChangeInDisciplineBlockModule[]
}

type Competences = {
    competences: any[]
}

type ModuleWorkProgram = {
    id: number;
    title: string;
    competences: Competences
}

type WorkProgramChangeInDisciplineBlockModule = {
    change_type: typeof CHANGE_TYPE;
    credit_units: string;
    work_program: ModuleWorkProgram[]
};

type AcademicPlan = {
    academic_plan: string;
    discipline_blocks_in_academic_plan: Discipline[]
}

const getKeyCompetences = () => {
    return null;
}

const getContentByAcademicPlan = (academicPlan: AcademicPlan) => {
    return academicPlan.discipline_blocks_in_academic_plan.map((item, index) => {
        return <TableRow>
            <TableCell>
                <Table>
                    <TableHead>
                        {item.name}
                    </TableHead>
                    <TableBody>
                        {
                            item.modules_in_discipline_block.map((module) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>{module.name}</TableRow>
                                                    {module.change_blocks_of_work_programs_in_modules.map((block) => {
                                                        return block.work_program.map((wp) => {
                                                            return <TableRow>{wp.title}</TableRow>
                                                        })
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableCell>
        </TableRow>
    });
};

const getTableContent = (matrix: any) => {
    if (!matrix.wp_matrix) {
        return null;
    }

    return matrix.wp_matrix.map((item: any) => {
        return getContentByAcademicPlan(item);
    })
};
export default () => {
    const dispatch = useDispatch();
    const competenceMatrixId = useSelector(getEducationalProgramCharacteristicId);
    const competenceMatrix = useSelector(getCompetenceMatrix);
    useEffect(() => {
        dispatch(actions.getCompetenceMatrix(competenceMatrixId));
    }, []);
    const content = getTableContent(competenceMatrix);
    return (
        <Table stickyHeader size='small'>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Код из Банка дисциплин
                    </TableCell>
                    <TableCell>
                        № по плану
                    </TableCell>
                    <TableCell>
                        Наименование модулей, дисциплин, практики и аттестации
                    </TableCell>
                    <TableCell>
                        Ключевые компетенции (социально-личностных и общекультурных)
                    </TableCell>
                    <TableCell>
                        Надпрофессиональные компетенции (Soft Skills)
                    </TableCell>
                    <TableCell>
                        Общепрофессиональные компетенции (Basic Professional Skills)
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {content}
            </TableBody>
        </Table>
    )
}
