import { Grid, Tab, Tabs, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { TipoBeneficio } from '@/Utils/functions/productTypes.d';
import serverAction from '@/Utils/functions/auth.d';
import CadTipoBeneficio from './CadTipoBeneficios';
import ListaTipoBeneficios from './ListaTipoBeneficios';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  containerTipoBeneficios: {
    padding: '.1em 0 0',
    borderRadius: '0px 0px .2em .2em',
    overflow: 'auto',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    alignContent: 'baseline',
  },
  card: {},
  arrowBack: {},
}));

export default function TipoBeneficios() {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);
  const [editTipoBeneficio, setEditTipoBeneficio] = useState<TipoBeneficio | undefined>(undefined);

  const handleTabChange = (_: React.ChangeEvent<object>, value: number) => {
    setTab(value);
    setEditTipoBeneficio(undefined);
  };

  const handleSelect = async (idTipoBeneficio: number) => {
    const obj = {
      idTipoBeneficio,
    };
    await serverAction('getTipoBeneficio', obj, 'CtrlTipoBeneficio', true).then((res) => {
      if (res.status) {
        setEditTipoBeneficio(res as TipoBeneficio);
        setTab(1);
      }
    });
  };

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <ListaTipoBeneficios onSelect={handleSelect} />;
      case 1:
        return <CadTipoBeneficio editTipoBeneficio={editTipoBeneficio} onSubmit={() => setTab(1)} />;
      default:
        return null;
    }
  };

  /*  const handleClickBack = () => {
    navigate('/afu/tipo_beneficios');
  }; */

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={8} lg={10} className={classes.card}>
        <Tabs scrollButtons="auto" variant="scrollable" allowScrollButtonsMobile value={tab} onChange={handleTabChange}>
          <Tab label="Listagem" />
          <Tab label={`${editTipoBeneficio ? 'Editar' : 'Cadastrar'} Tipo de Benefício`} />
        </Tabs>
      </Grid>
      {/*  <Grid container justifyContent="flex-end" item xs={4} lg={2} className={classes.arrowBack}>
        <IconButton onClick={handleClickBack}>
          <ArrowBack />
        </IconButton>
      </Grid> */}
      <Grid container item xs={12} className={classes.containerTipoBeneficios}>
        {renderTabContent()}
      </Grid>
    </Grid>
  );
}
