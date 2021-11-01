import React from 'react';

import {withRouter, Link} from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import get from "lodash/get";

import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TableBody from '@material-ui/core/TableBody';
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import WorkProgramStatus from "../../../components/WorkProgramStatus/WorkProgramStatus";
import {appRouter} from "../../../service/router-service";
import AddExpertModal from './AddExpertModal';

import {ExpertiseProps} from "./types";
import {ExpertisesFields, UserExpertResult, fields, userStatusesInExFields} from "../enum";
import {WorkProgramGeneralFields} from "../../WorkProgram/enum";

import connect from './Expertise.connect';
import styles from './Expertise.styles';

class Expertise extends React.Component<ExpertiseProps> {
    componentDidMount() {
        const expertiseId = get(this, 'props.match.params.id');

        this.props.actions.getExpertise(expertiseId);
    }

    handleOpenExpertModal = () => {
        this.props.actions.openAddExpertModal();
    }

    handleClickDelete = (userId: number) => () => {
        this.props.actions.removeExpertFromExpertise(userId);
    }

    handleApproveExpertise = () => {
        this.props.actions.approveExpertise();
    }

    handleSendToRework = () => {
        this.props.actions.sendExpertiseForRework();
    }

    render() {
        let canApproveWP
        const {classes, expertise} = this.props;

        const experts = get(expertise, ExpertisesFields.EXPERTS_USERS_IN_RPD, [])
            .filter((item: any) => get(item, "stuff_status") === 'AU' || get(item, "stuff_status") === 'EX');

        const isExpertiseStatusEX = get(expertise, ExpertisesFields.STATUS) === "EX"
        if (get(expertise, `${fields.USER_STATUS_IN_EX}.${userStatusesInExFields.EX_MASTER}`) ||
            get(expertise, `${fields.USER_STATUS_IN_EX}.${userStatusesInExFields.EX_MEMBER}`) ||
            get(expertise, `${fields.USER_STATUS_IN_EX}.${userStatusesInExFields.STRUCTURAL_LEADER}`)) {
            canApproveWP =
                isExpertiseStatusEX
                && (
                    get(expertise, `${fields.USER_STATUS_IN_EX}.${userStatusesInExFields.EX_MASTER}`) ||
                    !get(expertise, `${fields.USER_STATUS_IN_EX}.${userStatusesInExFields.EX_MEMBER}`)
                )
        } else {
            canApproveWP = false
        }
        const canAddDeleteExperts = 
            isExpertiseStatusEX
            && (
                get(expertise, `${fields.USER_STATUS_IN_EX}.${userStatusesInExFields.EX_MASTER}`) ||
                get(expertise, `${fields.USER_STATUS_IN_EX}.${userStatusesInExFields.STRUCTURAL_LEADER}`) 
            )
        return (
            <Paper className={classes.root}>
                <div className={classes.titleWrap}>
                    <Typography className={classes.title}>
                        <Link target="_blank" to={appRouter.getWorkProgramLink(get(expertise, [ExpertisesFields.WORK_PROGRAM, WorkProgramGeneralFields.ID]))}>
                            <b>{get(expertise, [ExpertisesFields.WORK_PROGRAM, WorkProgramGeneralFields.TITLE])}</b>
                        </Link>
                    </Typography>
                    <WorkProgramStatus status={get(expertise, ExpertisesFields.STATUS, '')} />

                    {canApproveWP &&
                        <ButtonGroup className={classes.buttonGroup} variant="contained">
                            <Button onClick={this.handleSendToRework}>Отправить РПД на доработку</Button>
                            <Button color="primary" onClick={this.handleApproveExpertise}>Принять РПД</Button>
                        </ButtonGroup>
                    }
                </div>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>Эксперт</TableCell>
                                    <TableCell>Оценка</TableCell>
                                    {canAddDeleteExperts && <TableCell className={classes.deleteCell}/>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {experts.map((expert: any) =>
                                    <TableRow key={expert[ExpertisesFields.EXPERT].id}>
                                        <TableCell>{expert[ExpertisesFields.EXPERT].first_name} {expert[ExpertisesFields.EXPERT].last_name}</TableCell>
                                        <TableCell>
                                            {get(UserExpertResult, expert[ExpertisesFields.USER_EXPERTISE_STATUS], 'Не проверено')}
                                        </TableCell>
                                        {canAddDeleteExperts &&
                                            <TableCell className={classes.deleteCell}>
                                                <IconButton onClick={this.handleClickDelete(expert.id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        }
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>

                {canAddDeleteExperts &&
                    <Button className={classes.addExpertButton}
                            onClick={this.handleOpenExpertModal}
                            variant="contained"
                            color="secondary"
                    >
                        <AddIcon/> Добавить эксперта
                    </Button>
                }
                {canAddDeleteExperts && <AddExpertModal/>}
            </Paper>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(withRouter(Expertise)));
