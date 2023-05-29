import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  dialog: {
    padding: 20,
  },
  selectorWrap: {
    width: '100%',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '450px !important'
    }
  },
  marginBottom30: {
    marginBottom: '30px !important'
  },
  actions: {
    marginTop: '10px'
  },
  title: {
    padding: 0,
    marginBottom: '30px'
  },
  chipsList: {
    display: 'flex',
    marginTop: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  chip: {
    marginRight: '10px',
    marginBottom: '10px',
    '& span': {
      whiteSpace: 'initial !important'
    }
  },
  onlyWithStandardSwitcher: {
    marginBottom: '20px',
  },
  info: {
    marginTop: '10px',
    cursor: 'pointer',
    color: '#ec1946'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  }
}));
