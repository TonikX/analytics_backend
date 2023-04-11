import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  professionListItem: {
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  professionTitle: {
    lineHeight: 1.2,
    paddingBottom: '5px',
    paddingTop: '5px'
  },
  iconButton: {
    width: '30px',
    height: '30px',
    marginRight: '10px'
  },
  addIcon: {
    color: theme.palette.primary.main,
  },
  removeIcon: {
      color: theme.palette.secondary.main,
  },
}));