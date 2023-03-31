import React from 'react';
import get from 'lodash/get';

import {AddIndicatorsModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import withStyles from '@mui/material/styles/withStyles';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import connect from './AddIndicatorsModal.connect';
import styles from './AddIndicatorsModal.styles';

class AddIndicatorsModal extends React.PureComponent<AddIndicatorsModalProps> {
    state = {
        indicators: []
    };

    componentDidUpdate(prevProps: Readonly<AddIndicatorsModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.competenceId !== this.props.competenceId && this.props.isOpen){
            this.props.indicatorsActions.getIndicatorsDependsCompetence(this.props.competenceId);
        }
    }

    handleClose = () => {
        this.props.closeDialog();
    }

    handleSave = () => {
        this.props.saveDialog(this.state.indicators);
        this.props.closeDialog();
        this.setState({indicators: []})
    }

    save = (e: React.ChangeEvent) => {
        const {indicatorsList} = this.props;
        const indicatorsIds = get(e, 'target.value');
        // @ts-ignore
        const indicators = indicatorsList.filter(indicator => indicatorsIds.find(id => id === indicator.value));

        this.setState({indicators: indicators})
    }

    render() {
        const {isOpen, classes, indicatorsList} = this.props;
        const {indicators} = this.state;

        // @ts-ignore
        const disableButton = get(this, 'state.indicators.length', 0) === 0;

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
                <DialogTitle>Добавить индикаторы</DialogTitle>

                <DialogContent>
                    <FormControl className={classes.selectorWrap}>
                        <InputLabel shrink id="section-label">
                            Индикаторы *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.save}
                            // @ts-ignore
                            value={indicators.map(item => item.value)}
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
                            {indicatorsList.map(item =>
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
export default connect(withStyles(styles)(AddIndicatorsModal));
