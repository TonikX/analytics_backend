import React from 'react';
import get from "lodash/get";
import {shallowEqual} from "recompose";
import classNames from 'classnames';

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
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
//@ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
//@ts-ignore
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import {
    EvaluationToolFields,
    fields, IntermediateCertificationFields,
    workProgramSectionFields,
} from '../../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

class CreateModal extends React.PureComponent<CreateModalProps> {
    editor = null;

    state = {
        evaluationTool: {
            [EvaluationToolFields.ID]: null,
            [EvaluationToolFields.DESCRIPTION]: '',
            [EvaluationToolFields.SECTIONS]: [],
            [EvaluationToolFields.MIN]: '',
            [EvaluationToolFields.NAME]: '',
            [EvaluationToolFields.MAX]: '',
            [EvaluationToolFields.TYPE]: '',
            [EvaluationToolFields.DEADLINE]: 1,
            [EvaluationToolFields.CHECK_POINT]: false,
            [EvaluationToolFields.SEMESTER]: '1',
        }
    };

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {evaluationTool} = this.props;

        if (!shallowEqual(this.props, prevProps)){
            this.setState({
                evaluationTool: {
                    [EvaluationToolFields.ID]: get(evaluationTool, EvaluationToolFields.ID, null),
                    [EvaluationToolFields.NAME]: get(evaluationTool, EvaluationToolFields.NAME, ''),
                    [EvaluationToolFields.DESCRIPTION]: get(evaluationTool, EvaluationToolFields.DESCRIPTION, ''),
                    //@ts-ignore
                    [EvaluationToolFields.SECTIONS]: get(evaluationTool, EvaluationToolFields.SECTIONS, []).map(item => item[workProgramSectionFields.ID]),
                    [EvaluationToolFields.MIN]: get(evaluationTool, EvaluationToolFields.MIN, ''),
                    [EvaluationToolFields.MAX]: get(evaluationTool, EvaluationToolFields.MAX, ''),
                    [EvaluationToolFields.DEADLINE]: get(evaluationTool, EvaluationToolFields.DEADLINE, 1),
                    [EvaluationToolFields.TYPE]: get(evaluationTool, EvaluationToolFields.TYPE, ''),
                    [EvaluationToolFields.CHECK_POINT]: get(evaluationTool, EvaluationToolFields.CHECK_POINT, false),
                    [EvaluationToolFields.SEMESTER]: get(evaluationTool, EvaluationToolFields.SEMESTER, '1'),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.CREATE_NEW_EVALUATION_TOOLS);
    }

    handleSave = () => {
        const {evaluationTool} = this.state;

        if (evaluationTool[EvaluationToolFields.ID]){
            this.props.actions.changeEvaluationTool(evaluationTool);
        } else {
            this.props.actions.addEvaluationTool(evaluationTool);
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

    changeDeadline = (e: any, value: number | number[]) => {
        const {evaluationTool} = this.state;

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [EvaluationToolFields.DEADLINE]: value
            }
        })
    }

    changeCheckPoint = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const {evaluationTool} = this.state;

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [EvaluationToolFields.CHECK_POINT]: checked
            }
        })
    }

    changeDescription = (event: React.ChangeEvent<HTMLInputElement>, editor: any) => {
        const {evaluationTool} = this.state;
        const data = editor.getData();

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [EvaluationToolFields.DESCRIPTION]: data
            }
        })
    }

    render() {
        const {isOpen, classes, sections, types} = this.props;
        const {evaluationTool} = this.state;

        const disableButton = get(evaluationTool, [EvaluationToolFields.NAME, 'length'], 0) === 0
                            || get(evaluationTool, [EvaluationToolFields.DESCRIPTION, 'length'], 0) === 0
                            || get(evaluationTool, [IntermediateCertificationFields.MIN]) === ''
                            || get(evaluationTool, [IntermediateCertificationFields.MAX]) === ''
                            || get(evaluationTool, [EvaluationToolFields.SECTIONS, 'length'], 0) === 0
                            || get(evaluationTool, [EvaluationToolFields.TYPE, 'length'], 0) === 0
        ;
        const isEditMode = Boolean(evaluationTool[EvaluationToolFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    root: classes.root,
                    paper: classes.dialog
                }}
                fullScreen
                //@ts-ignore
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {isEditMode ? 'Редактировать' : 'Создать'} оценочное средство
                        </Typography>
                        <Button autoFocus
                                color="inherit"
                                onClick={this.handleSave}
                                disabled={disableButton}
                                classes={{
                                    disabled: classes.disabledButton
                                }}
                        >
                            Сохранить
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent className={classes.dialogContent}>
                    <div className={classes.leftSide}>

                        <AutoSizer style={{width: '100%'}}>
                            {({width}) => (
                                <>
                                    <TextField label="Название оценочного средства *"
                                               onChange={this.saveField(EvaluationToolFields.NAME)}
                                               variant="outlined"
                                               className={classNames(classes.input, classes.marginBottom30, classes.nameInput)}
                                               fullWidth
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                               value={evaluationTool[EvaluationToolFields.NAME]}
                                    />

                                    <FormControl className={classes.sectionSelector}>
                                        <InputLabel shrink id="section-label">
                                            Раздел *
                                        </InputLabel>
                                        <Select
                                            variant="outlined"
                                            multiple
                                            className={classes.selector}
                                            // @ts-ignore
                                            onChange={this.saveField(EvaluationToolFields.SECTIONS)}
                                            value={evaluationTool[EvaluationToolFields.SECTIONS]}
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
                                            {sections.map((item: any) =>
                                                <MenuItem value={item.value} key={`section-${item.value}`}>
                                                    {item.label}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    <FormControl className={classes.typeSelector}>
                                        <InputLabel shrink id="section-label">
                                            Тип *
                                        </InputLabel>
                                        <Select
                                            variant="outlined"
                                            className={classes.selector}
                                            // @ts-ignore
                                            onChange={this.saveField(EvaluationToolFields.TYPE)}
                                            value={evaluationTool[EvaluationToolFields.TYPE]}
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
                                            {types.map((type: any, index: number) =>
                                                <MenuItem value={type} key={`type-${index}`}>
                                                    {type}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <div className={classNames(classes.row, classes.marginBottom30)}>
                                        <TextField label="Минимальное значение *"
                                                   onChange={this.saveField(EvaluationToolFields.MIN)}
                                                   variant="outlined"
                                                   className={classes.numberInput}
                                                   fullWidth
                                                   InputLabelProps={{
                                                       shrink: true,
                                                   }}
                                                   type="number"
                                                   value={evaluationTool[EvaluationToolFields.MIN]}
                                        />
                                        <TextField label="Максимальное значение *"
                                                   onChange={this.saveField(EvaluationToolFields.MAX)}
                                                   variant="outlined"
                                                   fullWidth
                                                   InputLabelProps={{
                                                       shrink: true,
                                                   }}
                                                   type="number"
                                                   value={evaluationTool[EvaluationToolFields.MAX]}
                                        />
                                    </div>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Длительность изучения *</FormLabel>
                                        <RadioGroup className={classes.radioGroup}
                                                    onChange={this.saveField(EvaluationToolFields.SEMESTER)}
                                                    value={evaluationTool[EvaluationToolFields.SEMESTER]}
                                        >
                                            <FormControlLabel value={'1'} control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 1} />} label="Первый" />
                                            <FormControlLabel value={'2'} control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 2} />} label="Второй" />
                                            <FormControlLabel value={'3'} control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 3} />} label="Третий" />
                                            <FormControlLabel value={'4'} control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 4} />} label="Четвертый" />
                                        </RadioGroup>
                                    </FormControl>

                                    <FormControlLabel
                                        control={<Checkbox checked={evaluationTool[EvaluationToolFields.CHECK_POINT]} onChange={this.changeCheckPoint}/>}
                                        label="Контрольная точка"
                                        className={classes.marginBottom30}
                                    />

                                    <div>
                                        <Typography className={classes.weekTitle}>
                                            Срок контроля в неделях
                                        </Typography>
                                        <Slider
                                            defaultValue={1}
                                            step={1}
                                            marks
                                            min={0}
                                            max={20}
                                            valueLabelDisplay="on"
                                            value={evaluationTool[EvaluationToolFields.DEADLINE]}
                                            onChange={this.changeDeadline}
                                        />
                                    </div>
                                </>
                            )}
                        </AutoSizer>
                    </div>

                    <div className={classes.rightSide}>
                        <InputLabel className={classes.label}> Описание * </InputLabel>

                        <div id="toolbar-container" />

                        <CKEditor
                            //@ts-ignore
                            editor={ DecoupledEditor  }
                            //@ts-ignore
                            data={evaluationTool[EvaluationToolFields.DESCRIPTION] ? evaluationTool[EvaluationToolFields.DESCRIPTION] : ''}
                            //@ts-ignore
                            onInit={ editor => {
                                // Add the toolbar to the container
                                const toolbarContainer = document.querySelector( '#toolbar-container' );
                                //@ts-ignore
                                toolbarContainer.appendChild( editor.ui.view.toolbar.element );

                                //@ts-ignore
                                window.editor = editor;
                            }}
                            onChange={this.changeDescription}
                            id={'editor'}
                        />
                    </div>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={disableButton}
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(CreateModal));
