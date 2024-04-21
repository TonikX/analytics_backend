import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    cardList: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridColumnGap: '20px',
        gridRowGap: '20px',
        padding: '20px',
        "@media (max-width: 900px)": {
            gridTemplateColumns: '1fr 1fr 1fr',
        }
    },
    card: {
        padding: '55px 50px !important',
        maxWidth: '378px',
        display: 'block',
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
