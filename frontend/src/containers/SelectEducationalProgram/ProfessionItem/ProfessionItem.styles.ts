import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  professionListItem: {
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: '30px',
    alignItems: 'center',
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