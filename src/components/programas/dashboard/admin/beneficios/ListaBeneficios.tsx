/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import GenericTable from '@/Components/lists/GenericTable';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';
import toReal from '@/Utils/functions/currency';
import { Beneficio, gerarBeneficios } from '@/Utils/functions/productTypes.d';

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
  onSelect(idBeneficio: number | undefined): void;
}

function Lista({ onSelect }: ListaProps) {
  const classes = useStyles();

  const handleDelete = async (idBeneficio: number | undefined) => {
    if (!idBeneficio) return;
    const obj = {
      idBeneficio,
    };
    await serverAction('delBeneficio', obj, 'CtrlBeneficio', true).then((res: any) => {
      if (res.status) {
        setAlert('Atenção! Benefício excluído', 'warning');
      }
    });
  };

  const head = ['Benefício', 'Conveniado', 'Vl. Mínimo', 'Vl. Máximo', 'Inclusão', 'Exclusão'];
  const line = (l: Beneficio) => [
    l.nmBeneficio,
    l?.conveniado?.dsRazaoSocial || l?.conveniado?.dsNomeFantasia || l?.conveniado?.dsNomeResponsavel || '',
    toReal(l.vlMinimo),
    toReal(l.vlMaximo),
    dayjs(l.dtInclusao).format('DD/MM/YYYY hh:mm'),
    l.dtExclusao ? dayjs(l.dtExclusao).format('DD/MM/YYYY hh:mm') : '',
  ];

  return (
    <Grid container item xs={12} className={classes.root}>
      <GenericTable
        data={gerarBeneficios(0)}
        head={head}
        line={line}
        maxDepth={1}
        onClick={({ idBeneficio }) => onSelect(idBeneficio)}
        onDelete={({ idBeneficio }) => handleDelete(idBeneficio)}
      />
    </Grid>
  );
}

export default Lista;
