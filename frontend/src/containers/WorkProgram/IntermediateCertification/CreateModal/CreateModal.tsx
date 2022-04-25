import React from 'react';
import get from "lodash/get";
import {shallowEqual} from "recompose";
import classNames from 'classnames';

import {CreateModalProps} from './types';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import QuestionIcon from "@material-ui/icons/HelpOutline";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {AutoSizer} from "react-virtualized";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";

import CKEditor from "../../../../components/CKEditor";

import {
    IntermediateCertificationFields,
    fields, EvaluationToolFields,
} from '../../enum';
import {IntermediateCertificationTypes} from "../../constants";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';


class CreateModal extends React.PureComponent<CreateModalProps> {
    editor = null;

    state = {
        isOpen: false,
        showErrors: false,
        evaluationTool: {
            [IntermediateCertificationFields.ID]: null,
            [IntermediateCertificationFields.DESCRIPTION]: '',
            [IntermediateCertificationFields.MIN]: '',
            [IntermediateCertificationFields.NAME]: '',
            [IntermediateCertificationFields.MAX]: '',
            [IntermediateCertificationFields.TYPE]: '',
            [IntermediateCertificationFields.SEMESTER]: '1',
        }
    };

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {evaluationTool} = this.props;

        if (!shallowEqual(this.props, prevProps)){
            this.setState({
                isOpen: this.props.isOpen,
                evaluationTool: {
                    [IntermediateCertificationFields.ID]: get(evaluationTool, IntermediateCertificationFields.ID, null),
                    [IntermediateCertificationFields.NAME]: get(evaluationTool, IntermediateCertificationFields.NAME, ''),
                    [IntermediateCertificationFields.DESCRIPTION]: get(evaluationTool, IntermediateCertificationFields.DESCRIPTION, ''),
                    [IntermediateCertificationFields.MIN]: get(evaluationTool, IntermediateCertificationFields.MIN, ''),
                    [IntermediateCertificationFields.MAX]: get(evaluationTool, IntermediateCertificationFields.MAX, ''),
                    [IntermediateCertificationFields.TYPE]: get(evaluationTool, IntermediateCertificationFields.TYPE, ''),
                    [IntermediateCertificationFields.SEMESTER]: get(evaluationTool, IntermediateCertificationFields.SEMESTER, '1'),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.CREATE_NEW_INTERMEDIATE_CERTIFICATION);
    }

    handleSave = () => {
        const {evaluationTool} = this.state;

        const disableSave = get(evaluationTool, [IntermediateCertificationFields.NAME, 'length'], 0) === 0
          || get(evaluationTool, [IntermediateCertificationFields.DESCRIPTION, 'length'], 0) === 0
          || get(evaluationTool, [IntermediateCertificationFields.TYPE, 'length'], 0) === 0
        ;

        if (evaluationTool[IntermediateCertificationFields.ID]){
            this.setState({ showErrors: false });
            this.props.actions.changeIntermediateCertification(evaluationTool);
        } else if (!disableSave){
            this.setState({ showErrors: false });
            this.props.actions.addIntermediateCertification(evaluationTool);
        } else if (disableSave) {
            this.setState({ showErrors: true })
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {evaluationTool} = this.state;

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [field]: get(e, 'target.value')
            }
        })
    }

