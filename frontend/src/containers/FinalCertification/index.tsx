import React from "react";
import {Paper} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";
import styles from "./styles";
import {Link} from "react-router-dom";
import {CertificationActions, CertificationState, PermissionsInfoState} from "./types";
import connect from "./connect";
import get from "lodash/get";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import {CertificationFields} from "./enum";
import ErrorPage from "../../components/ErrorPage";
import Download from "./components/Download";
import SendToExpertise from "./components/SendToExpertise";
import {STEPS} from "./constants";
import WorkProgramStatus from "../../components/WorkProgramStatus/WorkProgramStatus";
import {ExpertiseStatus, PermissionsInfoFields} from "./enum";
import {CommentType} from "./types";
import Button from "@mui/material/Button";
import {appRouter} from "../../service/router-service";
import Comments from "../../components/Comments/Comments";
import ButtonGroup from "@mui/material/ButtonGroup";

export interface FinalCertificationProps extends WithStyles<typeof styles> {
  actions: CertificationActions,
  certification: CertificationState,
  isError: boolean,
  permissionsInfo: PermissionsInfoState,
  comments: Array<CommentType>,
}

class FinalCertification extends React.Component<FinalCertificationProps> {

  state = {
    activeStep: 0,
    isCommentsOpen: false,
  };

  stepList = STEPS.map(step => step.component);
  stepNameList = STEPS.map(step => step.name);

  getCertificationId = () => get(this, 'props.match.params.id');

  componentDidMount() {
    this.getCertification();
    this.getTemplateText();
  }

  getTemplateText = () => {
    const id = this.props.certification[CertificationFields.GIA_BASE];
    this.props.actions.getTemplateText(id);
  }

  getCertification = () => {
    this.props.actions.getCertification(this.getCertificationId());
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
    this.props.actions.sendCertificationToRework(userExpertiseId);
  }

  handleApproveCertification = (userExpertiseId: number) => () => {
    this.props.actions.approveCertification(userExpertiseId);
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
      userExpertiseId: this.props.certification[CertificationFields.PERMISSIONS_INFO][PermissionsInfoFields.USER_EXPERTISE_ID],
    })
  }

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {isError, permissionsInfo} = this.props;
    const {activeStep} = this.state;

    const workProgramStatus = permissionsInfo[PermissionsInfoFields.EXPERTISE_STATUS] ?? ExpertiseStatus.WORK;

    const expertiseStatus = permissionsInfo[PermissionsInfoFields.EXPERTISE_STATUS];

    const userExpertiseStatus = permissionsInfo[PermissionsInfoFields.YOUR_APPROVE_STATUS];

    const showSendToExpertise = permissionsInfo[PermissionsInfoFields.CAN_EDIT];

    const userExpertiseId =
      this.props.certification[CertificationFields.PERMISSIONS_INFO][PermissionsInfoFields.USER_EXPERTISE_ID];

    const showApproveAndRework = Boolean(permissionsInfo[PermissionsInfoFields.CAN_APPROVE])
      && Boolean(userExpertiseId)
      && expertiseStatus === ExpertiseStatus.EXPERTISE
      && userExpertiseStatus === null;

    const showGoToExpertise = Boolean(permissionsInfo[PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE])
      && (expertiseStatus === ExpertiseStatus.EXPERTISE || expertiseStatus === ExpertiseStatus.REWORK);

    const comments = this.props.comments;


    if (isError) {
      return <ErrorPage/>
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
                  <SendToExpertise openStep={this.openStep} certificationId={this.getCertificationId()}/>
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
              showApproveAndRework &&
                <ButtonGroup variant="contained">
                  <Button variant="outlined"
                          onClick={this.handleSendToRework(userExpertiseId!!)}>
                    Вернуть на доработку
                  </Button>
                  <Button color="primary"
                          onClick={this.handleApproveCertification(userExpertiseId!!)}>
                    Одобрить ГИА
                  </Button>
                </ButtonGroup>
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
                          sendNewComment={this.handleSendComment}
                />)
            }
          </div>

        </Paper>
      </div>
    )
  }
}

export default connect(withStyles(styles)(FinalCertification));