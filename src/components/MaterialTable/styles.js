import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    title: {
        alignSelf: 'flex-start',
        padding: '50px '
    },
    btn: {
        textTransform: 'none !important',
        margin: '0 150px 50px!important'
    },
    card: {
        width: '100%'
    },
    tableCell: {
        minWidth: '150'
    },
    tableCellError: {
        backgroundColor: '#f4cccc',
        border: '1px solid rgb(224, 224, 224);'
    },
    errorFile: {
        width: '40%',
        margin: '0 auto 40px',
        textAlign: 'center',
        fontSize: 22,
        backgroundColor: '#f4cccc',
        padding: 16
    }
}));

export default useStyles;
