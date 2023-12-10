import { Grid, Tab, Tabs, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Compra } from '@/Utils/functions/productTypes.d';
import serverAction from '@/Utils/functions/auth.d';
import CadCompra from './CadCompra';
import ListaCompras from './ListaCompras';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  containerCompras: {
    padding: '.1em 0 0',
    overflow: 'auto',
    borderRadius: '0px 0px .2em .2em',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    alignContent: 'baseline',
  },
  card: {},
  arrowBack: {},
}));

export default function Compras() {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);
  const [editCompra, setEditCompra] = useState<Compra | undefined>(undefined);

  const handleTabChange = (_: React.ChangeEvent<object>, value: number) => {
    setTab(value);
    setEditCompra(undefined);
  };

  const handleSelect = async (idCompra: number) => {
    const obj = {
      idCompra,
    };

    await serverAction('getCompra', obj, 'CtrlCompra', true).then((res) => {
      if (res.status) {
        setEditCompra(res as Compra);
        setTab(1);
      }
    });
  };

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <ListaCompras onSelect={handleSelect} />;
      case 1:
        return <CadCompra editCompra={editCompra} onSubmit={() => setTab(1)} />;
      default:
        return null;
    }
  };

  /*  const handleClickBack = () => {
    navigate('/afu/compras');
  }; */

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
          <Tab label="Listagem" />
          <Tab label={`${editCompra ? 'Editar' : 'Cadastrar'} Compra`} />
        </Tabs>
      </Grid>
      {/*  <Grid container justifyContent="flex-end" item xs={4} lg={2} className={classes.arrowBack}>
        <IconButton onClick={handleClickBack}>
          <ArrowBack />
        </IconButton>
      </Grid> */}
      <Grid container item xs={12} className={classes.containerCompras}>
        {renderTabContent()}
      </Grid>
    </Grid>
  );
}
