/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delete, Restore } from '@mui/icons-material';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import getObjectName from '@/Utils/functions/getObjectName';
import serverAction from '@/Utils/functions/auth.d';
import SearchField from '../inputs/SearchField';
import GenericTableSkeleton from './GenericTableSkeleton';
import handleStop from '@/Utils/functions/handleStop';

const useStyles = makeStyles((theme: Theme) => ({
  genericTableRoot: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: isMobile || isTablet ? '' : '1rem',
  },
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
  tableCell: {
    padding: '5px !important',
  },
}));

type LineFormatter<T> = (obj: T) => any[];

export type QueryHandlerPaginacao = {
  itensPorPagina: number;
  paginaAtual: number;
};

type GenericTableProps<T> = {
  data: T[];
  line: LineFormatter<T>;
  head: string[];
  readOnly?: boolean;
  onDelete?(item: T): void;
  onClick?(item: T): void;
  maxDepth?: number;
};

/** para que a lista possa ser carregada automaticamente,
 * é necessário incluir um objeto do mesmo tipo da tabela em
 * 'data[]'
 *
 * ( Exemplo:
 * <GenericTable
 *     data={ [ { idObjeto, dsObjeto, nmObjeto, etc } ] } )
 *  />
 *
 * Dessa forma, será conectado com o banco de dados.
 *
 * OBS: a posição no head de Exclusão será considerada a data de exclusão do item
 *
 */

/**
 *
 * @param {string[]} data passe aqui um objeto do mesmo tipo com a função gerar<ObjName>(0) ou crie um array com objeto T sem valores
 * @param {string[]} head
 * @param {LineFormatter<T>} line Função que formata um objeto em um array de determinada sequência para a linha
 * @param obj Objeto do tipo informado em data[0] relacionado ao banco de dados
 */
