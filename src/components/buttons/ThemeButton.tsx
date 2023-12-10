import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((/* theme: Theme */) => ({
  root: {
    padding: 10,
  },
}));

function ThemeButton() {
  const classes = useStyles();
  return <div className={classes.root}>Seu themeButton aqui</div>;
}

export default ThemeButton;
