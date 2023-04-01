import React from 'react';

import {Link} from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import get from "lodash/get";

import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import withStyles from '@mui/material/styles/withStyles';
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import WorkProgramStatus from "../../../components/WorkProgramStatus/WorkProgramStatus";
import AddExpertModal from './AddExpertModal';

import {ExpertiseProps} from "./types";
import {ExpertisesFields, UserExpertResult, fields, userStatusesInExFields} from "../enum";

import connect from './Expertise.connect';
import styles from './Expertise.styles';
import {getLink, getLinkLabel} from "../utils";

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

        const link = getLink(expertise);
        const linkLabel = getLinkLabel(expertise);

        return (
            <Paper className={classes.root}>
                <div className={classes.titleWrap}>
                    <Typography className={classes.title}>
                        <Link target="_blank" to={link}>
                            <b>{linkLabel}</b>
                        </Link>
                    </Typography>
                    <WorkProgramStatus status={get(expertise, ExpertisesFields.STATUS, '')} />

                    {canApproveWP &&
                        <ButtonGroup className={classes.buttonGroup} variant="contained">
                            <Button onClick={this.handleSendToRework}>Отправить на доработку</Button>
                            <Button color="primary" onClick={this.handleApproveExpertise}>Принять</Button>
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
export default connect(withStyles(styles)(Expertise));
