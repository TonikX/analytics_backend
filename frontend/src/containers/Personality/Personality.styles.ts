import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  wrap: {
    padding: '0px 30px 30px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px 0px',
  },
  root: {
    marginTop: "20px",
    padding: '20px 50px 20px 50px',
    minHeight: 'calc(100vh - 370px)',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    width: '100%',
    alignSelf: 'stretch',
  },
  basicInfo: {
    width: '80%',
    fontSize: '24px',
    marginBottom: '20px'
  },
  textItem: {
    marginBottom: '10px'
  },
  main: {
    marginTop: 15,
    width: '80%',
  },
role: {
    width: 'fit-content',
    borderRadius: '4px',
    padding: '2px 6px',
    marginRight: '6px',
    marginBottom: '3px',
    marginTop: '3px'
},
roleNotWhileDeliting: {
  background: '#0074DE',
  color: 'white',
  borderStyle: 'none'
},
groups: {
    display: 'flex',
    width: "400px",
    flexFlow: "row wrap"
},
add: {
  height: "28px",
  color: 'white',
  width: 'fit-content',
  marginRight: '6px',
  marginBottom: '3px',
  marginTop: '3px'
},
persName: {
  marginBottom: '20px'
},
del: {
  marginTop: '10px',
  marginRight: '7px'
},
cancel: {
  marginTop: '10px'
}
}));