import { CardGiftcard, Discount, Event } from '@mui/icons-material';
import { CardContent, CardHeader, Divider, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const useStyles = makeStyles((theme: Theme) => ({
  servicosRoot: {
    color: theme.palette.text.secondary,
    padding: isMobile || isTablet ? '' : '0 5rem',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  servicosRootWrapper: {
    margin: '0 auto',
    maxWidth: 1360,
    width: '100%',
  },
  divider: {
    width: '100%',
    color: theme.palette.background.paper,
  },
  icon: {
    transform: 'scale(6)',
    color: theme.palette.primary.main,
  },
}));

const servicosPrestados = [
  {
    title: 'Descontos em Lojas',
    description: 'Oferecemos descontos exclusivos em diversas lojas parceiras para todos os nossos associados.',
    icon: <Discount />,
  },
  {
    title: 'Eventos de Feriado',
    description:
      'Realizamos eventos especiais em datas de feriado, como Natal e Páscoa, para proporcionar momentos de celebração e confraternização.',
    icon: <Event />,
  },
  {
    title: 'Presentes de Fim de Ano',
    description:
      'No final do ano, presenteamos nossos associados com brindes e lembranças como forma de agradecimento por sua participação na associação.',
    icon: <CardGiftcard />,
  },
];

function Servicos() {
  const classes = useStyles();

  return (
    <Grid container item xs={12} className={classes.servicosRoot}>
      <Grid container className={classes.servicosRootWrapper}>
        <Grid container item xs={12} p="2rem 0">
          <Typography variant="h4" gutterBottom>
            <b>Nossos Serviços</b>
          </Typography>
        </Grid>
        {servicosPrestados.map(({ description, icon, title }, index) => (
          <Grid container key={title} justifyContent="center">
            <Grid
              container
              p={isMobile || isTablet ? '' : '2rem 0'}
              flexDirection={isMobile || isTablet ? 'column' : `row${index % 2 === 0 ? '' : '-reverse'}`}
              justifyContent="space-between"
            >
              <Grid item p={9}>
                {React.cloneElement(icon, { className: classes.icon })}
              </Grid>
              <Grid item>
                <CardHeader title={<b>{title}</b>} />
                <CardContent style={{ maxWidth: 600 }}>{description}</CardContent>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Servicos;
