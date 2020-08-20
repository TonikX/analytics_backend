import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import {Moment} from "moment";

import {DownloadFileModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import {DatePicker} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DateIcon from "@material-ui/icons/DateRange";
import CircularProgress from '@material-ui/core/CircularProgress';

import {DownloadFileModalFields} from '../../enum';
import {DirectionFields} from "../../../Direction/enum";

import Service from '../../service';
import {YEAR_DATE_FORMAT} from "../../../../common/utils";

import connect from './DownloadFileModal.connect';
import styles from './DownloadFileModal.styles';

const service = new Service();

class DownloadFileModal extends React.PureComponent<DownloadFileModalProps> {
    state = {
        dialogData: {
            [DownloadFileModalFields.DIRECTION_ID]: null,
            [DownloadFileModalFields.YEAR]: '2020',
        },
        isFetching: false
    };

    componentDidUpdate(prevProps: Readonly<DownloadFileModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {dialogData} = this.state;

        if (!shallowEqual(this.props.downloadDialogData, prevProps.downloadDialogData)){
            this.setState({
                dialogData: {
                    ...dialogData,
                    ...this.props.downloadDialogData
                }
            })
        }
    }

    handleClose = () => {
        this.props.actions.closeDownloadModal();
    }

    handleSave = () => {
        this.setFetchingTrue();
        const fileLink = service.getDownloadFileLink(this.state.dialogData);

        let tempLink = document.createElement('a');

        tempLink.href = fileLink;

        tempLink.setAttribute('target', '_blank');

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

        this.setFetchingFalse();
    }

    setFetchingTrue = () => {
        this.setState({
            isFetching: true
        })
    };

    setFetchingFalse = () => {
        this.setState({
            isFetching: false
        })
    };

    saveField = (field: string) => (e: React.ChangeEvent) => {
        // const {module} = this.state;
        //
        // this.setState({
        //     module: {
        //         ...module,
        //         [field]: get(e, 'target.value')
        //     }
        // })
    }

    saveDirection = (e: React.ChangeEvent) => {
        const {directions} = this.props;
        const {dialogData} = this.state;
        const directionId = get(e, 'target.value');
        const direction = directions.find(directions => directions.id === directionId);

        if (direction) {
            this.setState({
                dialogData: {
                    ...dialogData,
                    [DownloadFileModalFields.DIRECTION_ID]: direction[DirectionFields.ID],
                }
            })
        }
    }

    saveYear = (date: Moment) => {
        const {dialogData} = this.state;

        this.setState({
            dialogData: {
                ...dialogData,
                [DownloadFileModalFields.YEAR]: date.year()
            }
        })
    }

    render() {
        const {isOpen, classes, directions} = this.props;
        const {dialogData, isFetching} = this.state;
        const disableButton = dialogData[DownloadFileModalFields.DIRECTION_ID] === null;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Скачать рабочую программу </DialogTitle>
                <DialogContent>
                    <FormControl className={classes.selectorWrap}>
                        <InputLabel shrink id="section-label">
                            Направление *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveDirection}
                            value={dialogData[DownloadFileModalFields.DIRECTION_ID]}
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
                        >
                            {directions.map((item: any) =>
                                <MenuItem value={item.id} key={`direction-${item.value}`}>
                                    {item[DirectionFields.TITLE]} {item[DirectionFields.NUMBER]}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <DatePicker
                        value={dialogData[DownloadFileModalFields.YEAR]}
                        onChange={(date: any) => this.saveYear(date)}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <DateIcon />
                                </IconButton>
                            ),
                        }}
                        inputVariant="outlined"
                        format={YEAR_DATE_FORMAT}
                        label={'Год'}
                        views={["year"]}
                        className={classes.datePicker}
                    />

                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={disableButton || isFetching}
                            color="primary">
                        Сохранить
                        {isFetching ? <CircularProgress size={20} style={{marginLeft: 10}} /> : <></>}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(DownloadFileModal));
