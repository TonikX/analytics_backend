import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import get from 'lodash/get';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {useDispatch, useSelector} from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import actions from "../../../EducationalProgram/actions";
import {getCompetenceMatrix, getEducationalProgramCharacteristicId, getMatrixAcademicPlans} from "../../getters";
import {useStyles} from "./CompetenceMatrix.styles";
import {MATRIX_HEADINGS} from "./constants";
import IndicatorsDialog from "./IndicatorsDialog";
import {
    AcademicPlan, CommonCompetence,
    Competence,
    DisciplineModule,
    ModuleWorkProgram, ContentByAcademicPlanProps,
    WorkProgramChangeInDisciplineBlockModule,
    TableContentProps, CompetencesHeaderProps,
    AttachIndicatorProps, CompetencesRowProps,
} from "./types";
import {appRouter} from '../../../../service/router-service';

const EMPTY = '\u00A0';

type Node = [DisciplineModule, number];
const preOrder = (node: DisciplineModule, level = 0) => {
    let arr = [] as Node[];
    arr.push([node, level]);
    if (!node.childs) return [];
    node.childs.forEach((child) => {
        arr = arr.concat(preOrder(child, level + 1))
    });
    return arr;
};

const CompetencesCell = ({competences}: CompetencesHeaderProps) => {
    const classes = useStyles();
    const extractOnlyNumber = (str: string) => str.replace(/\D/g, '');
    return (
        <TableCell variant="head" className={classes.noPaddingCell}>
            <div className={classes.competenceHeader}>
                {
                    competences.map((el, index) => {
                            return (
                                <Tooltip
                                    key={index}
                                    title={el.name}
                                    className={classes.headerCell}
                                    arrow
                                >
                                    <div className={classes.competenceHeaderCell} key={index}>{extractOnlyNumber(el.number)}</div>
                                </Tooltip>)
                        }
                    )
                }
            </div>
        </TableCell>
    )
};

const CompetencesRow = (
    {keyCompetences, overProfCompetences, generalProfCompetences, profCompetences}: CompetencesRowProps
) => {
    return (
        <>
            <CompetencesCell competences={keyCompetences}/>
            <CompetencesCell competences={overProfCompetences}/>
            <CompetencesCell competences={generalProfCompetences}/>
            <CompetencesCell competences={profCompetences}/>
        </>
    )
};

const EmptyRow = () => {
    return (
        <>
            <TableCell>{EMPTY}</TableCell>
            <TableCell>{EMPTY}</TableCell>
            <TableCell>{EMPTY}</TableCell>
            <TableCell>{EMPTY}</TableCell>
        </>
    )
};

