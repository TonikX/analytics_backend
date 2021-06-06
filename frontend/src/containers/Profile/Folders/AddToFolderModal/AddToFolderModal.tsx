import React from 'react';
import classNames from "classnames";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

import {AddToFolderModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

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
