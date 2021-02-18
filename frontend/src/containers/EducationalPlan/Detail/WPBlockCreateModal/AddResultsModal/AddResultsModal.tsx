import React from 'react';
import get from 'lodash/get';

import {AddResultsModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

import connect from './AddResultsModal.connect';
import styles from './AddResultsModal.styles';

class AddResultsModal extends React.PureComponent<AddResultsModalProps> {
    state = {
        results: []
    };

    componentDidUpdate(prevProps: Readonly<AddResultsModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.workProgramId !== this.props.workProgramId && this.props.isOpen){
            this.props.workProgramActions.getResults(this.props.workProgramId);
        }
    }

    handleClose = () => {
        this.props.closeDialog();
    }

    handleSave = () => {
        this.props.saveDialog(this.state.results);
        this.props.closeDialog();
        this.setState({results: []})
    }

    save = (e: React.ChangeEvent) => {
        const {resultsList} = this.props;
        const resultsIds = get(e, 'target.value');
        // @ts-ignore
        const results = resultsList.filter(result => resultsIds.find(id => id === result.value));

        this.setState({results: results})
    }

    render() {
        const {isOpen, classes, resultsList} = this.props;
        const {results} = this.state;

        // @ts-ignore
        const disableButton = get(this, 'state.results.length', 0) === 0;

        // @ts-ignore
        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog,
                    root: classes.root,
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Добавить результаты</DialogTitle>

                <DialogContent>
                    <FormControl className={classes.selectorWrap}>
                        <InputLabel shrink id="section-label">
                            Результаты *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.save}
                            // @ts-ignore
                            value={results.map(item => item.value)}
                            fullWidth
                            input={
                                <OutlinedInput
                                    notched
                                    labelWidth={100}
                                    id="section-label"
                                />
                            }
                            multiple
                            MenuProps={{
                                PopoverClasses: {
                                    root: classes.selector
                                }
                            }}
                        >
                            {resultsList.map(item =>
                                <MenuItem value={item.value} key={`type-${item.value}`}>
                                    {item.label}
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
                            disabled={disableButton}
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(AddResultsModal));
