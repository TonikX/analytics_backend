import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export default makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& td': {
      padding: '5px 10px !important',
      fontSize: '14px'
    },
    '& p': {
      fontSize: '14px'
    }
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  tableHead: {
    background: theme.palette.primary.main,
    '& th': {
      color: '#fff',
      background: theme.palette.primary.main,
      fontWeight: '400',
      fontSize: '14px',
      padding: '5px 10px !important',
      whiteSpace: 'pre-wrap'
    }
  },
  addButton: {
    marginLeft: 'auto !important',
    marginTop: '20px !important',
    width: 'fit-content'
  },
  actions: {
    marginLeft: 'auto',
  },
  deleteIcon: {
    marginLeft: '5px',
    cursor: 'pointer',
    position: 'relative',
    top: '5px',
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  addSmallButton: {
    fontSize: '12px',
    padding: '0px 0px !important',
    '&:hover': {
      background: 'transparent',
    }
  },
  categoryCell: {
    width: '200px'
  },
  competenceCell: {
    width: '50%'
  }
}));
