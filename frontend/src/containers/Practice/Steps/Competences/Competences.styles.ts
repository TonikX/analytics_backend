import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  smallButton: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  },
  cell: {
    width: '25%'
  },
  header: {
    background: `${theme.palette.primary.main} !important`,
    color: '#fff !important',
    fontWeight: '400 !important',
    height: '45px !important',
    padding: '0 10px !important',
  },
  deleteIcon: {
    position: 'relative',
    top: '6px',
    cursor: "pointer",
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  alertText: {
    color: theme.palette.error.main,
    width: '100%',
  },
  addZUNButton: {
    marginLeft: 'auto !important'
  },
  subTitle: {
    marginBottom: '6px !important',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
}))
