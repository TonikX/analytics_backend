import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: '#07152b',
    //background: '#1f1f24',
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
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
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
    color: '#fff'
  },
  headerRight: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center'
  },
  mainScreen: {
    margin: '70px auto',
    maxWidth: '1204px',
    textAlign: 'center',
  },
  h1: {
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '30px'
  },
  subTitle: {
    fontSize: '20px',
    color: '#fff',
    marginBottom: '30px'
  },
  mainScreenButtons: {
    display: 'flex',
    maxWidth: '400px',
    justifyContent: 'space-between',
    margin: '0 auto',
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
    borderRadius: '10px',
    maxWidth: '1410px',
    margin: '0 auto',
    backgroundSize: 'cover',
    height: '690px'
  },
  partnersList: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around',
    '& p':{
      fontSize: '30px',
    }
  },
  section: {
    margin: '100px auto',
    maxWidth: '1204px',
  },
  processesListItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px'
  },
  processesListContent: {
    marginRight: '50px'
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
    position: 'relative',
    paddingBottom: '56.25%',
    paddingTop: '25px',
    height: '0',
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }
  },
  processesListContentImage: {
    width: '850px',
    height: '500px',
    borderRadius: '10px',
    overflow: 'hidden',
    flex: 'none',
    backgroundSize: 'cover',
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
    justifyContent: 'space-between',
  },
  usersListItem: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
    borderRadius: '10px',
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
    justifyContent: 'space-between'
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
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#dfdfdf'
  },
  mailIcon: {
    width: '20px',
    marginRight: '10px'
  },
  mailWrap: {
    display: 'flex',
    alignItems: 'center'
  }
}));