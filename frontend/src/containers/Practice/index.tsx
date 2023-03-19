import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link, withRouter} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import styles from "./Practice.styles";
import connect from './Practice.connect';
import {PracticeProps} from "./types";
import get from "lodash/get";
import {ExpertiseStatus, PermissionsInfoFields, PracticeFields} from "./enum";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import ErrorPage from "../../components/ErrorPage";
import Download from "./components/Download";
import {STEPS} from "./constants";
import WorkProgramStatus from "../../components/WorkProgramStatus/WorkProgramStatus";
import SendToExpertise from "./components/SendToExpertise";
import Button from "@material-ui/core/Button";
import Comments from "../../components/Comments";
import {appRouter} from "../../service/router-service";

class Practice extends React.Component<PracticeProps> {

  state = {
    activeStep: 0,
    isCommentsOpen: false,
  };

  stepList = STEPS.map(step => step.component);
  stepNameList = STEPS.map(step => step.name);

  getPracticeId = () => get(this, 'props.match.params.id');

  componentDidMount() {
    this.getPractice();
  }

  getPractice = () => {
    this.props.actions.getPractice(this.getPracticeId());
  }

  handleOpenStep = (index: number) => () => {
    this.setState({
      ...this.state,
      activeStep: index,
    })
  }

  openStep = (index: number) => {
    this.setState({
      ...this.state,
      activeStep: index,
    })
  }

  handleSendToRework = (userExpertiseId: number) => () => {
    this.props.actions.sendPracticeToRework(userExpertiseId);
  }

  handleApprovePractice = (userExpertiseId: number) => () => {
    this.props.actions.approvePractice(userExpertiseId);
  }

  handleCommentsClick = () => {
    if (!this.state.isCommentsOpen) {
      this.props.actions.getComments();
    }
    this.setState({
      ...this.state,
      isCommentsOpen: !this.state.isCommentsOpen,
    })
  }

  handleSendComment = (comment: string) => {
    this.props.actions.sendComment({
      comment,
      step: 'MA',
      userExpertiseId: this.props.practice[PracticeFields.PERMISSIONS_INFO][PermissionsInfoFields.USER_EXPERTISE_ID],
    })
  }

  render() {
    const {classes, isError, permissionsInfo} = this.props;
    const {activeStep} = this.state;

    const workProgramStatus = permissionsInfo[PermissionsInfoFields.EXPERTISE_STATUS] ?? ExpertiseStatus.WORK;

    const expertiseStatus = permissionsInfo[PermissionsInfoFields.EXPERTISE_STATUS];

    const userExpertiseStatus = permissionsInfo[PermissionsInfoFields.YOUR_APPROVE_STATUS];

    const showSendToExpertise = permissionsInfo[PermissionsInfoFields.CAN_EDIT];

    const userExpertiseId =
      this.props.practice[PracticeFields.PERMISSIONS_INFO][PermissionsInfoFields.USER_EXPERTISE_ID];

    const showApproveAndRework = Boolean(permissionsInfo[PermissionsInfoFields.CAN_APPROVE])
      && Boolean(userExpertiseId)
      && expertiseStatus === ExpertiseStatus.EXPERTISE
      && userExpertiseStatus === null;

    const showGoToExpertise = Boolean(permissionsInfo[PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE])
      && (expertiseStatus === ExpertiseStatus.EXPERTISE || expertiseStatus === ExpertiseStatus.REWORK);

    const comments = this.props.comments;

    if (isError) {
      return <ErrorPage />;
    }

    return (
      <div className={classes.wrap}>
        <div className={classes.header}>
          <WorkProgramStatus status={workProgramStatus}/>

          <div className={classes.headerButtons}>
            <div className={classes.rightButton}>
              <Download/>
            </div>
            {
              (showSendToExpertise &&
                <div className={classes.rightButton}>
                  <SendToExpertise openStep={this.openStep} practiceId={this.getPracticeId()}/>
                </div>
              )
            }
            {
              showGoToExpertise &&
              <Link
                to={appRouter.getExpertiseRouteLink(permissionsInfo[PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE]!!)}
                target="_blank"
                style={{textDecoration: 'none'}}>
                <Button variant="outlined"
                        className={classes.rightButton}>
                  Перейти к экспертизе
                </Button>
              </Link>
            }

            {
              (
                showApproveAndRework &&
                <ButtonGroup variant="contained">
                  <Button variant="outlined"
                          onClick={this.handleSendToRework(userExpertiseId!!)}>
                    Вернуть на доработку
                  </Button>
                  <Button color="primary"
                          onClick={this.handleApprovePractice(userExpertiseId!!)}>
                    Одобрить
                  </Button>
                </ButtonGroup>
              )
            }

          </div>
        </div>
        <Paper className={classes.root} component="div">
          <Stepper activeStep={activeStep}
                   orientation="vertical"
                   nonLinear
                   className={classes.stepper}
          >
            {Object.values(this.stepNameList).map((label, index) => {
              return (
                <Step key={index} onClick={this.handleOpenStep(index)}>
                  <StepButton completed={false}
                              style={{textAlign: 'left',}}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <div className={classes.content}>
            {
              this.stepList[activeStep]
            }
            {
              (permissionsInfo[PermissionsInfoFields.CAN_COMMENT] &&
                <Comments isOpen={this.state.isCommentsOpen}
                          handleClick={this.handleCommentsClick}
                          comments={comments}
                  //currentStep={activeStep}
                          sendNewComment={this.handleSendComment}
                />)
            }
          </div>
        </Paper>
      </div>
    )
  }
}

export default connect(withStyles(styles)(withRouter(Practice)));