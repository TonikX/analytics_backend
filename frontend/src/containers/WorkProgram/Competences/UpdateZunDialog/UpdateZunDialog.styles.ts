import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  dialog: {
    padding: 20,
  },
  marginBottom30: {
    marginBottom: '30px !important'
  },
  actions: {
    marginTop: '10px'
  },
  title: {
    padding: '0px !important',
    marginBottom: '10px !important',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chipsList: {
    display: 'flex',
    marginTop: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap'
  },
  chip: {
    marginRight: '10px !important',
    marginBottom: '10px !important',
    '& span': {
      whiteSpace: 'initial !important'
    }
  },
}));
