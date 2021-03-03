import React from 'react';
import get from 'lodash/get';

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

import {FavoriteType} from "../Profile/Folders/enum";
import {WorkProgramProps} from './types';

import {steps} from "./constants";

import connect from './WorkProgram.connect';
import styles from './WorkProgram.styles';

class WorkProgram extends React.Component<WorkProgramProps> {
    state = {
        activeStep: 0,
        isOpenComments: false
    };

    componentDidMount() {
        const id = this.getWorkProgramId();

        this.props.actions.getWorkProgram(id);
    }

    componentWillUnmount() {
        this.props.actions.pageDown();
    }

    handleStep = (number: number) => () => {
        this.setState({activeStep: number})
    };

    handleCloneProgram = () => {
        this.props.actions.cloneWorkProgram(this.getWorkProgramId());
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
                    </Typography>

                    <Prerequisites />
                </div>;
            case 2:
                return <> <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Разделы
                    </Typography>

                    <Sections />
                </div>
                </>;
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

        if (workProgramRating){
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
            workProgramRating, canAddToFolder, hoursError, evaluationToolsErrors} = this.props;
        const {activeStep, isOpenComments} = this.state;

        return (
            <div className={classes.wrap}>
                <div className={classes.header}>
                    <WorkProgramStatus status={workProgramStatus} />

                    <div className={classes.headerButtons}>
                        {canSendToArchive && <Button onClick={this.handleSendToArchive}>Отправить в архив</Button>}

                        {canSendToExpertise &&
                            <Tooltip title={hoursError ? "Ошибка! Часы по разделам заполнены неверно" : evaluationToolsErrors ? "Ошибка! Кол-во баллов в РПД больше 100" : ''}
                                     disableHoverListener={!hoursError && !evaluationToolsErrors}
                            >
                                <Button onClick={() => (!hoursError && !evaluationToolsErrors) && this.handleSendToExpertize}
                                >
                                    Отправить на экспертизу
                                </Button>
                            </Tooltip>
                        }

                        {canApprove &&
                            <ButtonGroup variant="contained">
                                <Button onClick={this.handleSendToRework}>Отправить РПД на доработку</Button>
                                <Button color="primary" onClick={this.handleApproveExpertise}>Принять РПД</Button>
                            </ButtonGroup>
                        }

                        {canAddToFolder &&
                            <LikeButton onClick={this.handleClickLike}
                                        isLiked={workProgramRating}
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
                            <div className={classes.cloneButton} onClick={this.handleCloneProgram}> <CopyIcon/> Клонировать</div>
                        </Typography>

                        {this.renderContent()}

                        {canComment &&
                            <>
                                <Grow
                                    in={isOpenComments}
                                    {...(isOpenComments ? {timeout: 300} : {})}
                                >
                                    <Paper className={classes.comments}>
                                        <Comments currentStep={this.getCurrentStep()} />
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
            </div>
        );
    }
}

export default connect(withStyles(styles)(WorkProgram));
