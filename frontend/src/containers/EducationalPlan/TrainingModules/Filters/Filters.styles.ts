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
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  field: {
    width: '23%',
    marginBottom: '20px',
  },
  btnsWrapper: {
    display: 'flex',
    width: '490px',
    justifyContent: 'space-between',
    "@media (max-width: 880px)": {
      width: '100%',
    }
  },
  btn: {
    width: '235px',
    "@media (max-width: 880px)": {
      width: '40%',
    }
  },
  filterBtn: {
    backgroundColor: theme.palette.primary.main,
  },
  resetBtn: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}))
