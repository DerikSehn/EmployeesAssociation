import { CircularProgress, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../login/AuthProvider';

const useStyles = makeStyles((/* theme: Theme */) => ({
  root: {
    padding: 10,
    height: '60vh',
  },
  typographyGrid: {},
  loaderGrid: {},
}));

/* const delay = 1;
 */
function Componente() {
  const classes = useStyles();

  const navigate = useNavigate();
  /*   const [toggle, setToggle] = React.useState<boolean>(false);
   */
  const ref = React.useRef<NodeJS.Timeout | null>(null);
  const { perfilUsuario } = useContext(AuthContext);

  /*  const toggleStopwatch = () => {
    setToggle(!toggle);
  };

  const resetStopwatch = () => {
    setToggle(false);
  }; */
  function getPage() {
    switch (perfilUsuario?.idPerfilUsuario) {
      case 1:
        return 'painel';
      case 2:
        return 'usuarios';
      case 3:
        return 'empresas';
      default:
        return '404';
    }
  }

  useEffect(() => {
    let seconds = 0;
    ref.current = setInterval(() => {
      // eslint-disable-next-line no-plusplus
      seconds++;

      if (seconds === 3) {
        navigate(`/afu/${getPage()}`);
      }
    }, 1000);

    return () => {
      if (ref.current) clearInterval(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid container item justifyContent="center" alignContent="center" xs={12} className={classes.typographyGrid}>
        <Typography variant="h6">Escolha uma das opções, ou aguarde o redirecionamento automático...</Typography>
      </Grid>
      <Grid container item justifyContent="center" xs={12} className={classes.loaderGrid}>
        <CircularProgress disableShrink />
      </Grid>
    </Grid>
  );
}

export default Componente;
