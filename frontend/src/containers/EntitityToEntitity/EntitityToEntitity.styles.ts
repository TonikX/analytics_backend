import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
  root: {
    padding: '20px 50px 20px 50px',
    boxShadow: 'none',
    borderRadius: '0px',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '24px !important',
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleCell: {
    width: '30%',
    display: 'flex',
    alignItems: 'center'
  },
  relationCell: {
    width: '20%',
    display: 'flex',
    alignItems: 'center'
  },
  list: {
    width: '100%',
    height: 'calc(100% - 50px)'
  },
  tableWrap: {
    marginTop: '20px',
    height: 'calc(100% - 60px)'
  },
  listItem: {
    width: '100%',
    display: 'flex',
    borderBottom: '1px solid #ccc',
    alignItems: 'center',
    padding: '0 0 0 20px',
    boxSizing: 'border-box',
    minHeight: '50px'
  },
  actions: {
    display: 'flex',
    height: 'fit-content',
    marginLeft: 'auto',
    padding: '0px 20px'
  },
  searchInput: {
    height: '40px'
  },
  addIcon: {
    marginLeft: 'auto',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  header: {
    background: theme.palette.primary.main,
    color: '#fff'
  },
  marginRight: {
    marginRight: 20
  },
});
