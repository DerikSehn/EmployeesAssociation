/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardMedia, Grid, GridProps, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  cardButtonCadastro: {},
  img: {
    width: '100%',
    minWidth: '100%',
    objectFit: 'contain',
    objectPosition: 'top center',
  },
  cardWrapperGrid: {
    backdropFilter: 'brightness(.7)',
    transition: '.4s',
    minWidth: '100%',

    '&:hover': {
      backdropFilter: 'brightness(.6) blur(2px)',
      '& $subtitleCard': {
        opacity: 1,
        padding: '2rem 0',
        height: '50px',
      },
    },
    cursor: 'pointer',
  },
  subtitleCard: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: '.4s',
  },
});

function CardButtonCadastro({
  onClick,
  title,
  subtitle,
  children,
  ...props
}: { onClick?: any; title: string; subtitle: string; children: any } & GridProps) {
  const classes = useStyles();
  return (
    <Card onClick={onClick} style={{ position: 'relative', minWidth: '100%', maxHeight: '400px' }}>
      <CardMedia>{React.cloneElement(children, { alt: title, className: classes.img })}</CardMedia>
      <Grid
        container
        position="absolute"
        height="100%"
        p={3}
        bottom={0}
        zIndex={2}
        alignItems="flex-end"
        alignContent="flex-end"
        className={classes.cardWrapperGrid}
        {...props}
      >
        <Grid item xs={12}>
          <Typography fontWeight="bold" variant="h4" color="white" style={{ textShadow: '0px 0px 10px black' }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            fontWeight="bold"
            variant="h5"
            color="white"
            style={{ textShadow: '2px 2px 10px black' }}
            className={classes.subtitleCard}
          >
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

CardButtonCadastro.defaultProps = {
  onClick: undefined,
};
export default CardButtonCadastro;
