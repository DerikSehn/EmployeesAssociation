/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import GenericTable from '@/Components/lists/GenericTable';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';
import { Conveniado, gerarConveniados } from '@/Utils/functions/userTypes.d';
import { AuthContext } from '@/Components/programas/login/AuthProvider';
import ListaConveniadosAssociado from './ListaConveniadosAssociado';
import { ImageFromBuffer } from '@/Components/inputs/ImageUploader';

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
  onSelect(idConveniado: number | undefined): void;
}

function ListaConveniados({ onSelect }: ListaProps) {
  const classes = useStyles();
  const { perfilUsuario } = useContext(AuthContext);
  const isAdmin = perfilUsuario?.idPerfilUsuario === 1;
  const handleDelete = async (idConveniado: number | undefined) => {
    if (!idConveniado) return;
    const obj = {
      objName: 'Conveniado',
      idAction: idConveniado,
    };
    await serverAction('inativaAction', obj, 'CtrlAction', true).then((res: any) => {
      if (res.status) {
        setAlert('Atenção! Conveniado excluído', 'warning');
      }
    });
  };

  const head = ['Logo', 'CNPJ/CPF', 'Nome', 'Email', 'Situação'];
  const line = (l: Conveniado) => [
    <ImageFromBuffer arrayBuffer={l.documento?.blobDocumento} />,
    l.cdCnpj || l.cdCpf,
    l.dsRazaoSocial,
    l.dsEmail,
    l.dtExclusao ?? 'Ativo',
  ];

  return (
    <Grid container item xs={12} className={classes.root}>
      {isAdmin ? (
        <GenericTable
          data={gerarConveniados(0)}
          head={head}
          line={line}
          maxDepth={2}
          onClick={({ idConveniado }) => onSelect(idConveniado)}
          onDelete={({ idConveniado }) => handleDelete(idConveniado)}
        />
      ) : (
        <ListaConveniadosAssociado />
      )}
    </Grid>
  );
}

export default ListaConveniados;
