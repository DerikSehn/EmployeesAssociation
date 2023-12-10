/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowBack, AutoGraph, Money, Payments, SupervisedUserCircle } from '@mui/icons-material';
import { Button, Dialog, Grid, Skeleton, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Chart as ChartJS, ChartOptions, registerables } from 'chart.js';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { isMobile, isTablet } from 'react-device-detect';
import { Associado, Conveniado, gerarAssociados, gerarConveniados } from '@/Utils/functions/userTypes.d';
import {
  Beneficio,
  Compra,
  TipoBeneficio,
  gerarBeneficios,
  gerarCompras,
  gerarTipoBeneficio,
} from '@/Utils/functions/productTypes.d';
import toReal from '@/Utils/functions/currency';
import serverAction from '@/Utils/functions/auth.d';
import CardIndicador from '../../cards/CardIndicador';
import GenericTable from '../../lists/GenericTable';

ChartJS.register(...registerables);

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  containerReceitas: {
    padding: isMobile || isTablet ? 0 : '.5em',
    borderRadius: '0px 0px .2em .2em',
    boxShadow: theme.shadows[4],
    borderTop: `.4em solid ${theme.palette.primary.light}`,
    alignContent: 'baseline',
  },
  chart: {
    padding: isMobile || isTablet ? 0 : '1em 1vw 0',
  },
}));

type DialogInfoProps = {
  data: any[];
  head: string[];
  line: (item: any) => any[];
  maxDepth: number;
};

