import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";
import {Moment} from "moment";

import {DownloadFileModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CircularProgress from '@mui/material/CircularProgress';

import {DownloadFileModalFields} from '../../enum';
import {DirectionFields} from "../../../Direction/enum";

import Service from '../../service';

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

        if (!shallowEqualObjects(this.props.downloadDialogData, prevProps.downloadDialogData)){
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
        //@ts-ignore
        const {classes} = this.props;
        const {isOpen, directions} = this.props;
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
                <DialogContent className={classes.dialogContent}>
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
// @ts-ignore
export default connect(withStyles(styles)(DownloadFileModal));
