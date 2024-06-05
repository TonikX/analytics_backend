import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

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
    "@media (max-width: 600px)": {
      justifyContent: 'flex-start',
    }
  },
  menuButton: {
    display: 'none !important',
    "@media (max-width: 600px)": {
      display: 'block !important',
      marginLeft: 'initial !important',
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
    "@media (max-width: 600px)": {
      display: 'none'
    }
  },
  logo: {
    fontSize: '25px',
    marginRight: '70px !important'
  },
  header: {
    boxShadow: 'initial !important',
    padding: '10px',
    background: "rgba(7, 21, 43, 0.4) !important",
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
    "@media (max-width: 480px)": {
      marginRight: '0px',
      marginLeft: 'initial !important',
    }
  },
  headerRight: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    "@media (max-width: 900px)": {
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
    fontSize: '50px !important',
    fontWeight: 'bold !important',
    color: '#fff !important',
    marginBottom: '30px !important',
    "@media (max-width: 600px)": {
      fontSize: '30px !important'
    }
  },
  subTitle: {
    fontSize: '20px !important',
    color: '#fff',
    marginBottom: '30px !important',
    "@media (max-width: 600px)": {
      fontSize: '15px !important'
    }
  },
  mainScreenButtons: {
    display: 'flex',
    maxWidth: '400px',
    justifyContent: 'space-between',
    margin: '0 auto',
    flexWrap: 'wrap',
    "@media (max-width: 420px)": {
      justifyContent: 'center'
    }
  },
  mainButton: {
    color: '#fff',
    padding: '14px 25px !important',
    // @ts-ignore
    textTransform: 'initial !important',
    background: '#1d51a3 !important',
    fontWeight: 'bold !important',
    borderRadius: '10px !important',
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:hover': {
      background: '#163ea4'
    }
  },
  headerSignUpBtn: {
    color: '#fff !important',
    padding: '14px 25px !important',
    // @ts-ignore
    textTransform: 'initial !important',
    background: '#1d51a3 !important',
    fontWeight: 'bold !important',
    borderRadius: '10px !important',
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:hover': {
      background: '#163ea4'
    },
    "@media (max-width: 480px)": {
      display: 'none !important'
    }
  },
  signUpIconBtn: {
    display: 'none',
    textDecoration: 'none',
    color: '#fff !important',
    border: 'none !important',
    outline: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    "@media (max-width: 480px)": {
      display: 'block',
      marginLeft: 'initial !important'
    }
  },
  signInLink: {
    "@media (max-width: 480px)": {
      display: 'none'
    }
  },
  secondaryButton: {
    color: '#fff !important',
    padding: '14px 25px !important',
    // @ts-ignore
    textTransform: 'initial !important',
    border: '2px solid #fff !important',
    fontWeight: 'bold !important',
    borderRadius: '10px !important',
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
      "@media (max-width: 720px)": {
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
    "@media (max-width: 760px)": {
      width: '100%'
    }
  },
  processesListContentTitle: {
    fontSize: '30px !important',
    fontWeight: 'bold !important',
    marginBottom: '20px !important'
  },
  processesListContentText: {
    lineHeight: '30px !important'
  },
  videoWrapper: {
    width: '100%',
    height: '503px',
    "@media (max-width: 900px)": {
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
    "@media (max-width: 900px)": {
      width: '55%',
    },
    "@media (max-width: 760px)": {
      width: '100%',
      order: 2,
      minWidth: 'auto',
    }
  },
  sectionTitle: {
    fontWeight: 'bold !important',
    color: '#fff',
    // @ts-ignore
    textAlign: 'center !important',
    fontSize: '20px !important',
    marginBottom: '50px !important'
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
    marginLeft: '20px !important',
    color: '#1f1f24',
    fontWeight: 'bold !important'
  },
  usersListItemImg: {
    width: '40px'
  },
  teamList: {
    display: 'flex',
    justifyContent: 'space-between',
    "@media (max-width: 480px)": {
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
    fontWeight: 'bold !important',
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
    fontWeight: 'bold !important'
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
    "@media (max-width: 480px)": {
      fontSize: '12px !important'
    },
    "@media (max-width: 350px)": {
      fontSize: '10px !important'
    }
  },
  mailIcon: {
    width: '20px',
    marginRight: '10px'
  },
  mailWrap: {
    display: 'flex',
    alignItems: 'center',
    "@media (max-width: 480px)": {
      fontSize: '12px !important'
    },
    "@media (max-width: 350px)": {
      fontSize: '10px !important'
    }
  }
}));
