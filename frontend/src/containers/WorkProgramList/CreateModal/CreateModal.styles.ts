import createStyles from "@mui/styles/createStyles";

export default () => createStyles({
    input: {
        width: '100%',
        marginBottom: '30px',
    },
    specializationSelector: {
        width: '100%',
    },
    selector: {
        width: '100%'
    },
    languageSelector: {
        width: '100%',
    },
    radioGroup: {
        // @ts-ignore
        flexDirection: 'row !important',
        marginBottom: 20,
    },
    headerCell: {
        border: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 20,
    },
    label: {
        fontSize: '14px',
        marginTop: 10
    },
    datePicker: {
        width: '100%',
        marginBottom: '20px',
    },
    marginBottom20: {
        marginBottom: '20px',
    },
    marginTop20: {
        marginTop: '20px !important',
    }
});
