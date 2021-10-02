import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    input: {
        width: '550px',
    },
    lastInput: {
        width: '550px',
    },
    selector: {
        width: '550px'
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marginBottom30: {
        marginBottom: '30px'
    },
    role: {
        width: 'fit-content',
        borderRadius: '4px',
        padding: '2px 6px',
        marginRight: '6px',
        marginBottom: '3px',
        marginTop: '3px'
    },
    roleNotToAdd: {
        background: '#6c757d',
        color: 'white',
        borderStyle: 'none'
      },
    groups: {
        paddingLeft: '7px',
        display: 'flex',
        width: "400px",
        flexFlow: "row wrap",
    },
}))