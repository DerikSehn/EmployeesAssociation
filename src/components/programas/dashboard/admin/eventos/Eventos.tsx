import { Grid, Tab, Tabs, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { Evento } from '@/Utils/functions/productTypes.d';
import CadEvento from './CadEventos';
import MuralEventos from './MuralEventos';
import { AuthContext } from '../../../login/AuthProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  containerEventos: {
    padding: '.1em 0 0',
    borderRadius: '0px 0px .2em .2em',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    alignContent: 'baseline',
  },
  card: {},
  arrowBack: {},
}));

export default function Eventos() {
  const classes = useStyles();
  const { perfilUsuario } = useContext(AuthContext);
  const isAdmin = perfilUsuario?.idPerfilUsuario === 1;
  const [tab, setTab] = useState<number>(0);
  const [editEvento, setEditEvento] = useState<Evento | undefined>(undefined);

  const handleTabChange = (_: React.ChangeEvent<object>, value: number) => {
    setTab(value);
    setEditEvento(undefined);
  };

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <MuralEventos />;
      case 1:
        return <CadEvento editEvento={editEvento} onSubmit={() => setTab(1)} />;
      default:
        return null;
    }
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12} lg={10} className={classes.card}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          value={tab}
          onChange={handleTabChange}
          aria-label="My Tabs"
        >
          <Tab label="Mural" />
          {isAdmin ? <Tab label={`${editEvento ? 'Editar' : 'Cadastrar'} Eventos`} /> : null}
        </Tabs>
      </Grid>
      {/*  <Grid container justifyContent="flex-end" item xs={4} lg={2} className={classes.arrowBack}>
        <IconButton onClick={handleClickBack}>
          <ArrowBack />
        </IconButton>
      </Grid> */}
      <Grid container item xs={12} className={classes.containerEventos}>
        {renderTabContent()}
      </Grid>
    </Grid>
  );
}