    changeDescription = (event: any) => {
        const {evaluationTool} = this.state;

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [IntermediateCertificationFields.DESCRIPTION]: event.editor.getData()
            }
        })
    }

    hasError = (field: string) => {
        const { showErrors, evaluationTool } = this.state;
        return showErrors && get(evaluationTool, [field, 'length'], 0) === 0
    }

    render() {
        const {classes, semesterCount} = this.props;
        const {evaluationTool, isOpen} = this.state;

        const isEditMode = Boolean(evaluationTool[IntermediateCertificationFields.ID]);
        if (!isOpen) return <></>
        return (
            <div className={classNames(classes.dialog, {[classes.openDialog]: isOpen})}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {isEditMode ? 'Редактировать' : 'Создать'} оценочное средство промежуточной аттестации
                        </Typography>
                        <Button autoFocus
                                color="inherit"
                                onClick={this.handleSave}
                                classes={{
                                    disabled: classes.disabledButton
                                }}
                        >
                            Сохранить
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent className={classes.dialogContent}>
                    {isOpen &&
                        <>
                          <div className={classes.leftSide}>
                            <AutoSizer style={{width: '100%'}}>
                                {({width}) => (
                                    <>
                                        <TextField label="Название оценочного средства *"
                                                   onChange={this.saveField(IntermediateCertificationFields.NAME)}
                                                   variant="outlined"
                                                   className={classNames(classes.input, classes.marginBottom30, classes.nameInput)}
                                                   fullWidth
                                                   InputLabelProps={{
                                                       shrink: true,
                                                   }}
                                                   error={this.hasError(IntermediateCertificationFields.NAME)}
                                                   value={evaluationTool[IntermediateCertificationFields.NAME]}
                                        />

                                        <FormControl className={classes.typeSelector} error={this.hasError(IntermediateCertificationFields.TYPE)}>
                                            <InputLabel shrink id="section-label">
                                                Тип *
                                            </InputLabel>
                                            <Select
                                                variant="outlined"
                                                className={classes.selector}
                                                // @ts-ignore
                                                onChange={this.saveField(IntermediateCertificationFields.TYPE)}
                                                value={evaluationTool[IntermediateCertificationFields.TYPE]}
                                                fullWidth
                                                displayEmpty
                                                input={
                                                    <OutlinedInput
                                                        notched
                                                        labelWidth={100}
                                                        name="course"
                                                        id="section-label"
                                                    />
                                                }
                                                style={{width: width}}
                                            >
                                                {Object.keys(IntermediateCertificationTypes).map((key: any) =>
                                                    <MenuItem value={key}>
                                                        {IntermediateCertificationTypes[key]}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <div className={classNames(classes.row, classes.marginBottom30)}>
                                            <TextField label="Минимальное значение"
                                                       onChange={this.saveField(IntermediateCertificationFields.MIN)}
                                                       variant="outlined"
                                                       className={classes.numberInput}
                                                       fullWidth
                                                       InputLabelProps={{
                                                           shrink: true,
                                                       }}
                                                       type="number"
                                                       value={evaluationTool[IntermediateCertificationFields.MIN]}
                                            />
                                            <TextField label="Максимальное значение"
                                                       onChange={this.saveField(IntermediateCertificationFields.MAX)}
                                                       variant="outlined"
                                                       fullWidth
                                                       InputLabelProps={{
                                                           shrink: true,
                                                       }}
                                                       type="number"
                                                       value={evaluationTool[IntermediateCertificationFields.MAX]}
                                            />
                                        </div>

                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Длительность изучения *
                                                <Tooltip title="Первый семестр - семестр с которого начинается дисциплина.">
                                                    <QuestionIcon color="primary" className={classes.tooltipIcon}/>
                                                </Tooltip>
                                            </FormLabel>
                                            <RadioGroup className={classes.radioGroup}
                                                        onChange={this.saveField(IntermediateCertificationFields.SEMESTER)}
                                                        value={evaluationTool[IntermediateCertificationFields.SEMESTER]}
                                            >
                                                <FormControlLabel value={1} control={<Radio
                                                    checked={parseInt(evaluationTool[IntermediateCertificationFields.SEMESTER]) === 1}/>}
                                                                  label="Первый"/>
                                                <FormControlLabel disabled={semesterCount < 2} value={2} control={<Radio
                                                    checked={parseInt(evaluationTool[IntermediateCertificationFields.SEMESTER]) === 2}/>}
                                                                  label="Второй"/>
                                                <FormControlLabel disabled={semesterCount < 3} value={3} control={<Radio
                                                    checked={parseInt(evaluationTool[IntermediateCertificationFields.SEMESTER]) === 3}/>}
                                                                  label="Третий"/>
                                                <FormControlLabel disabled={semesterCount < 4} value={4} control={<Radio
                                                    checked={parseInt(evaluationTool[IntermediateCertificationFields.SEMESTER]) === 4}/>}
                                                                  label="Четвертый"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </>
                                )}
                            </AutoSizer>
                          </div>

                          <div className={classes.rightSide}>
                            <InputLabel className={classes.label}>Описание * </InputLabel>
                            <CKEditor onChange={this.changeDescription}
                                      value={evaluationTool[IntermediateCertificationFields.DESCRIPTION] ? evaluationTool[IntermediateCertificationFields.DESCRIPTION] : ''}
                                      toolbarContainerId="toolbar-container"
                                      useFormulas
                                      height="400px"
                                      // height="calc(100vh - 300px)"
                                      style={this.hasError(EvaluationToolFields.DESCRIPTION)? {border: '1px solid #d00000'} : {border: '1px solid #d1d1d1'}}
                            />
                          </div>
                        </>
                    }
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default connect(withStyles(styles)(CreateModal));
