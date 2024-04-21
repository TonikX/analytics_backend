import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '24px !important',
    marginTop: '10px !important',
    marginBottom: '10px !important',
  },
  link: {
    textDecoration: 'none'
  },
  tableWrap: {
    '& td': {
        padding: '5px 10px !important',
        fontSize: '14px !important'
    },
    '& p': {
        fontSize: '14px !important'
    }
  },
  tableHeader: {
      background: theme.palette.primary.main,
      '& th': {
          color: '#fff',
          background: theme.palette.primary.main,
          fontWeight: '400',
          fontSize: '14px',
          padding: '9px 10px !important',
          whiteSpace: 'nowrap'
      }
  },
  footer: {
    display: 'flex',
  }
}));
