import { makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';
import { Theme } from '@mui/material';
import { isMobile, isTablet } from 'react-device-detect';
import Footer from '../components/Footers';
import Header from '../components/Headers';

const useStyles = makeStyles((theme: Theme) => ({
  HomePageRoot: {
    position: 'relative',
    minWidth: '100%',
    minHeight: 'calc(100vh - 3em)',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '3em',
  },
}));

function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.HomePageRoot} style={{ paddingTop: isMobile || isTablet ? 0 : 70 }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomePage;
