import createStyles from "@mui/styles/createStyles";
import {Theme} from '@mui/material/styles';

export default (theme: Theme) => createStyles({
  drawerPaper: {
    width: 250,
    marginTop: 64,
    borderRight: '1px solid #f4f4f4',
    zIndex: '100 !important',
    height: 'calc(100% - 64px)',
    backgroundColor: '#f4f4f4'
  },
  divider: {
    backgroundColor: '#f4f4f4'
  },
  menuList: {
    paddingBottom: '80px !important',
  },
  menuItem: {
    // @ts-ignore
    whiteSpace: 'normal !important',
    transition: 'all 0.2s',
    margin: '5px 2px',
    padding: '5px 16px',
    color: `${theme.palette.text.primary} !important`,
    borderLeft: `4px solid transparent`,
    '&:hover': {
      backgroundColor: '#d2d2d2 !important',
      '& svg': {
        color: theme.palette.secondary.main,
      },
    }
  },
  selectedMenuItem: {
    color: `${theme.palette.secondary.main} !important`,
    backgroundColor: 'transparent !important',
    borderLeft: `4px solid ${theme.palette.secondary.main} !important`,
    padding: '10px 16px',
    '&:hover': {
      backgroundColor: '#f4f4f4 !important'
    }
  },
  link: {
    textDecoration: 'none'
  },
  icon: {
    width: 30,
    marginRight: 10
  }
});