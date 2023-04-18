import React  from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CustomizeExpansionPanelProps } from './types'
import { useStyles } from './CustomizeExpansionPanel.styles';

const CustomizeExpansionPanel: React.FC<CustomizeExpansionPanelProps> = ({label, details}) => {
  const classes = useStyles();

  return (
    <Accordion className={classes.expansionPanelRoot}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {details}
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomizeExpansionPanel;