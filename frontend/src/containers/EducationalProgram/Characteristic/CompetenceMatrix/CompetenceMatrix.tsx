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
    academicPlan: AcademicPlan; keyCompetences: any
}
const ContentByAcademicPlan = ({academicPlan, keyCompetences}: Props) => {
    const classes = useStyles();
    const content = academicPlan.discipline_blocks_in_academic_plan.map((item, index) => {
        const moduleRows = (
            item.modules_in_discipline_block.map((moduleBlock: any, index: number) => {
                const moduleContent = (
                    moduleBlock.change_blocks_of_work_programs_in_modules.map((block: any) => {
                        return block.work_program.map((wp: any) => {
                            return <TableRow>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>{wp.title}</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        })
                    })
                );

                return (
                    <>
                        <TableRow
                            key={index} selected={true}
                        >
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>{moduleBlock.name}</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                        {moduleContent}
                    </>
                );
            })
        );

        return (
            <>
                <TableRow className={classes.tableHeading}>
                    <TableCell align="center" colSpan={6}>{item.name}</TableCell>
                </TableRow>
                {moduleRows}
            </>
        );
    });
    return (
        <>{content}</>
    )
};

const TableContent = () => {
    const matrix = useSelector(getCompetenceMatrix);
    if (isEmpty(matrix)) {
        return null;
    }

    console.log(matrix);

    const keyCompetences = get(matrix, 'key_competences');
    const competenceMatrix = get(matrix, 'wp_matrix');

    return (
        <>
            {competenceMatrix.map((item: any) => {
                return <ContentByAcademicPlan academicPlan={item} keyCompetences={keyCompetences}/>;
            })}
        </>
    )
};

export default () => {
    const dispatch = useDispatch();
    const competenceMatrixId = useSelector(getEducationalProgramCharacteristicId);
    useEffect(() => {
        dispatch(actions.getCompetenceMatrix(competenceMatrixId));
    }, []);
    return (
        <Table stickyHeader size='small'>
            <TableHead>
                <TableRow>
                    {
                        MATRIX_HEADINGS.map((heading, index) => <TableCell key={index}>{heading}</TableCell>)
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                <TableContent/>
            </TableBody>
        </Table>
    )
}
