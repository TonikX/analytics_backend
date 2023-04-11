import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    flexDirection: 'column',
    paddingTop: '10px',
  },
  fieldsWrapper: {
    margin: '0 auto',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '20px',
    width: '95%',
    marginBottom: '20px',
  },
  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  btn: {
    width: '47%',
  },
  filterBtn: {
    backgroundColor: theme.palette.primary.main,
  },
  resetBtn: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}))