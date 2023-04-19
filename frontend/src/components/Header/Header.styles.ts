import createStyles from "@mui/styles/createStyles";
import {Theme} from '@mui/material/styles';

export default (theme: Theme) => createStyles({
  avatar: {
    marginLeft: 10,
  },
  rightSide: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    zIndex: 1000,
    boxShadow: 'none !important'
  },
  popper: {
    zIndex: '10000 !important'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary
    }
  },
  menuIcon: {
    marginRight: '20px'
  },
  bookmarkIcon: {
    color: '#fff'
  },
  telegramIcon: {
    color: '#fff'
  },
  userProfileIcon: {
    color: '#fff',
  },
  count: {
    position: 'absolute',
    background: '#fff',
    borderRadius: '50px',
    fontSize: '10px',
    width: '15px',
    height: '15px',
    bottom: '7px',
    left: '27px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  }
});
