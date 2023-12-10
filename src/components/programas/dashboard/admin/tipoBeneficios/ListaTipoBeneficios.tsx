/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import GenericTable from '@/Components/lists/GenericTable';
import serverAction from '@/Utils/functions/auth.d';
import { TipoBeneficio, gerarTipoBeneficio } from '@/Utils/functions/productTypes.d';

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
  onSelect(idTipoBeneficio: number | undefined): void;
}

function ListaTipoBeneficios({ onSelect }: ListaProps) {
  const classes = useStyles();

  const handleDelete = async (idTipoBeneficio: number | undefined) => {
    if (!idTipoBeneficio) return;
    const obj = {
      objName: 'tipoBeneficio',
      idAction: idTipoBeneficio,
    };
    await serverAction('inativaAction', obj, 'CtrlAction', true);
  };

  const head = ['Código', 'Descrição', 'Observações', 'Inclusão', 'Exclusão'];
  const line = (l: TipoBeneficio) => [
    l.idTipoBeneficio,
    l.nmTipoBeneficio,
    l.dsObservacoes,
    dayjs(l.dtInclusao).format('DD/MM/YYYY'),
    l.dtExclusao,
  ];

  return (
    <Grid container item xs={12} className={classes.root}>
      <GenericTable
        data={gerarTipoBeneficio(0)}
        head={head}
        line={line}
        onClick={({ idTipoBeneficio }) => onSelect(idTipoBeneficio)}
        onDelete={({ idTipoBeneficio }) => handleDelete(idTipoBeneficio)}
      />
      {/* <Grid container item xs={12} justifyContent="center" alignContent="center" className={classes.listaBeneficios}>
        <Grid container item xs={12} className={classes.search}>
          <SearchField onClick={handleSearch} label="Pesquisar Tipo de Benefício" />
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="TipoBeneficio Table">
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Observações</TableCell>
                <TableCell>Inclusão</TableCell>
                <TableCell>Exclusão</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista?.map((row) => (
                <TableRow
                  key={`tableRow-${row.idTipoBeneficio}`}
                  className={classes.row}
                  onClick={() => onSelect(row.idTipoBeneficio)}
                >
                  <TableCell component="th" scope="row">
                    <IconButton className={classes.deleteIcon} onClick={(e) => handleDelete(e, row.idTipoBeneficio)}>
                      <Delete />
                    </IconButton>
                    {row.idTipoBeneficio}
                  </TableCell>
                  <TableCell>{row.nmTipoBeneficio}</TableCell>
                  <TableCell>{row.dsObservacoes}</TableCell>
                  <TableCell>{row.dtInclusao}</TableCell>
                  <TableCell>{row.dtExclusao ?? ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid> */}
    </Grid>
  );
}

export default ListaTipoBeneficios;