const ContentByAcademicPlan = (
    {
        attachIndicator,
        setIndicators,
        academicPlan,
        keyCompetences,
        profCompetences,
        overProfCompetences,
        generalProfCompetences,
    }: ContentByAcademicPlanProps) => {
    const classes = useStyles();

    const getCompetencesContent = (
        workProgram: ModuleWorkProgram,
        type: 'key' | 'prof' | 'over-prof' | 'general-prof',
        blockType: 'wp' | 'gia' | 'practice'
    ) => {
        // Хак для практик, у которых приходит null
        if (!workProgram.competences) return null;

        const ownCompetences = workProgram.competences.competences;

        let sourceCompetences: Competence[] = [];
        switch (type) {
            case 'key':
                sourceCompetences = keyCompetences;
                break;
            case 'prof':
                sourceCompetences = profCompetences;
                break;
            case 'general-prof':
                sourceCompetences = generalProfCompetences;
                break;
            case 'over-prof':
                sourceCompetences = overProfCompetences;
                break;
        }

        const intersect = (sourceCompetence: Competence) => {
            let intersects = false;
            for (const competence of ownCompetences) {
                if (competence.id === sourceCompetence.id) {
                    intersects = true;
                    break;
                }
            }

            return intersects;
        };

        const setModalData = (competence: { value: number; label: string }) => {
            attachIndicator({
                competence,
                workProgramId: blockType === 'wp' ? workProgram.id : undefined,
                practiceId: blockType === 'practice' ? workProgram.id : undefined,
            });
        };

        const getTooltipTitle = (sourceCompetence: Competence) => {
            const zuns = ownCompetences.find(it => it.id === sourceCompetence.id)?.zuns || [];
            return zuns.map((zun => zun.indicator.number)).join(" ")
        };

        const onItemCellClick = (sourceCompetence: Competence) => {
            if (intersect(sourceCompetence)) {
                const indicators = ownCompetences.find(it => it.id === sourceCompetence.id)?.zuns.map(it => {
                    return {
                        label: `${it.indicator.number} ${it.indicator.name}`,
                        value: it.id,
                    }
                }) || [];
                setIndicators(indicators);
            }
            setModalData({
                label: sourceCompetence.name,
                value: sourceCompetence.id,
            });
        };


        return <div className={classes.competenceCellHolder}>
            {
                sourceCompetences.map((sourceCompetence, index) => {
                    return (
                        <Tooltip
                            key={index}
                            title={getTooltipTitle(sourceCompetence)}
                            className={classes.competenceCell}
                            arrow
                        >
                            <div className={
                                intersect(sourceCompetence) ? classes.intersection : classes.noIntersection
                            } onClick={() => onItemCellClick(sourceCompetence)}>x
                            </div>
                        </Tooltip>
                    )
                })
            }
        </div>
    };

    const getChildContent = (block: DisciplineModule, name: string) => {
        if (!block.childs) {
            return <>
                <TableRow>
                    <TableCell>{block.name}</TableCell>
                    <EmptyRow/>
                </TableRow>
            </>;
        }

        const arr = preOrder(block);

        return (
            <>
                {arr.map(([item, level]) => {
                    const stars = new Array(level).fill('⦁').join('');
                    return getSingleContent(item, name, stars);
                })}
            </>
        );
    };

    const getSingleContent = (moduleBlock: DisciplineModule, name: string, stars = '') => {
        const shouldHighlight = !Boolean(stars);
        return (
            <>
                <TableRow
                    selected={shouldHighlight} className={cn(classes.sectionRow, shouldHighlight ? classes.selected : '')}
                >
                    <TableCell>
                        <div className={shouldHighlight ? classes.moduleName : ''}>{`${stars} ${moduleBlock.name}`}</div>
                    </TableCell>
                    {
                        shouldHighlight ? <CompetencesRow
                            overProfCompetences={overProfCompetences}
                            keyCompetences={keyCompetences}
                            profCompetences={profCompetences}
                            generalProfCompetences={generalProfCompetences}
                        /> : <EmptyRow/>
                    }
                </TableRow>
                {moduleBlock.change_blocks_of_work_programs_in_modules.map((block: WorkProgramChangeInDisciplineBlockModule) => {
                    // Хак для новых практик
                    // const targetBlock = (name === "Практика" && !block.work_program.length ? block.practice : block.work_program) || [];
                    const wpBlock = block.work_program
                    const giaBlock = block.gia
                    const practiceBlock = block.practice
                    const blockType = wpBlock.length ? 'wp' : giaBlock?.length ? 'gia' : practiceBlock?.length ? 'practice' : null
                    const targetBlock = blockType === 'wp' ? wpBlock : (blockType === 'gia' ? giaBlock : practiceBlock);
                    const linkCreator = blockType === 'wp' ? appRouter.getWorkProgramLink
                      : blockType === 'gia' ? appRouter.getFinalCertificationLink : appRouter.getPracticeLink as (id: number) => string

                    if (!blockType) return null;

                    return targetBlock?.map((block: ModuleWorkProgram, elIndex: number) =>
                        <TableRow key={`wp-${elIndex}`}>
                            <TableCell className={classes.rowWithPadding}>
                                <Link
                                    target="_blank"
                                    to={linkCreator(block.id)}
                                >
                                    {block.title}
                                </Link>
                            </TableCell>
                            <TableCell
                                className={classes.noPaddingCells}>{getCompetencesContent(block, 'key', blockType)}</TableCell>
                            <TableCell
                                className={classes.noPaddingCells}>{getCompetencesContent(block, 'over-prof', blockType)}</TableCell>
                            <TableCell
                                className={classes.noPaddingCells}>{getCompetencesContent(block, 'general-prof', blockType)}</TableCell>
                            <TableCell
                                className={classes.noPaddingCells}>{getCompetencesContent(block, 'prof', blockType)}</TableCell>
                        </TableRow>);
                })}
            </>
        )
    };

    return <>
        {academicPlan.discipline_blocks_in_academic_plan.map((item, itemIndex) =>
            <React.Fragment key={itemIndex}>
                {/*Учебный план*/}
                <TableRow className={classes.tableHeading}>
                    <TableCell align="center" colSpan={7} style={{color: '#fff'}}>{item.name}</TableCell>
                </TableRow>
                {/*Модули учебного плана*/}
                {item.modules_in_discipline_block.map((moduleBlock: DisciplineModule, blockIndex: number) =>
                    <React.Fragment key={blockIndex}>
                        {
                            moduleBlock.childs ? getChildContent(moduleBlock, moduleBlock.name) : getSingleContent(moduleBlock, moduleBlock.name)
                        }
                    </React.Fragment>)}
            </React.Fragment>)}
    </>
};

