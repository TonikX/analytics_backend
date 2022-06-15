import {createStyles, makeStyles, Theme} from "@material-ui/core";

export default makeStyles((theme: Theme) => createStyles({
  label: {
    fontSize: '14px',
    marginBottom: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginLeft: '10px',
    }
  },
  tooltip: {
    fontSize: 14,
    zIndex: 10,
    '& a': {
      color: '#fff !important',
    },
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
    marginBottom: '30px'
  },
  actions: {
    marginTop: '10px'
  },
  title: {
    padding: 0,
    marginBottom: '30px'
  },
  deleteButtonWrap: {
    textAlign: 'right',
  },
  wrapSelector: {
    '& .MuiInputLabel-shrink': {
      transform: 'translate(13px, -6.5px) scale(0.75) !important',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '170px !important'
    },
  }
}));