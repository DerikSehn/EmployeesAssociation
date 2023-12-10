import { ArrowBack } from '@mui/icons-material';
import { Grid, IconButton, Tab, Tabs, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { Associado, Usuario } from '@/Utils/functions/userTypes.d';
import serverAction from '@/Utils/functions/auth.d';
import { AuthContext } from '../../../login/AuthProvider';
import CadUsuario from './CadUsuario';
import ListaUsuarios from './ListaUsuarios';
import DetalhesAssociado from './associado/DetalhesAssociado';
import ListaAssociados from './associado/ListaAssociados';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  content: {
    padding: '.1em 0 0',
    overflow: 'auto',
    borderRadius: '0px 0px .2em .2em',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    alignContent: 'baseline',
  },
  card: {},
}));

export default function Usuarios() {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);

  const { perfilUsuario } = useContext(AuthContext);
  const isAdmin = perfilUsuario?.idPerfilUsuario === 1;
  const [editUsuario, setEditUsuario] = useState<Usuario | Associado | undefined>(undefined);

  const handleTabChange = (_: React.ChangeEvent<object>, value: number) => {
    setTab(value);
    setEditUsuario(undefined);
  };

  const handleSelect = (objName: 'usuario' | 'associado') => async (idAction: number) => {
    const obj = {
      idAction,
      objName,
    };
    await serverAction('getActionById', obj, 'CtrlAction', true).then(async (res) => {
      if (res.status) {
        if (objName === 'usuario') {
          const perfil = await serverAction('getPerfilUsuario', { idUsuario: idAction }, 'CtrlLogin', true);
          setEditUsuario({ ...res, perfilUsuario: perfil || { idPerfilUsuario: undefined } } as Usuario);
          setTab(2);
        } else {
          setEditUsuario(res as Associado);
          setTab(3);
        }
      }
    });
  };

  const renderContent = () => {
    switch (tab) {
      case 0:
        return <ListaAssociados onSelect={handleSelect('associado')} />;
      case 1:
        return <ListaUsuarios onSelect={handleSelect('usuario')} />;
      case 2:
        return <CadUsuario editUsuario={editUsuario as Usuario} onSubmit={() => setTab(1)} />;
      case 3:
        return (
          <>
            <Grid container pr={2} pt={1} item xs={12} justifyContent="space-between">
              <Grid item pt={1.2} pl={2}>
                <Typography variant="h5" fontWeight="bold">
                  Informações do Associado
                </Typography>
              </Grid>

              <IconButton onClick={() => setTab(0)}>
                <ArrowBack />
              </IconButton>
            </Grid>
            <DetalhesAssociado associado={editUsuario as Associado} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12} md={8} className={classes.card}>
        <Tabs scrollButtons="auto" allowScrollButtonsMobile variant="scrollable" value={tab} onChange={handleTabChange}>
          <Tab label="Listagem de Associados" />
          {isAdmin ? <Tab label="Listagem de Usuários" /> : null}
          {isAdmin ? <Tab label={`${!editUsuario ? 'Cadastrar' : 'Editar'} Usuário`} /> : null}
        </Tabs>
      </Grid>
      <Grid container item xs={12} className={classes.content}>
        {renderContent()}
      </Grid>
    </Grid>
  );
}
