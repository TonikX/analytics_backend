import createStyles from "@mui/styles/createStyles";

export default () => createStyles({
    tableWrap: {
        height: 'calc(100% - 60px)',
        maxheight: 'calc(100% - 60px)',
        '& td': {
            padding: '5px 10px !important',
            fontSize: '14px'
        },
        '& p': {
            fontSize: '14px'
        },
        '& th': {
            backgroundColor: '#1d51a3',
            color: '#fff'
        }
    },
    additionalFunctionsWrap: {
        // width: '1350px',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    titleWrap: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '24px !important',
        lineHeight: '39px !important',
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
    },
    searchInput: {
        height: '40px',
        minHeight: '40px',
        marginLeft: 'auto',
    },
    button: {
      height: '40px',
    },
    buttonsWrap: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
    },
    headCell: {
        // width: '12%',
    },
    idPlanCell: {
        width: '100px',
    },
    field: {
        width: '200px',
        height: '40px',
        marginRight: '20px',
    },
    addIcon: {
        marginLeft: 'auto',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
    marginRight: {
        marginRight: 20
    },
    // @ts-ignore
    popper: {
        // @ts-ignore
        zIndex: '10000 !important',
    },
    menuPaper: {
        boxShadow: '0px 0px 20px -2px rgba(160, 159, 159, 0.42)'
    },
    menuIcon: {
        marginRight: '10px',
        fill: 'rgba(0, 0, 0, 0.54)'
    },
    menuLinkItem: {
        padding: 0,
        '&>a': {
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            color: 'rgb(51, 51, 51) !important',
            textDecoration: 'none'
        },
        '&>div': {
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            color: 'rgb(51, 51, 51) !important',
            textDecoration: 'none'
        }
    },

    displayFlex: {
        display: 'flex',
    },
    headerCellTitle: {
        textAlign: 'center',
        lineHeight: '1.2',
        display: 'flex',
        alignItems: 'center'
    }
});
