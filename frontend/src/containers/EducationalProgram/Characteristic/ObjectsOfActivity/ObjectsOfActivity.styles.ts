import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export default makeStyles((theme: Theme) => createStyles({
  label: {
    fontSize: '14px',
    marginBottom: '10px !important',
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      color: '#fff !important',
    },
    '& svg': {
      marginLeft: '10px',
    }
  },
  dialogContent: {
    padding: '10px 24px 20px 24px !important',
  },
  tooltip: {
    fontSize: 14,
    zIndex: 10
  },
  header: {
    background: theme.palette.primary.main,
    '& th': {
      color: '#fff',
      background: theme.palette.primary.main,
      fontWeight: '400',
      fontSize: '14px',
      padding: '0px 10px !important',
      whiteSpace: 'initial'
    },
    '& tr': {
      height: '41px'
    }
  }, dialog: {
    padding: 20,
  },
  marginBottom30: {
    marginBottom: '30px !important'
  },
  actions: {
    marginTop: '30px'
  },
  title: {
    padding: 0,
    marginBottom: '10px'
  },
  deleteButtonWrap: {
    textAlign: 'right',
  }
}));