function PainelInformacoes() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({} as DialogInfoProps);
  const [indicadores, setIndicadores] = useState({
    countAssociados: undefined,
    countConveniados: undefined,
    countBeneficios: undefined,
    countTipoBeneficios: undefined,
    countCompras: undefined,
    countDespesas: undefined,
    countArrecadacoes: undefined,
  });

  const [comprasData, setComprasData] = useState();
  const comprasDataOptions: ChartOptions = {
    scales: {
      yAxes: {
        ticks: {
          format: {
            currency: 'BRL',
            style: 'currency',
          },
          callback: (value) => `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
        },
        type: 'logarithmic',
      },
    },
    hover: {
      mode: 'nearest',
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: ({ datasetIndex, raw }: any) => {
            if (datasetIndex === 1) {
              return raw.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
            return raw;
          },
        },
      },
    },
  };

  const getComprasData = useCallback(async () => {
    setLoading(true);

    const response = await serverAction('getDadosComprasPorMes', {}, 'CtrlPainelInformacoes', true);
    if (response.status) {
      setComprasData({ ...response });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIndicadores = useCallback(async () => {
    setLoading(true);
    const obj = {};
    await serverAction('getIndicadores', obj, 'CtrlPainelInformacoes', true).then((res: any) => {
      if (res.status) {
        setIndicadores(res);
      }
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    getIndicadores();
    getComprasData();
  }, [getIndicadores, getComprasData]);

  const handleClick = (actionStr: string) => async () => {
    setLoading(true);
    let head: string[] = [];
    const data: any[] = [];
    let maxDepth = 3;
    let lineFormatter: (action: any) => any = () => [];
    switch (actionStr) {
      case 'associado':
        head = ['Nome', 'Matrícula', 'Situação'];
        data.push(gerarAssociados(0)[0]);
        lineFormatter = (l: Associado) => [l.nmAssociado, l.nrMatricula, l.dtExclusao ? 'Inativo' : 'Ativo'];
        break;
      case 'conveniado':
        head = ['Nome', 'CNPJ', 'Situação'];
        data.push(gerarConveniados(0)[0]);
        lineFormatter = (l: Conveniado) => [l.dsNomeFantasia, l.cdCnpj, l.dtExclusao ? 'Inativo' : 'Ativo'];
        break;
      case 'beneficio':
        head = ['Nome', 'Tipo', 'Vl. Minimo', 'Vl. Maximo'];
        data.push(gerarBeneficios(0)[0]);
        lineFormatter = (l: Beneficio) => [
          l.nmBeneficio,
          l?.tipoBeneficio?.nmTipoBeneficio,
          toReal(l.vlMinimo),
          toReal(l.vlMaximo),
        ];
        break;
      case 'tipoBeneficio':
        head = ['Nome', 'Inclusão', 'Observações'];
        data.push(gerarTipoBeneficio(0)[0]);
        lineFormatter = (l: TipoBeneficio) => [
          l.nmTipoBeneficio,
          dayjs(l.dtInclusao).format('DD/MM/YYYY hh:mm'),
          l.dsObservacoes,
        ];
        break;
      case 'compra':
        maxDepth = 1;
        head = ['Data', 'Valor', 'Associado', 'Conveniado'];
        data.push(gerarCompras(0)[0]);
        lineFormatter = (l: Compra) => [
          dayjs(l.dtCompra).format('DD/MM/YYYY hh:mm'),
          toReal(l.vlCompra),
          l.associado.nmAssociado,
          l.conveniado?.dsNomeFantasia,
        ];
        break;
      default:
        break;
    }
    setDialogInfo({ data, head, line: lineFormatter, maxDepth });
    setLoading(false);
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <Dialog
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        open={!!dialogInfo.head}
        onClose={() => setDialogInfo({} as DialogInfoProps)}
      >
        {' '}
        {isMobile || isTablet ? (
          <Button onClick={() => setDialogInfo({} as DialogInfoProps)} variant="contained" endIcon={<ArrowBack />}>
            {' '}
            Voltar{' '}
          </Button>
        ) : null}
        <GenericTable
          readOnly
          data={dialogInfo.data}
          head={dialogInfo.head}
          line={dialogInfo.line}
          maxDepth={dialogInfo.maxDepth}
        />
      </Dialog>
      {/*  <Grid item xs={12} md={6} lg={3}>
        <CardIndicador
          title="Arrecadações do mês"
          description="R$ 0,00"
          buttonText=""
          icon={<Payments />}
          buttonColor="primary"
          variant="indicador"
          onClick={handleClick('arrecadacao')}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardIndicador
          title="Despesas do mês"
          description="R$ 0,00"
          buttonText=""
          icon={<Payments />}
          buttonColor="error"
          variant="indicador"
          onClick={handleClick('despesa')}
        />
      </Grid> */}

      {/*  <Grid item xs={12} md={6} lg={3}>
        <CardIndicador
          title="Lucro"
          description="R$100,00"
          buttonText=""
          icon={<Payments />}
          buttonColor="info"
          variant="indicador"
          onClick={handleClick('despesa')}
        />
      </Grid> */}
      <Grid container item xs={12} md={8} pl={1} pr={1} pt={3} gap={2}>
        <Grid container item xs={12} className={classes.containerReceitas}>
          <Grid container item xs={12} pl={2} pr={3}>
            <Typography variant="subtitle1">Evolução de receitas e despesas</Typography>
          </Grid>
          <Grid container item xs={12} className={classes.chart}>
            {!comprasData || loading ? (
              <Skeleton width="100" height="400" animation="pulse" variant="rectangular" />
            ) : (
              <Chart type="bar" data={comprasData} options={comprasDataOptions} />
            )}
          </Grid>
        </Grid>
        {/* <Grid container item xs={12}  height={150} className={classes.containerReceitas} /> */}
      </Grid>
      <Grid container item xs={12} md={4} p={isMobile || isTablet ? '1rem 0rem 0rem' : '1.5rem .5rem 0rem'}>
        <Grid container item xs={12} className={classes.containerReceitas} p={isMobile || isTablet ? 0 : ''}>
          <Grid item xs={12}>
            <CardIndicador
              title="Compras realizadas"
              description={indicadores.countCompras}
              buttonText=""
              icon={<Payments />}
              buttonColor="info"
              variant="indicador"
              onClick={handleClick('compra')}
            />
          </Grid>
          <Grid item xs={12}>
            <CardIndicador
              title="Associados"
              description={indicadores.countAssociados}
              buttonText=""
              icon={<SupervisedUserCircle />}
              buttonColor="primary"
              variant="indicador"
              onClick={handleClick('associado')}
            />
          </Grid>
          <Grid item xs={12}>
            <CardIndicador
              title="Conveniados"
              description={indicadores.countConveniados}
              buttonText="Visão geral"
              buttonColor="primary"
              icon={<AutoGraph />}
              variant="indicador"
              onClick={handleClick('conveniado')}
            />
          </Grid>
          <Grid item xs={12}>
            <CardIndicador
              title="Benefícios"
              description={indicadores.countBeneficios}
              buttonText="Visão geral"
              buttonColor="primary"
              icon={<Money />}
              variant="indicador"
              onClick={handleClick('beneficio')}
            />
          </Grid>
          <Grid item xs={12}>
            <CardIndicador
              title="Tipos de Benefício"
              description={indicadores.countTipoBeneficios}
              buttonText="Visão geral"
              buttonColor="primary"
              icon={<Money />}
              variant="indicador"
              onClick={handleClick('tipoBeneficio')}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PainelInformacoes;
