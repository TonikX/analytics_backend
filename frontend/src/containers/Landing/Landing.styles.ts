import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: '#07152b',
    padding: '86px 0px 0px',
    color: '#fff',
  },
  headerWrap: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    }
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  drawerLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.54)',
    border: 'none',
    outline: 'none',
    '-webkit-tap-highlight-color': 'transparent',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  logo: {
    fontSize: '25px',
    marginRight: '70px'
  },
  header: {
    boxShadow: 'none',
    padding: '10px',
    background: "rgba(7, 21, 43, 0.4)",
  },
  link: {
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#dfdfdf',
    '&:hover': {
      color: '#fff',
    }
  },
  telegramIcon: {
    color: '#fff',
    border: 'none',
    outline: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    marginRight: '10px',
    [theme.breakpoints.down(480)]: {
      marginRight: '0px'
    }
  },
  headerRight: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    justifyContent: 'flex-end'
  },
  mainScreen: {
    margin: '70px auto',
    maxWidth: '1204px',
    textAlign: 'center',
    padding: '0 10px'
  },
  h1: {
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px'
    }
  },
  subTitle: {
    fontSize: '20px',
    color: '#fff',
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px'
    }
  },
  mainScreenButtons: {
    display: 'flex',
    maxWidth: '400px',
    justifyContent: 'space-between',
    margin: '0 auto',
    flexWrap: 'wrap',
    [theme.breakpoints.down(420)]: {
      justifyContent: 'center'
    }
  },
  mainButton: {
    color: '#fff',
    padding: '14px 25px',
    textTransform: 'initial',
    background: '#1d51a3',
    fontWeight: 'bold',
    borderRadius: '10px',
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:hover': {
      background: '#163ea4'
    }
  },
  headerSignUpBtn: {
    color: '#fff',
    padding: '14px 25px',
    textTransform: 'initial',
    background: '#1d51a3',
    fontWeight: 'bold',
    borderRadius: '10px',
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:hover': {
      background: '#163ea4'
    },
    [theme.breakpoints.down(480)]: {
      display: 'none'
    }
  },
  signUpIconBtn: {
    display: 'none',
    textDecoration: 'none',
    color: '#fff',
    border: 'none',
    outline: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    [theme.breakpoints.down(480)]: {
      display: 'block'
    }
  },
  signInLink: {
    [theme.breakpoints.down(480)]: {
      display: 'none'
    }
  },
  secondaryButton: {
    color: '#fff',
    padding: '14px 25px',
    textTransform: 'initial',
    border: '2px solid #fff',
    fontWeight: 'bold',
    borderRadius: '10px',
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:hover': {
      background: '#fff',
      color: '#1f1f24',
      '& a': {
        color: '#1f1f24',
      },
    }
  },
  screenshot: {
    display: 'block',
    borderRadius: '10px',
    maxWidth: '1410px',
    width: "90%",
    margin: '0 auto',
    pointerEvents: 'none',
  },
  partnersList: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    '& p':{
      fontSize: '30px',
      whiteSpace: 'nowrap',
      [theme.breakpoints.down(720)]: {
        fontSize: '20px',
        padding: '10px'
      }
    }
  },
  section: {
    margin: '100px auto',
    maxWidth: '1204px',
    padding: '0 15px'
  },
  processesListItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  processesListContent: {
    width: '40%',
    minWidth: '304px',
    [theme.breakpoints.down(760)]: {
      width: '100%'
    }
  },
  processesListContentTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  processesListContentText: {
    lineHeight: '30px'
  },
  videoWrapper: {
    width: '100%',
    height: '503px',
    [theme.breakpoints.down('md')]: {
      height: '353px',
    }
  },
  processesListContentImage: {
    maxWidth: '850px',
    width: '55%',
    borderRadius: '10px',
    overflow: 'hidden',
    flex: 'none',
    minWidth: '420px',
    [theme.breakpoints.down('md')]: {
      width: '55%',
    },
    [theme.breakpoints.down(760)]: {
      width: '100%',
      order: 2,
      minWidth: 'auto',
    }
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '50px'
  },
  usersList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  usersListItem: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    padding: '20px',
    margin: '10px',
    boxSizing: 'border-box',
    borderRadius: '10px',
    minWidth: '250px',
  },
  usersListItemTitle: {
    marginLeft: '20px',
    color: '#1f1f24',
    fontWeight: 'bold'
  },
  usersListItemImg: {
    width: '40px'
  },
  teamList: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(480)]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  teamItem: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '251px',
  },
  teamItemImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: '#fff',
    marginBottom: '20px',
    backgroundSize: 'contain !important'
  },
  teamItemTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  teamItemRole: {
    textAlign: 'center',
  },
  arrowImage: {
    width: '20px',
    marginLeft: '5px'
  },
  showAllTeam: {
    display: 'flex',
    align: 'center',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  footer: {
    background: '#1f1f24',
    width: '100%',
    boxSizing: 'border-box',
    padding: '20px 0px',
  },
  footerWrap: {
    width: '95%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  footerText: {
    color: '#dfdfdf',
    [theme.breakpoints.down(480)]: {
      fontSize: '12px'
    },
    [theme.breakpoints.down(350)]: {
      fontSize: '10px'
    }
  },
  mailIcon: {
    width: '20px',
    marginRight: '10px'
  },
  mailWrap: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(480)]: {
      fontSize: '12px'
    },
    [theme.breakpoints.down(350)]: {
      fontSize: '10px'
    }
  }
}));