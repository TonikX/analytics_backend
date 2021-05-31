import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    cardList: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridColumnGap: '20px',
        gridRowGap: '20px',
        padding: '20px'
    },
    card: {
        padding: 50,
        display: 'flex',
        justifyContent: 'center',
        background: '#fff',
        transition: '0.3s background',
        '&:hover': {
            background: theme.palette.primary.main,
            cursor: 'pointer',
            color: '#fff',
            '& button': {
                '& span': {
                    color: '#fff',
                }
            }
        },
        '& button': {
            borderRadius: '0px'
        }
    },
    selectedCard: {
        background: theme.palette.primary.main,
        color: '#fff',
        '& button': {
            '& span': {
                color: '#fff',
            }
        }
    }
}));