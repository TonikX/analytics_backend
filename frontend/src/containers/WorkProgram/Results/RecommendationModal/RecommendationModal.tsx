import React from 'react';
import {shallowEqual} from "recompose";

import {RecommendationModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from '@material-ui/core/styles/withStyles';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import {fields} from '../../enum';

import connect from './RecommendationModal.connect';
import styles from './RecommendationModal.styles';
import {Chip, Typography} from "@material-ui/core";

class RecommendationModal extends React.PureComponent<RecommendationModalProps> {
    state = {
        selectedItems: [] as number[]
    };

    componentDidUpdate(prevProps: Readonly<RecommendationModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {isOpen} = this.props;

        if (!shallowEqual(isOpen, prevProps.isOpen)){
            this.props.actions.getRecommendedPrerequisites();
        }
    }

    handleClose = () => {
        this.setState(() => ({
            selectedItems: []
        }));
        this.props.actions.closeDialog(fields.GET_RECOMMENDATIONS);
    };

    handleSave = () => {
        const {selectedItems} = this.state;
        selectedItems.forEach((id) => {
            this.props.actions.addResult({
                id: null,
                evaluation_tool: [],
                masterylevel: '1',
                item: {
                    id
                }
            })
        });
        this.handleClose();
    };

    selectItem = (item: {id: number}) => {
        const {selectedItems} = this.state;

        if (selectedItems.includes(item.id)) {
            this.setState(() => ({
                selectedItems: this.state.selectedItems.filter((it) => it !== item.id)
            }));
        } else {
            this.setState(() => ({
                selectedItems: [...this.state.selectedItems, item.id]
            }));
        }
    };

    render() {
        const {isOpen, classes, recommendations} = this.props;
        const {selectedItems} = this.state;
        const disableButton = selectedItems.length === 0;

        const recommendationsContent = recommendations.length === 0 ? <Typography>
            Для вас пока нет рекомендаций. Заполните больше разделов в текущей РПД.
        </Typography> : (
            <div className={classes.recommendations}>
                {
                    recommendations.map(({item}) => <Chip
                        color={selectedItems.includes(item.id) ? "primary" : "default"}
                        key={item.id}
                        onClick={() => this.selectItem(item)}
                        label={item.name}
                    />)
                }
            </div>
        );

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle>
                    <div className={classes.dialogTitle}>
                        Рекомендации результатов
                        <Tooltip
                            title={
                                <span style={{ fontSize: '13px' }}>
                                    Результат обучения - объект, отражающий конкретное знание из конкретной области
                                    (далее "учебная сущность"), которым студент обладает после окончания курса.
                                </span>
                            }
                        >
                            <HelpOutlineIcon color="primary" style={{ marginLeft: '10px', paddingTop: '4px' }} />
                        </Tooltip>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {recommendationsContent}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отменить
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={disableButton}
                            color="primary">
                        Применить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(RecommendationModal));
