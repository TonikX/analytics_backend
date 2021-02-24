import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles =  makeStyles((theme: Theme) => createStyles({
  professionsLists: {
    height: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px',
    maxWidth: '1000px'
  },
  allProfessionsList: {
    width: '50%',
    height: '100%',
    borderRight: '1px solid #ccc',
    padding: '30px',
    boxSizing: 'border-box'
  },
  selectedProfessionsList: {
    width: '50%',
    padding: '30px',
    boxSizing: 'border-box'
  },
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