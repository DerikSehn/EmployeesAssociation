/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GenericTable from '@/Components/lists/GenericTable';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';
import { Usuario, gerarUsuarios } from '@/Utils/functions/userTypes.d';

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
  onSelect(idUsuario: number | undefined): void;
}

function ListaUsuarios({ onSelect }: ListaProps) {
  const classes = useStyles();

  const handleDelete = async (idUsuario: number | undefined) => {
    if (!idUsuario) return;
    const obj = {
      objName: 'Usuario',
      idAction: idUsuario,
    };
    await serverAction('inativaAction', obj, 'CtrlAction', true).then((res: any) => {
      if (res.status) {
        setAlert('Atenção! Usuário excluído', 'warning');
      }
    });
  };

  const head = ['Código', 'Nome Usuário', 'Email', 'Inclusão', 'Exclusão'];
  const line = (l: Usuario) => [l.idUsuario, l.nmUsuario, l.dsEmail, l.dtInclusao, l.dtExclusao];

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={10} pt={2.3} pl={2.3}>
        <Typography variant="h5" fontWeight="bold">
          Lista de Usuários
        </Typography>
      </Grid>
      <GenericTable
        data={gerarUsuarios(0)}
        head={head}
        line={line}
        onClick={({ idUsuario }) => onSelect(idUsuario)}
        onDelete={({ idUsuario }) => handleDelete(idUsuario)}
      />
    </Grid>
  );
}

export default ListaUsuarios;
