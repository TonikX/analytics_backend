import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '24px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  item: {
    borderBottom: '1px solid #ccc',
    padding: '10px',
  },
  description: {
    marginBottom: '10px',
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
}));