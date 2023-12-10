import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { DashBoardSideBar } from '../components/SideBars';
import { DashboardHeader } from '../components/Headers';
import AuthProvider from '../components/programas/login/AuthProvider';

const useStyles = makeStyles((theme: Theme) => ({
  DashBoardRoot: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
  content: {
    minWidth: 300,
  },
  outlet: {
    padding: isMobile || isTablet ? 0.5 : '1em 1em 0 1em',
  },
}));

export default function DashBoard() {
  const classes = useStyles();

  const [titulo, setTitulo] = useState<string>();

  return (
    <AuthProvider>
      <Grid className={classes.DashBoardRoot}>
        {!isMobile || isTablet ? <DashBoardSideBar onClick={(t) => setTitulo(t.dsPrograma)} /> : null}
        <Grid
          container
          pb={isMobile || isTablet ? '80px' : 0}
          item
          xs={12}
          alignItems="baseline"
          alignContent="baseline"
          className={classes.content}
        >
          <DashboardHeader values={{ titulo }} />
          <Grid container item xs={12} className={classes.outlet}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </AuthProvider>
  );
}
