import React, { useState } from 'react'

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import { CustomizeExpansionPanelProps } from './types'
import { useStyles } from "./CustomizeExpansionPanel.styles";

export default ({label, details}: CustomizeExpansionPanelProps) => {
    const [ openPanel, changeOpenPanel ] = useState(false)
    const classes = useStyles();

    return (
        <ExpansionPanel classes={{root: classes.expansionPanelRoot}} expanded={openPanel} onChange={() => changeOpenPanel(!openPanel)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{label}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{root: classes.expansionPanel}}>
                {details}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}