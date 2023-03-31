import React, { useState } from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import ExpansionPanelDetails from "@mui/material/ExpansionPanelDetails";
import ExpansionPanel from "@mui/material/ExpansionPanel";
import ExpansionPanelSummary from "@mui/material/ExpansionPanelSummary";

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