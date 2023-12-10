/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback, useContext, useEffect, useState } from 'react';
import CardEvento from '@/Components/cards/CardEvento';
import serverAction from '@/Utils/functions/auth.d';
import { Evento } from '@/Utils/functions/productTypes.d';
import MuralEventosSkeleton from './MuralEventosSkeleton';
import { AuthContext } from '../../../login/AuthProvider';

const useStyles: any = makeStyles((/* theme: Theme */) => ({
  root: {
    height: '100%',
    padding: '1rem',
  },
  listaEventos: {},
  gridItemEvento: {
    flexGrow: 1,
  },
}));

function MuralEventos(/* { data }: MuralEventosProps */) {
  const classes = useStyles();
  /*   const theme: Theme = useTheme();
  const [loading, setLoading] = useState(false);
 */
  const [eventos, setEventos] = useState([] as Evento[]);

  const { perfilUsuario } = useContext(AuthContext);
  const isAdmin = perfilUsuario?.idPerfilUsuario === 1;
  const handleClick = () => {};

  const getEventos = useCallback(async () => {
    /* setLoading(true); */
    const obj = {};
    await serverAction('getListEventos', obj, 'CtrlEvento', true).then((res) => {
      if (res.status) {
        setEventos(res.lista);
      }
      /*   setLoading(false); */
    });
  }, []);

  const handleDelete = (evento: Evento) => {
    const obj = {
      idAction: evento?.idEvento,
      objName: 'Evento',
    };
    serverAction('delAction', obj, 'CtrlAction', true).then((res) => {
      if (res.status) {
        getEventos();
      }
    });
  };

  useEffect(() => {
    getEventos();
  }, [getEventos]);

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12} gap={2} justifyContent="space-between" className={classes.listaEventos}>
        {eventos && eventos.length > 0 ? (
          eventos.map((evento, index) => (
            <Grid key={evento.idEvento || index} className={classes.gridItemEvento}>
              <CardEvento evento={evento} onDelete={isAdmin ? handleDelete : undefined} onClick={handleClick} />
            </Grid>
          ))
        ) : (
          <>
            <MuralEventosSkeleton />
            <MuralEventosSkeleton />
            <MuralEventosSkeleton />
            <MuralEventosSkeleton />
            <MuralEventosSkeleton />
            <MuralEventosSkeleton />
          </>
        )}
      </Grid>
    </Grid>
  );
}
/* 
MuralEventos.defaultProps = {
  data: undefined,
}; */

export default MuralEventos;
