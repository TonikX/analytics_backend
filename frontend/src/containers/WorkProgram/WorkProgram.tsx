import React from 'react';
import get from 'lodash/get';
import {withRouter} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import CommentIcon from "@material-ui/icons/CommentOutlined";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Grow from '@material-ui/core/Grow';
import Switch from '@material-ui/core/Switch';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import WorkProgramStatus from "../../components/WorkProgramStatus/WorkProgramStatus";
import LikeButton from "../../components/LikeButton";

import General from "./General";
import Sections from "./Sections";
import Topics from "./Topics";
import Literature from "./Literature";
import EvaluationTools from "./EvaluationTools";
import IntermediateCertification from "./IntermediateCertification";
import Prerequisites from "./Prerequisites";
import Results from "./Results";
import PlansAndDirections from "./PlansAndDirections";
import Comments from "./Comments";
import Competences from "./Competences";

import {FavoriteType} from "../Profile/Folders/enum";
import {WorkProgramProps} from './types';

import {steps} from "./constants";

import connect from './WorkProgram.connect';
import styles from './WorkProgram.styles';
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { WorkProgramGeneralFields } from './enum';

class WorkProgram extends React.Component<WorkProgramProps> {
    state = {
        activeStep: 0,
        isOpenComments: false,
        openConfirmDuplicateWPModal: false,
    };

    componentDidMount() {
        const id = this.getWorkProgramId();

        this.props.actions.getWorkProgram(id);
    }

    componentWillUnmount() {
        this.props.actions.pageDown();
    }

    openConfirmDuplicateWPModal = () => {
        this.setState({
            openConfirmDuplicateWPModal: true
        })
    }

    closeConfirmDuplicateWPModal = () => {
        this.setState({
            openConfirmDuplicateWPModal: false
        })
    }

    handleStep = (number: number) => () => {
        this.setState({activeStep: number})
    };

    handleCloneProgram = () => {
        this.closeConfirmDuplicateWPModal();
        this.props.actions.cloneWorkProgram(this.getWorkProgramId());
    }

    handleBars = (e: React.ChangeEvent) => {
        this.props.actions.saveWorkProgram({
            destination: WorkProgramGeneralFields.BARS,
            value: get(e, "target.checked", false)
        })
    }

    getWorkProgramId = () => get(this, 'props.match.params.id');

    renderContent = () => {
        const {classes} = this.props;
        const {activeStep} = this.state;

        switch (activeStep) {
            case 0:
                return <>
                    <div className={classes.subItem}>
                        <General />
                    </div>
                </>;
            case 1:
                return <div className={classes.subItem}>

                    <Typography className={classes.subTitle}>
                        Пререквизиты
                        <Tooltip
                            title={
                                <span style={{ fontSize: '13px' }}>Пререквезит - объект, отражающий конкретное знание из конкретной области 
                                (далее "учебная сущность"), которое должно быть у студента перед началом изучения курса.
                                </span>
                            }
                        >
                            <HelpOutlineIcon color="primary" style={{ marginLeft: '10px' }} />
                        </Tooltip>
                    </Typography>
                    <Prerequisites />
                </div>;
            case 2:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Разделы
                    </Typography>

                    <Sections />
                </div>;
            case 3:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Содержание дисциплины
                    </Typography>

                    <Topics />
                </div>;
            case 4:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Источники
                    </Typography>

                    <Literature />
                </div>;
            case 5:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Оценочные средства
                    </Typography>

                    <EvaluationTools />
                </div>;
            case 6:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Оценочные средства промежуточной аттестации
                    </Typography>

                    <IntermediateCertification />
                </div>;
            case 7:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Результаты обучения
                        <Tooltip
                            title={
                                <span style={{ fontSize: '13px' }}>Результат - объект, отражающий конкретное знание 
                                из конкретной области (далее "учебная сущность"), которое сформируется у студента 
                                после прохождения курса.
                                </span>
                            }
                        >
                            <HelpOutlineIcon color="primary" style={{ marginLeft: '10px' }} />
                        </Tooltip>
                    </Typography>

                    <Results />
                </div>;
            case 8:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Связанные с рпд учебные планы и направления
                    </Typography>

                    <PlansAndDirections />
                </div>;
            case 9:
                return <div className={classes.subItem}>
                    <Competences />
                </div>;
        }
    }

    handleSendToExpertize = () => {
        this.props.actions.sendWorkProgramToExpertise();
    }

    handleSendToArchive = () => {
        this.props.actions.sendWorkProgramToArchive();
    }

    handleClickOnComments = () => {
        this.setState({isOpenComments: !this.state.isOpenComments});
    }

    handleSendToRework = () => {
        this.props.actions.returnWorkProgramToWork();
    }

    handleApproveExpertise = () => {
        this.props.actions.approveWorkProgram();
    }

