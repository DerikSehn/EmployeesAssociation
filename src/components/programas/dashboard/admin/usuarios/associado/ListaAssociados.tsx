/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timelapse } from '@mui/icons-material';
import { Collapse, Grid, IconButton, LinearProgress, Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import { Associado, gerarAssociados } from '@/Utils/functions/userTypes.d';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';
import GenericTable from '@/Components/lists/GenericTable';
import { AuthContext } from '@/Components/programas/login/AuthProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  listaBeneficios: {},
  table: {},
  row: {
    position: 'relative',
    '&:hover': {
      '& $deleteIcon': { transition: '.1s', opacity: 1 },
    },
  },
  deleteIcon: {
    position: 'absolute',
    right: '0px',
    opacity: 0,
    color: theme.palette.error.light,
  },
  search: {
    padding: '1em',
  },
}));

interface ListaProps {
  onSelect(idAssociado: number | undefined): void;
}

function ListaAssociados({ onSelect }: ListaProps) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { perfilUsuario } = useContext(AuthContext);
  const isAdmin = perfilUsuario?.idPerfilUsuario === 1;

  const handleDelete = async (idAssociado: number | undefined) => {
    if (!idAssociado) return;
    const obj = {
      objName: 'Associado',
      idAction: idAssociado,
    };
    await serverAction('inativaAction', obj, 'CtrlAction', true).then((res: any) => {
      if (res.status) {
        setAlert('Atenção! associado excluído', 'warning');
      }
    });
  };

  const handleClickAction = async () => {
    setLoading(true);
    await serverAction('atualizaAssociadosSenior', {}, 'CtrlAssociado', true).then((res: any) => {
      if (res.status) {
        setAlert('Lista Atualizada com sucesso!', 'success');
      }
    });
    setLoading(false);
  };

  const head = ['Matrícula', 'Nome Associado', ...(isAdmin ? ['Email', 'Situação'] : ['Situação'])];
  const line = (l: Associado) => [
    l.nrMatricula,
    l.nmAssociado,
    ...(isAdmin ? [l.dsEmail, l.dtExclusao ? 'Inativo' : 'Ativo'] : [l.dtExclusao ? 'Inativo' : 'Ativo']),
  ];

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12}>
        <Collapse in={loading}>
          <LinearProgress color="secondary" />
        </Collapse>
      </Grid>
      <Grid container item xs={10} pt={2.3} pl={2.3}>
        <Typography variant="h5" fontWeight="bold">
          Lista de associados
        </Typography>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" item xs={2} pt={2.3} pr={1.4}>
        <Tooltip title="Atualizar">
          <IconButton onClick={handleClickAction}>
            <Timelapse />
          </IconButton>
        </Tooltip>
      </Grid>
      <GenericTable
        readOnly
        data={gerarAssociados(0)}
        head={head}
        line={line}
        maxDepth={2}
        onClick={({ idAssociado }) => onSelect(idAssociado)}
        onDelete={({ idAssociado }) => handleDelete(idAssociado)}
      />
    </Grid>
  );
}

export default ListaAssociados;