function GenericTable<T>({ data, head, line, readOnly, onDelete, onClick, maxDepth }: GenericTableProps<T>) {
  const classes = useStyles();

  const idOfExclusao = Math.max(0, head?.indexOf('Exclusão'));
  const idOfSituacao = Math.max(0, head?.indexOf('Situação'));

  const posDtExclusao = idOfExclusao || idOfSituacao;
  const [showExcluidos, setShowExcluidos] = useState(false);

  const objName = data?.[0] ? getObjectName(data?.[0]) : undefined;

  const [list, setList] = useState(data?.map(line) ?? []);
  const [rawData, setRawData] = useState([] as T[]);

  const [filter, setFilter] = useState('');
  const filters = filter.split(' ').map((item) => item.toLowerCase());

  const verificaFiltro = (testValue: any[]) => {
    const isExcluido = !!testValue[idOfExclusao];
    const isAtivo = testValue[idOfSituacao] === 'Ativo';
    const habExcluido = posDtExclusao === 0 || isAtivo || !isExcluido;
    if (!filter) {
      return habExcluido;
    }
    const result = testValue.some((item) => {
      if (!item) {
        return false;
      }
      const itemLower = String(item).toLowerCase();
      return filters.some((test) => itemLower.includes(test));
    });
    return result && habExcluido;
  };

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredList =
    list?.filter(verificaFiltro) /* .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage) */ ?? [];

  // const totalPaginas = Math.ceil((list?.filter(verificaFiltro)?.length || itemsPerPage) / itemsPerPage);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [tpOrdenacao, setTpOrdenacao] = useState('');

  /* const getList = async () => {
    const objName = getObjectName(data[0]);
    if (objName) {
      setLoading(true);
      await serverAction('actionResolver', { objName }, 'CtrlAction', true).then((res: any) => {
        const resList = res?.lista;
        if (resList?.length) {
          const formattedData = resList.map((item: T) => line(item));
          setList(formattedData);
        } else {
          setIsListEmpty(true);
        }
      });
      setLoading(false);
    }
  }; */

  const getList = async () => {
    if (objName) {
      setLoading(true);
      const paginacao: QueryHandlerPaginacao = {
        itensPorPagina: itemsPerPage,
        paginaAtual: currentPage,
      };
      /**
       * TODO implementar escolha de ordenação dinâmica
       */
      const obj = {
        maxDepth,
        objName,
        paginacao,
        limit: itemsPerPage,
        dsBusca: filter,
        incluiExcluidos: showExcluidos,
        tpOrdenacao: tpOrdenacao || `nmds${objName}`,
      };

      await serverAction('actionResolver', obj, 'CtrlAction', true).then((res: any) => {
        const resList = res?.lista;
        setRawData(resList);
        setIsListEmpty(!resList?.length);
        if (resList?.length) {
          const formattedData = resList.map((item: T) => line(item));
          setTotalPaginas(res.totalPaginas);

          setList(formattedData);
        }
      });
      setLoading(false);
    }
  };

  useEffect(
    () => {
      if (data?.[0]) {
        getList();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, totalPaginas, itemsPerPage, filter, tpOrdenacao, showExcluidos],
  );

  async function handleDelete(index: number): Promise<any> {
    if (onDelete) {
      await onDelete(rawData[index]);
      getList();
    }
  }

  return head ? (
    <div className={classes.genericTableRoot}>
      <SearchField fullWidth onClick={setFilter} key={`pesquisa-table-${objName}-input`} label="Pesquisar" />
      <Grid
        key={`${objName}-gen-table`}
        container
        style={{ minHeight: '50vh', alignItems: 'baseline', alignContent: 'baseline', maxWidth: '100%' }}
      >
        <Grid key={`pesquisa-table-${objName}`} container direction="column" justifyContent="flex-end">
          {posDtExclusao ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={!!showExcluidos} onClick={(e: any) => setShowExcluidos(e.target.checked ?? false)} />
                }
                label="Incluir Excluídos"
              />
            </FormGroup>
          ) : null}
        </Grid>
        <TableContainer key={data?.length}>
          <Table>
            <TableHead>
              <TableRow>
                {head.map((title) => (
                  <TableCell key={`${title}`}>
                    <Button
                      variant={title === tpOrdenacao ? 'contained' : 'text'}
                      onClick={() => setTpOrdenacao(title)}
                    >
                      {title}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading || isListEmpty ? (
                <GenericTableSkeleton isEmpty={isListEmpty} head={head} />
              ) : (
                filteredList?.map((item, idRow) => (
                  <TableRow
                    key={`${item[0]}-${idRow}`}
                    className={classes.row}
                    onClick={() => onClick && onClick(rawData?.[idRow])}
                  >
                    {item.map((value, index) => (
                      <TableCell
                        {...(index === 0 && { component: 'th', scope: 'row' })}
                        className={classes.tableCell}
                        key={`${value}-${idRow}-${index}`}
                      >
                        {!readOnly && onDelete && index === 0 ? (
                          <IconButton
                            className={classes.deleteIcon}
                            onClick={(e) => {
                              handleStop(e);
                              handleDelete(idRow);
                            }}
                          >
                            {item[posDtExclusao] ? (
                              <Tooltip title="Restaurar">
                                <Restore />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Inativar">
                                <Delete />
                              </Tooltip>
                            )}
                          </IconButton>
                        ) : null}
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid container justifyContent="flex-end" alignItems="end">
        <Grid item justifyContent="flex-end">
          <Pagination
            count={totalPaginas}
            disabled={loading}
            page={currentPage}
            onChange={(event, newPage) => setCurrentPage(newPage)}
          />
        </Grid>
        <Grid item justifyContent="flex-end">
          <TextField
            type="number"
            variant="standard"
            style={{ minWidth: '100px' }}
            defaultValue={10}
            label="Itens por página"
            value={itemsPerPage}
            select
            fullWidth
            onChange={(e: any) => setItemsPerPage(e.target.value)}
          >
            {Array(5)
              .fill(1)
              .map((value, index) => (
                <MenuItem key={`${value}-${index}`} value={value * (index + 1) * 5 * 2}>
                  {value * (index + 1) * 5 * 2}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>
    </div>
  ) : null;
}

GenericTable.defaultProps = {
  readOnly: false,
  onClick: null,
  onDelete: null,
  maxDepth: undefined,
};

export default GenericTable;
