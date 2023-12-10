import { Grid, Tab, Tabs, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { Conveniado } from '@/Utils/functions/userTypes.d';
import serverAction from '@/Utils/functions/auth.d';
import CadEmpresas from './CadEmpresas';
import ListaEmpresas from './Lista';
import { AuthContext } from '@/Components/programas/login/AuthProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  containerReceitas: {
    padding: '.1em 0 0',
    borderRadius: '0px 0px .2em .2em',
    overflow: 'auto',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    alignContent: 'baseline',
  },
  card: {},
}));

export default function Usuarios() {
  const classes = useStyles();
  /*   const navigate = useNavigate();
   */ const [tab, setTab] = useState<number>(0);
  const [editEmpresa, setEditEmpresa] = useState<Conveniado | undefined>(undefined);
  const { perfilUsuario } = useContext(AuthContext);
  const isAdmin = perfilUsuario?.idPerfilUsuario === 1;

  const handleTabChange = (_: React.ChangeEvent<object>, value: number) => {
    setTab(value);
    setEditEmpresa(undefined);
  };

  const handleSelect = async (idConveniado: number) => {
    const obj = {
      idConveniado,
    };
    await serverAction('getConveniado', obj, 'CtrlConveniado', true).then((res) => {
      if (res.status) {
        setEditEmpresa(res as Conveniado);
        setTab(1);
      }
    });
  };

  /* const handleClick = (page: string) => {
    navigate(`/afu/${page}`);
  }; */

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <ListaEmpresas onSelect={handleSelect} />;
      case 1:
        return <CadEmpresas {...{ editEmpresa }} />;
      default:
        return null;
    }
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12} md={6} className={classes.card}>
        {isAdmin ? (
          <Tabs
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            value={tab}
            onChange={handleTabChange}
            aria-label="My Tabs"
          >
            <Tab label="Listagem de Empresas" />
            <Tab label={`${editEmpresa ? 'Editar' : 'Cadastrar'} Empresa`} />
          </Tabs>
        ) : null}
      </Grid>
      <Grid container item xs={12} className={classes.containerReceitas}>
        {renderTabContent()}
      </Grid>
    </Grid>
  );
}
