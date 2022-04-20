import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from "./PracticeList.styles";
import connect from './PracticeList.connect';
import {PracticeListProps} from "./types";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CreateModal from "./CreateModal";

class PracticeList extends React.Component<PracticeListProps> {

    componentDidMount() {
        this.props.actions.getPracticeList();
    }

    handleOpenModal = () => {
        console.log(this.props);
        this.props.actions.openModal();
    }

    render() {
        const {classes, practiceList} = this.props;
        return (
            <Paper className={classes.root}>
                Hello, found {practiceList.length} items!
                <Fab color="secondary"
                     classes={{
                         root: classes.addIcon
                     }}
                     onClick={this.handleOpenModal}
                >
                    <AddIcon/>
                </Fab>
                <CreateModal/>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(PracticeList));