import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import {WithStyles} from "@material-ui/core";

import styles from './Menu.styles';

interface MenuProps extends WithStyles<typeof styles> {
    isOpen: boolean
}

class Menu extends React.PureComponent<MenuProps>{
    render() {
        const {classes, isOpen} = this.props;

        return(
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

            </Drawer>
        );
    }
}

export default withStyles(styles)(Menu);