import { CardGiftcard, LocalOffer, Payment, ShoppingBag, Store } from '@mui/icons-material';
import { Badge, Card, CardContent, CardHeader, Divider, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Beneficio } from '@/Utils/functions/productTypes.d';
import serverAction from '@/Utils/functions/auth.d';

const useStyles = makeStyles((theme: Theme) => ({
  BeneficiosRoot: {
    color: theme.palette.text.secondary,
    padding: isMobile || isTablet ? '' : '0 5rem',
    justifyContent: 'center',
  },
  BeneficiosRootWrapper: {
    margin: '0 auto',
    maxWidth: 1360,
    width: '100%',
  },
  divider: {
    width: '100%',
    color: theme.palette.background.paper,
  },
  icon: {
    transform: 'scale(2.5)',
    padding: '2rem 2rem 0 0 ',
    color: theme.palette.text.secondary,
  },
}));

const icons = [
  <ShoppingBag />,
  <LocalOffer />,
  <CardGiftcard />,
  <Store />,
  <Payment />,
  <ShoppingBag />,
  <LocalOffer />,
  <CardGiftcard />,
  <Store />,
  <Payment />,
];

function Beneficios({ title, defaultList = [] }: { title?: string; defaultList?: Beneficio[] | undefined }) {
  const [listBeneficios, setListbeneficios] = useState<Beneficio[]>(defaultList);

  const classes = useStyles();

  const getListaBeneficios = () => {
    serverAction('getListBeneficios', {}, 'CtrlInformacoesHomePage', true).then((res) => {
      if (res.status) {
        setListbeneficios(res.lista as Beneficio[]);
      }
    });
  };

  useEffect(() => {
    if (!defaultList) {
      getListaBeneficios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return defaultList || listBeneficios?.length ? (
    <Grid container item xs={12} className={classes.BeneficiosRoot}>
      <Grid container className={classes.BeneficiosRootWrapper}>
        <Grid container item xs={12} p="2rem 0">
          <Typography variant="h4" gutterBottom>
            <b>{title}</b>
          </Typography>
        </Grid>
        {listBeneficios?.length ? (
          listBeneficios.map(({ dsObservacoes: description, nmBeneficio }, index) => (
            <Grid container p={2} item xs={12} md={5} lg={6} key={nmBeneficio} justifyContent="center">
              <Grid
                component={Card}
                style={{ aspectRatio: 2 }}
                container
                p="1rem 0 1.5rem"
                justifyContent="space-between"
              >
                <Grid
                  component={Badge}
                  badgeContent={React.cloneElement(icons[index % 10] || <div />, { className: classes.icon })}
                  container
                  item
                >
                  <Grid container alignItems="baseline" style={{ paddingRight: '5dvw' }}>
                    <CardHeader title={<b>{nmBeneficio}</b>} />
                  </Grid>
                  <Grid container>
                    <CardContent>{description}</CardContent>
                  </Grid>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" fontWeight="bold">
            Não há benefícios cadastrados ainda
          </Typography>
        )}
      </Grid>
    </Grid>
  ) : null;
}
Beneficios.defaultProps = {
  title: 'Benefícios',
  defaultList: undefined,
};
export default Beneficios;
