/* eslint-disable @typescript-eslint/no-explicit-any */
import { Info, Menu } from '@mui/icons-material';
import { Box, Grid, IconButton, Theme, Tooltip, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { cloneElement } from 'react';
import CardIndicadorProps from './types.d';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: theme.shadows[6],
    minHeight: '90px',
    transition: '.3s height',
    borderRadius: '.3em',
  },
  iconContainer: {
    borderRadius: '.3em 0 0 .3em',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
  },
  title: {
    maxHeight: 32,
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: theme.palette.background.default,
    textShadow: theme.shadows[4],
  },
  value: {
    color: 'white',
    alignContent: 'flex-end',
    fontWeight: 800,
    fontSize: '1.5em',
    padding: '.2em 0 0',
  },
  iconButtonExpand: {
    padding: 0,
    margin: 0,
  },
}));

export default function CardIndicador(props: CardIndicadorProps) {
  const classes = useStyles();
  const theme: any = useTheme();

  const { buttonColor, description, title, icon, onClick, variant } = props;

  const iconBgColor = theme.palette[buttonColor].dark;
  const valuesBgColor = theme.palette[buttonColor].main;

  return (
    <Grid container item xs={12} component={Box} sx={{ p: 1 }}>
      <Grid container item xs={12} className={classes.root}>
        <Grid
          container
          item
          xs={3}
          component={Box}
          sx={{ p: 1, bgcolor: iconBgColor }}
          className={classes.iconContainer}
        >
          {icon ? cloneElement(icon, { fontSize: 'large' }) : <Info />}
        </Grid>
        <Grid container item xs={9} component={Box} alignContent="baseline" sx={{ p: 1, bgcolor: valuesBgColor }}>
          <Grid container item xs={12} className={classes.title}>
            <Typography>{title}</Typography>
          </Grid>

          <Grid container item xs={12} className={classes.value}>
            <Grid container alignContent="center" item xs={8}>
              {description}
            </Grid>
            <Grid container alignContent="flex-end" justifyContent="flex-end" item xs={4}>
              <IconButton className={classes.iconButtonExpand} onClick={onClick}>
                <Tooltip title="Ver detalhes">
                  <Menu />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
