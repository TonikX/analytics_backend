import React from 'react';
import get from 'lodash/get';

import {Link} from "react-router-dom";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

import {WithStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import AddFolderModal from "./AddFolderModal";

import LikeButton from "../../../components/LikeButton";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";

import {FoldersProps, FolderType} from './types';
import {FavoriteType, FoldersFields} from "./enum";

import {WorkProgramGeneralFields} from "../../WorkProgram/enum";
import {appRouter} from "../../../service/router-service";

import connect from './Folders.connect';
import styles from './Folders.styles';
import {EducationalPlanFields} from "../../EducationalPlan/enum";
import {specializationObject} from "../../WorkProgram/constants";
import {TrainingModuleFields} from "../../EducationalPlan/TrainingModules/enum";

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

class Folders extends React.PureComponent<FoldersProps> {
    state = {
        currentTab: 0,
        openConfirmDialogId: null
    }

    componentDidMount() {
        this.props.actions.getFolders();
    }

    handleChangeCurrentTab = (event: any, newValue: any) => {
        this.setState({currentTab: newValue});
    }

    deleteFromFolder = (id: number, type: FavoriteType) => () => {
        this.props.actions.removeFromFolder({id, type: type});
    }

    deleteFolder = (id: number) => () => {
        this.setState({openConfirmDialogId: id});
    }

    handleConfirmDeleteDialog = () => {
        this.props.actions.deleteFolder(this.state.openConfirmDialogId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({openConfirmDialogId: null});
    }

    openCreateDialog = () => {
        this.props.actions.openAddFolderDialog();
    }

    renderWPList = (folder: FolderType) => {
        const {classes} = this.props;

        return folder[FoldersFields.WORK_PROGRAM_IN_FOLDER].map(item =>
            <Link target="_blank"
                  to={appRouter.getWorkProgramLink(item[FoldersFields.WORK_PROGRAM][WorkProgramGeneralFields.ID])}
                  className={classes.workProgramLink}
            >
                <div className={classes.workProgram}>
                    <div> {item[FoldersFields.WORK_PROGRAM][WorkProgramGeneralFields.TITLE]} </div>
                    <div> {item[FoldersFields.WORK_PROGRAM][WorkProgramGeneralFields.DESCRIPTION]} </div>
                    <div className={classes.rating}>
                        <ReactStars size={20} value={item[FoldersFields.WORK_PROGRAM_RATING]} />
                        <LikeButton isLiked={true} onClick={this.deleteFromFolder(item[FoldersFields.ID], FavoriteType.WORK_PROGRAM)} />
                    </div>
                    <div> {item[FoldersFields.COMMENT]} </div>
                </div>
            </Link>
        );
    }

    renderAcademicPlanList = (folder: FolderType) => {
        const {classes} = this.props;

        return folder[FoldersFields.ACADEMIC_PLAN_IN_FOLDER].map(item =>
            <Link target="_blank"
                  to={appRouter.getPlanDetailLink(item[FoldersFields.ACADEMIC_PLAN][EducationalPlanFields.ID])}
                  className={classes.workProgramLink}
            >
                <div className={classes.workProgram}>
                    <div> {item[FoldersFields.ACADEMIC_PLAN][EducationalPlanFields.PROFILE]} / {item[FoldersFields.ACADEMIC_PLAN][EducationalPlanFields.YEAR]} /  {specializationObject[get(item, [FoldersFields.ACADEMIC_PLAN, EducationalPlanFields.QUALIFICATION])]} </div>
                    <div className={classes.rating}>
                        <ReactStars size={20} value={item[FoldersFields.ACADEMIC_PLAN_RATING]} />
                        <LikeButton isLiked={true} onClick={this.deleteFromFolder(item[FoldersFields.ID], FavoriteType.ACADEMIC_PLAN)} />
                    </div>
                    <div> {item[FoldersFields.COMMENT]} </div>
                </div>
            </Link>
        );
    }

    renderIndividualAcademicPlan = (folder: FolderType) => {
        const {classes} = this.props;

        return folder[FoldersFields.INDIVIDUAL_ACADEMIC_PLAN_IN_FOLDER].map(item => {
            const plan = item[FoldersFields.INDIVIDUAL_ACADEMIC_PLAN][FoldersFields.IMPLEMENTATION_OF_ACADEMIC_PLAN][FoldersFields.ACADEMIC_PLAN];

            return <Link target="_blank"
                  to={appRouter.getPlanDetailLink(plan[EducationalPlanFields.ID])}
                  className={classes.workProgramLink}
            >
                <div className={classes.workProgram}>
                    <div> {plan[EducationalPlanFields.PROFILE]} </div>
                    <div className={classes.rating}>
                        <ReactStars size={20} value={item[FoldersFields.INDIVIDUAL_ACADEMIC_PLAN_RATING]}/>
                        <LikeButton isLiked={true}
                                    onClick={this.deleteFromFolder(item[FoldersFields.ID], FavoriteType.ACADEMIC_PLAN)}/>
                    </div>
                    <div> {item[FoldersFields.COMMENT]} </div>
                </div>
            </Link>
        });
    }

    renderBlockModuleList = (folder: FolderType) => {
        const {classes} = this.props;

        return folder[FoldersFields.BLOCK_MODULE_IN_FOLDER].map(item =>
            <Link target="_blank"
                  to={appRouter.getTrainingModuleDetailLink(item[FoldersFields.BLOCK_MODULE][EducationalPlanFields.ID])}
                  className={classes.workProgramLink}
            >
                <div className={classes.workProgram}>
                    <div> {item[FoldersFields.BLOCK_MODULE][TrainingModuleFields.NAME]} </div>
                    <div className={classes.rating}>
                        <ReactStars size={20} value={item[FoldersFields.BLOCK_MODULE_RATING]} />
                        <LikeButton isLiked={true} onClick={this.deleteFromFolder(item[FoldersFields.ID], FavoriteType.MODULES)} />
                    </div>
                    <div> {item[FoldersFields.COMMENT]} </div>
                </div>
            </Link>
        );
    }

    render() {
        const {classes, folders} = this.props;
        const {currentTab, openConfirmDialogId} = this.state;

        return (
            <div className={classes.root}>
                <Typography className={classes.title}>
                    Закладки
                </Typography>
                <div className={classes.tabsWrap}>
                    <div>
                        <Tabs value={currentTab}
                              orientation="vertical"
                              classes={{root: classes.tabs}}
                              onChange={this.handleChangeCurrentTab}
                        >
                            {folders.map((folder, index) =>
                                <Tab value={index}
                                     label={<div>{folder[FoldersFields.NAME]} <DeleteIcon className={classes.deleteIcon} onClick={this.deleteFolder(folder[FoldersFields.ID])}/> </div>}
                                     classes={{
                                         wrapper: classes.tab
                                     }}
                                />
                            )}
                        </Tabs>
                        <Button onClick={this.openCreateDialog}
                                className={classes.addButton}
                                color="primary"
                                variant="text"
                        >
                            <AddIcon/> Создать папку
                        </Button>
                    </div>
                    {folders.map((folder, index) =>
                        <TabPanel value={currentTab} index={index}>
                            <div className={classes.description}>
                                {folder[FoldersFields.DESCRIPTION]}
                            </div>

                            <div className={classes.workPrograms}>
                                {this.renderWPList(folder)}
                                {this.renderAcademicPlanList(folder)}
                                {this.renderBlockModuleList(folder)}
                                {this.renderIndividualAcademicPlan(folder)}
                            </div>

                        </TabPanel>
                    )}
 
                </div>

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить папку?'}
                               isOpen={Boolean(openConfirmDialogId)}
                               dialogTitle={'Удалить папку'}
                               confirmButtonText={'Удалить'}
                />

                <AddFolderModal />
            </div>
        );
    }
}

export default connect(withStyles(styles)(Folders));
