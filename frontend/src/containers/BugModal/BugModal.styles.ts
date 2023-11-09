import createStyles from "@mui/styles/createStyles";
import {makeStyles} from "@mui/styles";

export default makeStyles(() => createStyles({
    formInput: {
        display: 'flex',
        flexDirection: 'column',
    },
    formInput_margin: {
        marginBottom: '20px !important',
        width: '500px'
    },
}));
