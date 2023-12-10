/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import GenericTable from '@/Components/lists/GenericTable';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';
import toReal from '@/Utils/functions/currency';
import { Compra, gerarCompras } from '@/Utils/functions/productTypes.d';

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
  onSelect(idCompra: number | undefined): void;
}

function ListaCompras({ onSelect }: ListaProps) {
  const classes = useStyles();

  const handleDelete = async (idCompra: number | undefined) => {
    if (!idCompra) return;
    const obj = {
      objName: 'Compra',
      idAction: idCompra,
    };
    await serverAction('inativaAction', obj, 'CtrlAction', true).then((res: any) => {
      if (res.status) {
        setAlert('Atenção! Compra excluído', 'warning');
      }
    });
  };

  const head = ['Inclusão', 'Valor', 'Benefício', 'Conveniado'];
  const line = (l: Compra) => [
    dayjs(l.dtCompra).format('DD/MM/YYYY hh:mm'),
    toReal(l.vlCompra),
    l.associado?.nmAssociado,
    l.conveniado?.dsNomeFantasia || l.conveniado?.dsNomeResponsavel,
  ];

  return (
    <Grid container item xs={12} className={classes.root}>
      <GenericTable
        readOnly
        data={gerarCompras(0)}
        head={head}
        line={line}
        maxDepth={1}
        onClick={({ idCompra }) => onSelect(idCompra)}
        onDelete={({ idCompra }) => handleDelete(idCompra)}
      />
    </Grid>
  );
}

export default ListaCompras;
