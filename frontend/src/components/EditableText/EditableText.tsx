import React, {Component} from 'react';

import isFunction from 'lodash/isFunction';
import get from 'lodash/get';

import shallowEqual from 'recompose/shallowEqual';
import classNames from "classnames";

import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import ConfirmReject from '../ConfirmReject';

import {isStringValueValid} from '../../common/utils';

import styles from './EditableText.styles';

interface EditableTextProps extends WithStyles {
    value: string;
    height?: number;
    isEditMode: boolean;
    onClickDone: (value: string) => void;
    onClickCancel: () => void;
    autoFocus?: boolean;
    fullWidth?: boolean;
    textPrefix?: string;
    textClass?: string;
    onValueClick?: () => void;
    disableOutline?: boolean;
}

interface EditableTexState {
    value: string;
}

class EditableText extends Component<EditableTextProps, EditableTexState> {
    constructor(props: EditableTextProps) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    // eslint-disable-next-line no-undef
    static getDerivedStateFromProps(nextProps: Readonly<EditableTextProps>, prevState: Readonly<EditableTexState>): Object|null {
        if(!prevState.value && !nextProps.isEditMode){
            return { value: nextProps.value};
        }
        return null;
    }

    // eslint-disable-next-line no-undef
    shouldComponentUpdate(nextProps: Readonly<EditableTextProps>, nextState: Readonly<EditableTexState>, nextContext: any): boolean {
        return nextProps.value !== this.props.value
            || nextProps.isEditMode !== this.props.isEditMode
            || nextState.value !== this.state.value
            || !shallowEqual(nextProps.classes, this.props.classes);
    }

    handleOnClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
    };

    handleOnDoubleClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
    };

    onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            value: event.target.value
        });
    };

    handleSaveTitle = (): void => {
        this.props.onClickDone(this.state.value || this.props.value);
    };

    handleClickResetTitle = (): void => {
        this.setState({
            value: this.props.value
        });

        this.props.onClickCancel();
    };

    handleKeyPress = (event: React.KeyboardEvent): void => {
        event.stopPropagation();
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            const isValidValue = isStringValueValid(get(event, 'target.value', ''));

            if (isValidValue){
                isFunction(this.props.onClickDone) && this.props.onClickDone(this.state.value || this.props.value);
            }
        }
    };

    valueClickHandler = (e: React.MouseEvent<Element, MouseEvent>): void => {
        e.stopPropagation();

        isFunction(this.props.onValueClick) && this.props.onValueClick();
    };

    render(): React.ReactElement {
        const { isEditMode, classes, height, autoFocus, fullWidth, textPrefix, textClass, onValueClick } = this.props;
        const { value } = this.state;

        if (!isEditMode) {
            return <p className={classNames({[classes.clickableValue]: Boolean(onValueClick)})}
                      onClick={this.valueClickHandler}
            >
                {textPrefix} <span className={textClass && classes[textClass]}>{value}</span>
            </p>;
        }

        return (
            <ClickAwayListener onClickAway={this.handleClickResetTitle}>
                <TextField
                    onChange={this.onChangeTitle}
                    onClick={this.handleOnClick}
                    onDoubleClick={this.handleOnDoubleClick}
                    onKeyPress={this.handleKeyPress}
                    autoFocus={autoFocus}
                    fullWidth={fullWidth}
                    value={value}
                    InputProps={{
                        className: classes.textField,
                        style: {
                            height: height || 32
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <ConfirmReject
                                    value={value}
                                    onConfirm={this.handleSaveTitle}
                                    onReject={this.handleClickResetTitle}
                                />
                            </InputAdornment>
                        )
                    }}
                />
            </ClickAwayListener>
        );
    }
}

export default withStyles(styles)(EditableText);
