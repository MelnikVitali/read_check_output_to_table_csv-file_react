import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    btn: {
        textTransform: 'none !important',
        margin: '50px 150px !important'
    },
    card: {
        width: '100%'
    }
}));

export default useStyles;
