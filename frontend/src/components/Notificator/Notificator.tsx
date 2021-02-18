import React from 'react';
import shallowEqual from "recompose/shallowEqual";
import {withSnackbar, ProviderContext} from 'notistack';

interface NotificatorProps extends ProviderContext {
    errors: string[];
    successMessages: string[];
}

class Notificator extends React.Component<NotificatorProps>{
    shouldComponentUpdate(nextProps: NotificatorProps, nextState: any, nextContext: any) {
        return !shallowEqual(this.props.errors, nextProps.errors)
            || !shallowEqual(this.props.successMessages, nextProps.successMessages)
        ;
    }

    componentDidUpdate(prevProps: NotificatorProps, prevState: any, snapshot: any) {
        if (!shallowEqual(this.props.errors, prevProps.errors)){
            (typeof this.props.errors) === "object" && this.props.errors.length < 5 && this.props.errors.forEach((error: any) => {
                if (typeof error === "string"){
                    this.props.enqueueSnackbar(error, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            })
        }

        if (!shallowEqual(this.props.successMessages, prevProps.successMessages)){
            this.props.successMessages.forEach((message: any) => {
                if (typeof message === "string") {
                    this.props.enqueueSnackbar(message, {
                        variant: 'success',
                        autoHideDuration: 3000,
                    });
                }
            })
        }
    }

    render() {
        return <></>;
    }
}

export default withSnackbar(Notificator);