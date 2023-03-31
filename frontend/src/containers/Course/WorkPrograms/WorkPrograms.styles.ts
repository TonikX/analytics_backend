import {createStyles, Theme, makeStyles} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '24px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none'
  },
  tableWrap: {
    '& td': {
        padding: '5px 10px !important',
        fontSize: '14px'
    },
    '& p': {
        fontSize: '14px'
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