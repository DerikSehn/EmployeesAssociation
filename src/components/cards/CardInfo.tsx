import React, { useState } from 'react';
import { Grid, Typography, Paper, Theme, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CardInfoProps } from './types.d';

const useStyles = makeStyles((theme: Theme) => ({
  card: {},
  cardImage: {},
  cardDescription: {},
  cardTitle: {},
}));

function CardInfo({ imagem, title, description, ...cardProps }: CardInfoProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={3}>
      <img src={imagem} alt={title} className={classes.cardImage} />
      <Typography variant="h5" className={classes.cardTitle}>
        {title}
      </Typography>
      <div className={classes.cardDescription}>
        <Typography variant="body1">{description}</Typography>
      </div>
    </Card>
  );
}

export default CardInfo;