    getCurrentStep = () => Object.keys(steps)[this.state.activeStep];

    handleClickLike = () => {
        const {workProgramRating, workProgramRatingId} = this.props;

        if (workProgramRating !== false){
            this.props.foldersActions.removeFromFolder({
                id: workProgramRatingId,
                callback: this.props.actions.getWorkProgram,
                type: FavoriteType.WORK_PROGRAM
            });
        } else {
            this.props.foldersActions.openAddToFolderDialog({
                relationId: this.getWorkProgramId(),
                type: FavoriteType.WORK_PROGRAM,
                callback: this.props.actions.getWorkProgram
            });
        }
    }

    render() {
        const {classes, workProgramTitle, canSendToExpertise, canSendToArchive, canApprove, canComment, workProgramStatus,
            workProgramRating, canAddToFolder, validateErrors, workProgram, fetchingBars} = this.props;
        const {activeStep, isOpenComments} = this.state;
        
        return (
            <div className={classes.wrap}>
                <div className={classes.header}>
                    <WorkProgramStatus status={workProgramStatus} />

                    <div className={classes.headerButtons}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Typography>Дисциплина реализуется в БАРС 2.0</Typography>
                            <Switch
                                checked={get(workProgram, [WorkProgramGeneralFields.BARS], false)}
                                onChange={(canSendToArchive || canSendToExpertise)  ? this.handleBars : () => {}}
                                disabled={fetchingBars}
                            />
                        </div>
                        {canSendToArchive && <Button onClick={this.handleSendToArchive}>Отправить в архив</Button>}

                        {canSendToExpertise &&
                            (validateErrors.length ?
                                <Tooltip title={
                                    <div className={classes.tooltip}>
                                        {validateErrors.length === 1 && validateErrors[0] === 'PLAN_ERROR' ?
                                            <>Вы не можете отправить рабочую программу на экспертизу, пока она не включена ни в один учебный план</>
                                            :
                                            <>Исправьте ошибки, прежде чем отправлять на эспертизу: <br/> {validateErrors.map((item, index) => <>{index  + 1}. {item} <br /></>)} </>
                                        }
                                    </div>}>
                                    <Button>
                                        Отправить на экспертизу
                                    </Button>
                                </Tooltip>
                                :
                                <Button onClick={this.handleSendToExpertize}>
                                    Отправить на экспертизу
                                </Button>
                            )
                        }

                        {canApprove &&
                            <ButtonGroup variant="contained">
                                <Button onClick={this.handleSendToRework}>Отправить РПД на доработку</Button>
                                <Button color="primary" onClick={this.handleApproveExpertise}>Принять РПД</Button>
                            </ButtonGroup>
                        }

                        {canAddToFolder &&
                            <LikeButton onClick={this.handleClickLike}
                                        isLiked={workProgramRating !== false}
                            />
                        }
                    </div>
                </div>
                <Paper className={classes.root} component="div">
                    <Stepper activeStep={activeStep}
                             orientation="vertical"
                             nonLinear
                             className={classes.stepper}
                    >
                        {Object.values(steps).map((value, index) => {
                            return (
                                <Step key={index}>
                                    <StepButton onClick={this.handleStep(index)}
                                                completed={false}
                                                style={{textAlign: 'left'}}
                                    >
                                        {value}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <div className={classes.content}>
                        <Typography className={classes.title}>
                            <div>Описание рабочей программы дисциплины <span style={{fontWeight: 500}}>"{workProgramTitle}"</span></div>
                            <div className={classes.cloneButton} onClick={this.openConfirmDuplicateWPModal}> <CopyIcon/> Клонировать</div>
                        </Typography>

                        {this.renderContent()}

                        {canComment &&
                            <>
                                <Grow
                                    in={isOpenComments}
                                    {...(isOpenComments ? {timeout: 300} : {})}
                                >
                                    <Paper className={classes.comments}>
                                        <Comments currentStep={this.getCurrentStep()} closeComments={this.handleClickOnComments} />
                                    </Paper>
                                </Grow>
                                <Fab color="secondary"
                                     className={classes.commentButton}
                                     onClick={this.handleClickOnComments}
                                >
                                    <CommentIcon className={isOpenComments ? classes.rotateIcon : ''}/>
                                </Fab>
                            </>
                        }
                    </div>
                </Paper>


                <ConfirmDialog onConfirm={this.handleCloneProgram}
                               onDismiss={this.closeConfirmDuplicateWPModal}
                               confirmText={'Клонируя рабочую программу, вы получите копию этой программы, которая не будет включена ни в один учебный план. Вы уверены, что хотите клонировать программу?'}
                               isOpen={this.state.openConfirmDuplicateWPModal}
                               dialogTitle={'Клонировать учебную программу'}
                               confirmButtonText={'Клонировать'}
                />
            </div>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(WorkProgram)));
