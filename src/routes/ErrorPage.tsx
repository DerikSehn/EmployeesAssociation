import { Button, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Headers';
import Footer from '../components/Footers';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: '50px',
    height: '3px',
  },
}));

export default function ErrorNotFound() {
  const classes = useStyles();

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Typography variant="subtitle1">Página não encontrada | 404</Typography>
        <Divider className={classes.divider} />
        <Button variant="text" color="inherit" onClick={goHome}>
          voltar
        </Button>
      </div>
      <Footer />
    </>
  );
}
