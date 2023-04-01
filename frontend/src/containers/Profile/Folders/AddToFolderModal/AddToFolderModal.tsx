import React from 'react';
import classNames from "classnames";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

import {AddToFolderModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

import TextFieldComponent from "../../../../components/TextField";

import connect from './AddToFolderModal.connect';
import styles from './AddToFolderModal.styles';
import get from "lodash/get";

class AddToFolderModal extends React.PureComponent<AddToFolderModalProps> {
    state = {
        rating: 0,
        comment: '',
        folder: null,
    };

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        this.props.actions.addToFolder({
            ...this.state,
            relationId: get(this.props, 'data.relationId'),
            type: get(this.props, 'data.type'),
            callback: get(this.props, 'data.callback'),
        })
    }

    changeComment = (comment: string) => {
        this.setState({
            comment: comment
        });
    }

    changeRating = (rating: any) => {
        this.setState({
            rating: rating
        });
    }

    changeFolder = (e: React.ChangeEvent<any>) => {
        this.setState({
            folder: get(e, 'target.value')
        });
    }

    render() {
        const {isOpen, classes, folders} = this.props;
        const disableButton = this.state.folder === null;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Добавить в избранное </DialogTitle>
                <DialogContent>
                    <FormControl className={classNames(classes.selectorWrap, classes.marginBottom30)}>
                        <InputLabel shrink id="section-label">
                            Папка *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            onChange={this.changeFolder}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
                                    labelWidth={100}
                                    id="section-label"
                                />
                            }
                        >
                            {folders.map(item =>
                                <MenuItem value={item.id} key={`folder-${item.id}`}>
                                    {item.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <TextFieldComponent onChange={this.changeComment}
                                        label="Комментарий"
                                        noMargin
                    />

                    <Typography className={classes.label}>
                        Рейтинг
                    </Typography>
                    <ReactStars size={30} onChange={this.changeRating} />

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
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(AddToFolderModal));
