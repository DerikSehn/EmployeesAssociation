import { Grid, Tab, Tabs, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Beneficio } from '@/Utils/functions/productTypes.d';
import serverAction from '@/Utils/functions/auth.d';
import TipoBeneficios from '../tipoBeneficios/TipoBeneficios';
import CadBeneficio from './CadBeneficios';
import ListaBeneficios from './ListaBeneficios';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  containerBeneficios: {
    overflow: 'auto',
    padding: '.1em 0 0',
    borderRadius: '0px 0px .2em .2em',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    alignContent: 'baseline',
  },
  card: {},
}));

export default function Beneficios() {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);
  const [editBeneficio, setEditBeneficio] = useState<Beneficio | undefined>(undefined);

  const handleTabChange = (_: React.ChangeEvent<object>, value: number) => {
    setTab(value);
    setEditBeneficio(undefined);
  };

  const handleSelect = async (idBeneficio: number) => {
    const obj = {
      idBeneficio,
    };
    await serverAction('getBeneficio', obj, 'CtrlBeneficio', true).then((res) => {
      if (res.status) {
        setEditBeneficio(res);
        setTab(1);
      }
    });
  };

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <ListaBeneficios onSelect={handleSelect} />;
      case 1:
        return <CadBeneficio editBeneficio={editBeneficio} onSubmit={() => setTab(1)} />;
      case 2:
        return <TipoBeneficios />;
      default:
        return null;
    }
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12} md={6} className={classes.card}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          value={tab}
          onChange={handleTabChange}
          aria-label="My Tabs"
        >
          <Tab label="Listagem de Benefícios" />
          <Tab label={`${editBeneficio ? 'Editar' : 'Cadastrar'} Benefício`} />
          <Tab label="Tipos de Benefício" />
        </Tabs>
      </Grid>
      <Grid container item xs={12} className={classes.containerBeneficios}>
        {renderTabContent()}
      </Grid>
    </Grid>
  );
}
