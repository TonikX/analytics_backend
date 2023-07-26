import React from 'react';
import get from 'lodash/get';
import {withRouter} from "../../hoc/WithRouter";

import Typography from '@mui/material/Typography';
import CopyIcon from "@mui/icons-material/FileCopyOutlined";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import {withStyles} from '@mui/styles';
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Grow from '@mui/material/Grow';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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

import {sectionsValue, steps, subSections} from "./constants";

import connect from './WorkProgram.connect';
import styles from './WorkProgram.styles';
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

class WorkProgram extends React.Component<WorkProgramProps> {
    state = {
        activeStep: 0,
        isOpenComments: false,
        openConfirmDuplicateWPModal: false,
        openConfirmArchiveWPModal: false,
    };

    componentDidMount() {
        this.selectActiveStep()
        const id = this.getWorkProgramId();

        this.props.actions.getWorkProgram(id);
    }

    componentDidUpdate(prevProps: Readonly<WorkProgramProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.location.pathname !== this.props.location.pathname){
            this.selectActiveStep()
        }
    }

    componentWillUnmount() {
        this.props.actions.pageDown();
    }

    selectActiveStep = () => {
        const locations = this.props.location.pathname.split('/')
        const section: subSections = locations[locations.length - 1]

        if (this.props.location.pathname.includes([subSections.EVALUATION_TOOLS])){
            this.setState({
                activeStep: sectionsValue[subSections.EVALUATION_TOOLS]
            })
            return
        }
        if (this.props.location.pathname.includes(subSections.INTERMEDIATE_CERTIFICATION)){
            this.setState({
                activeStep: sectionsValue[subSections.INTERMEDIATE_CERTIFICATION]
            })
            return
        }
        this.setState({
            activeStep: sectionsValue[section] || 0
        })
    }

    openConfirmDuplicateWPModal = () => {
        this.setState({
            openConfirmDuplicateWPModal: true
        })
    }

    openConfirmArchiveWPModal = () => {
        this.setState({
            openConfirmArchiveWPModal: true
        })
    }

    closeConfirmDuplicateWPModal = () => {
        this.setState({
            openConfirmDuplicateWPModal: false
        })
    }

    closeArchiveWPModal = () => {
        this.setState({
            openConfirmArchiveWPModal: false
        })
    }

    handleStep = (number: number) => () => {
        this.setState({activeStep: number})
    };

    handleCloneProgram = () => {
        this.closeConfirmDuplicateWPModal();
        this.props.actions.cloneWorkProgram(this.getWorkProgramId());
    }

    getWorkProgramId = () => get(this, 'props.params.id') as number;

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
                            <HelpOutlineIcon color="primary" style={{ marginLeft: '10px', paddingTop: '4px' }} />
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
                            <HelpOutlineIcon color="primary" style={{ marginLeft: '10px', paddingTop: '4px' }} />
                        </Tooltip>
                    </Typography>

                    <Results />
                </div>;
            case 8:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Связанные с рпд модули, учебные планы и направления
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

    handleSendToIsu = () => {
        this.props.actions.sendWorkProgramToIsu();
    }

    handleSendToArchive = () => {
        this.closeArchiveWPModal();
        this.props.actions.sendWorkProgramToArchive();
    }

    handleClickOnComments = () => {
        const {notificationsRead} = this.props

        this.setState({isOpenComments: !this.state.isOpenComments});

        if (!this.state.isOpenComments && notificationsRead[this.state.activeStep]) {
            this.props.actions.updateUnreadCommentStatus(this.getCurrentStep());
        }
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

    openStep = (link: any) => {
        //@ts-ignore
        this.props.navigate(link)
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {workProgramTitle, canSendToExpertise, canSendToArchive, canApprove, canComment, workProgramStatus,
            workProgramRating, canAddToFolder, validateErrors, notificationsRead, canSendToIsu} = this.props;
        const {activeStep, isOpenComments} = this.state;

        return (
            <div className={classes.wrap}>
                <div className={classes.header}>
                    <WorkProgramStatus status={workProgramStatus} />

                    <div className={classes.headerButtons}>
                        {canSendToArchive && <Button onClick={this.openConfirmArchiveWPModal}>Отправить в архив</Button>}

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


                        {canSendToIsu &&
                            <Button onClick={this.handleSendToIsu}>
                                отправить в ИСУ
                            </Button>
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
                        {Object.values(steps).map(({ label, link }, index) => {
                            return (
                                <Step key={index} onClick={() => this.openStep(link(this.getWorkProgramId()))}>
                                    <StepButton
                                      // completed={false}
                                        style={{textAlign: 'left',}}
                                    >
                                        {notificationsRead[index] && <Tooltip title="Есть непрочитанные комментарии"><CommentIcon className={classes.commentIcon} /></Tooltip>} {label}
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
                <ConfirmDialog onConfirm={this.handleSendToArchive}
                               onDismiss={this.closeArchiveWPModal}
                               confirmText={'Вы уверены, что хотите отправить рабочую программу в архив?'}
                               isOpen={this.state.openConfirmArchiveWPModal}
                               dialogTitle={'Отправить учебную программу в архив'}
                               confirmButtonText={'Отправить в архив'}
                />
            </div>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(WorkProgram)));