const transformCompetences = (items: CommonCompetence[]): Competence[] => items.map(it => it.competence);

const TableContent = (tableContentProps: TableContentProps) => {
    const academicPlans = useSelector(getMatrixAcademicPlans);

    return (
        <>
            {academicPlans.map((plan: AcademicPlan, index: number) => {
                return <ContentByAcademicPlan
                    academicPlan={plan}
                    key={`content-by-plan-${index}`}
                    {...tableContentProps}
                />;
            })}
        </>
    )
};

export default () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const competenceMatrixId = useSelector(getEducationalProgramCharacteristicId);
    const [isOpen, setIsOpen] = useState(false);
    const [defaultCompetence, setDefaultCompetence] = useState<{value: number; label: string;}|undefined>();
    const [indicators, setIndicators] = useState([] as { label: string; value: number } []);
    const [workProgramId, setWorkProgramId] = useState(-1);
    const [practiceId, setPracticeId] = useState(-1);

    useEffect(() => {
        dispatch(actions.getCompetenceMatrix(competenceMatrixId));
    }, []);

    const matrix = useSelector(getCompetenceMatrix);
    if (isEmpty(matrix)) {
        return null;
    }

    const resetDialog = () => {
        setIndicators([]);
        setIsOpen(false);
    };

    const attachIndicator = (props: AttachIndicatorProps) => {
        if (props.workProgramId) {
            setWorkProgramId(props.workProgramId);
            setPracticeId(-1);
        }
        if (props.practiceId) {
            setPracticeId(props.practiceId);
            setWorkProgramId(-1);
        }
        // @ts-ignore
        setDefaultCompetence(props.competence);
        setIsOpen(true);
    };

    const deleteZun = (id: number) => {
        setIndicators([...indicators.filter(it => it.value !== id)])
    };

    const keyCompetences = transformCompetences(get(matrix, 'key_competences'));
    const profCompetences = transformCompetences(get(matrix, 'pk_competences'));
    const generalProfCompetences = transformCompetences(get(matrix, 'general_prof_competences'));
    const overProfCompetences = transformCompetences(get(matrix, 'over_prof_competences'));

    return (
        <div>
            <TableContainer>
                <Table size='small' className={classes.tableHeight}>
                    <TableHead>
                        <TableRow>
                            {
                                MATRIX_HEADINGS.map((heading, index) => <TableCell
                                    className={classes.competenceTableHeading} key={index}>{heading}</TableCell>)
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.competenceTableHeading} variant="head">{EMPTY}</TableCell>
                            <CompetencesRow
                                overProfCompetences={overProfCompetences}
                                keyCompetences={keyCompetences}
                                profCompetences={profCompetences}
                                generalProfCompetences={generalProfCompetences}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.table}>
                        <TableContent
                            setIndicators={setIndicators}
                            attachIndicator={attachIndicator}
                            keyCompetences={keyCompetences}
                            profCompetences={profCompetences}
                            generalProfCompetences={generalProfCompetences}
                            overProfCompetences={overProfCompetences}
                        />
                    </TableBody>
                </Table>
            </TableContainer>

            {isOpen ? (
              <IndicatorsDialog
                isOpen={isOpen}
                handleClose={resetDialog}
                addedIndicators={indicators}
                defaultCompetence={defaultCompetence}
                workProgramId={workProgramId}
                practiceId={practiceId}
                onDeleteZun={deleteZun}
              />
            ) : null}
        </div>
    )
}
