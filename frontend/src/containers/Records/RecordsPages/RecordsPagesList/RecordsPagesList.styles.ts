import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
  list: {
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 20 + 'px',
    marginRight: 0,
    paddingLeft: 12 + 'px'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 400 + 'px',
    marginBottom: 12 + 'px'
  },
  listItemText: {
    margin: 0,
    fontFamily: 'sans-serif'
  },
  listItemClose: {
    marginLeft: 20 + 'px',
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    cursor: 'pointer'
  },
});