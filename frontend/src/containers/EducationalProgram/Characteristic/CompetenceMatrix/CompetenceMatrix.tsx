import React, {useEffect} from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {useDispatch, useSelector} from "react-redux";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import actions from "../../../EducationalProgram/actions";
import {getCompetenceMatrix, getEducationalProgramCharacteristicId} from "../../getters";
import {useStyles} from "./CompetenceMatrix.styles";
import {MATRIX_HEADINGS} from "./constants";

type Props = {
    academicPlan: AcademicPlan;
    keyCompetences: Competence[];
}
const ContentByAcademicPlan = ({academicPlan, keyCompetences}: Props) => {
    const classes = useStyles();
    const content = academicPlan.discipline_blocks_in_academic_plan.map((item, itemIndex) => {
        const moduleRows = (
            item.modules_in_discipline_block.map((moduleBlock: DisciplineModule, blockIndex: number) => {
                const moduleContent = (
                    moduleBlock.change_blocks_of_work_programs_in_modules.map((block: WorkProgramChangeInDisciplineBlockModule, wpBlockIndex: number) => {
                        return block.work_program.map((wp: ModuleWorkProgram, elIndex: number) => {
                            return <TableRow key={`wp-${elIndex}`}>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell className={classes.rowWithPadding}>{wp.title}</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        })
                    })
                );

                return (
                    <React.Fragment key={blockIndex}>
                        <TableRow
                            key={`row-${blockIndex}`} selected={true}
                        >
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>{moduleBlock.name}</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                        {moduleContent}
                    </React.Fragment>
                );
            })
        );

        return (
            <React.Fragment key={itemIndex}>
                <TableRow className={classes.tableHeading}>
                    <TableCell align="center" colSpan={6}>{item.name}</TableCell>
                </TableRow>
                {moduleRows}
            </React.Fragment>
        );
    });
    return (
        <>{content}</>
    )
};

function transformCompetences<T>(rawCompetences: T[], objectField: keyof T): Competence[] {
    const result: Competence[] = [];
    for (const competence of rawCompetences) {
        const items = competence[objectField];
        // @ts-ignore
        for (const item of items) {
            result.push(item.competence);
        }
    }

    return result;
}


const TableContent = () => {
    const matrix = useSelector(getCompetenceMatrix);
    if (isEmpty(matrix)) {
        return null;
    }

    const keyCompetences = transformCompetences<KeyCompetence>(get(matrix, 'key_competences'), 'competence_in_group_of_key_competences');
    const competenceMatrix = get(matrix, 'wp_matrix');

    return (
        <>
            {competenceMatrix.map((plan: AcademicPlan, index: number) => {
                return <ContentByAcademicPlan academicPlan={plan} keyCompetences={keyCompetences} key={index}/>;
            })}
        </>
    )
};

type CompetencesHeaderProps = {
    competences: Competence[];
}
const CompetencesHeader = ({competences}: CompetencesHeaderProps) => {
    const classes = useStyles();
    return (
        <TableCell variant="head">
            <div className={classes.competenceHeader}>
                {
                    competences.map((el, index) =>
                        <div className={classes.competenceHeaderCell}  key={index}>{el.number}</div>
                    )
                }
            </div>
        </TableCell>
    )
};

export default () => {
    const dispatch = useDispatch();
    const competenceMatrixId = useSelector(getEducationalProgramCharacteristicId);
    const classes = useStyles();
    useEffect(() => {
        dispatch(actions.getCompetenceMatrix(competenceMatrixId));
    }, []);

    const matrix = useSelector(getCompetenceMatrix);
    if (isEmpty(matrix)) {
        return null;
    }

    const keyCompetences = transformCompetences<KeyCompetence>(get(matrix, 'key_competences'), 'competence_in_group_of_key_competences');
    const profCompetences = transformCompetences<ProfCompetence>(get(matrix, 'general_prof_competences'), 'competence_in_group_of_general_prof_competences');
    const overProfCompetences = transformCompetences<OverProfCompetence>(get(matrix, 'over_prof_competences'), 'competence_in_group_of_over_prof_competences');

    return (
        <Table stickyHeader size='small'>
            <TableHead>
                <TableRow>
                    {
                        MATRIX_HEADINGS.map((heading, index) => <TableCell key={index}>{heading}</TableCell>)
                    }
                </TableRow>
                <TableRow>
                    <TableCell variant="head">&nbsp;</TableCell>
                    <TableCell variant="head">&nbsp;</TableCell>
                    <TableCell variant="head">&nbsp;</TableCell>
                    <CompetencesHeader competences={keyCompetences}/>
                    <CompetencesHeader competences={profCompetences}/>
                    <CompetencesHeader competences={overProfCompetences}/>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableContent/>
            </TableBody>
        </Table>
    )
}
