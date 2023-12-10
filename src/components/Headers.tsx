/* eslint-disable @typescript-eslint/no-explicit-any */
import { Home, MenuSharp, Settings } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Fade,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { capitalize } from 'lodash';
import { PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react';
import { BrowserView, MobileView, isMobile, isTablet } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import logoAfuFilled from '../assets/afu_filled.png';
import avatarLogo from '../assets/imgsExample/avatar.png';

import { AuthContext } from './programas/login/AuthProvider';
import { DashBoardSideBar } from './SideBars';

const useStyles = makeStyles((/* theme: Theme */) => ({
  logo: {
    maxWidth: 300,
  },
  root: {
    width: '100%',
    minWidth: '100%',
  },
  titlePageButton: {
    fontSize: '1.2em !important',
    fontWeight: '50 !important',
  },
  avatarGrid: {},

  actions: {
    padding: '.5rem',
  },
  titulo: {
    fontSize: '2em !important',
    fontWeight: '1000',
    padding: ' 0 .5rem',
  },
  mainTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 'calc( 1vw + 20px)',
    paddingLeft: '10px',
    fontWeight: '700 !important',
  },
}));

type HeaderProps = {
  position: 'sticky' | 'fixed' | 'absolute' | 'relative';
  children: ReactNode;
  isFloating?: boolean;
  color: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent';
};

function HeaderTemplate({ children, position, color, isFloating }: PropsWithChildren<HeaderProps>) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserView>
        <AppBar
          {...{ position, color }}
          sx={{ zIndex: 100, width: '100%', p: 1, boxShadow: isFloating ? theme.shadows[3] : 'none' }}
        >
          <Container maxWidth="xl" sx={{ height: 55 }}>
            <Toolbar disableGutters>{children}</Toolbar>
          </Container>
        </AppBar>
      </BrowserView>
      <MobileView>
        <AppBar position="fixed" sx={{ zIndex: 100, width: '100%', top: 'auto', bottom: 0 }}>
          <Container maxWidth="sm" sx={{ height: 70, justifyContent: 'center' }}>
            <Toolbar disableGutters>{children}</Toolbar>
          </Container>
        </AppBar>
      </MobileView>
    </div>
  );
}

const pages = [
  ['Início', ''],
  ['Acessar AFU', 'afu'],
];

export default function HomeHeader() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { palette }: Theme = useTheme();
  const [showLogo, setShowLogo] = useState(window.location.pathname !== '/');
  const handleClickNavigate = (page: string | undefined) => {
    navigate(`/${page}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY > 400);
    };
    if (window.location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverClose = (value: any) => {
    setAnchorEl(value);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? 'user-popover' : undefined;

  return (
    <HeaderTemplate position="fixed" color="primary" isFloating={showLogo}>
      <BrowserView style={{ width: '100%' }}>
        <Grid container item xs={12} component={Box} sx={{ p: '0 0em' }}>
          <Grid container item xs={4} md={3} lg={2}>
            <img alt="logo afu" height={50} src={logoAfuFilled} className={classes.logo} />
          </Grid>
          <Grid container item xs={6}>
            <Fade in={showLogo} timeout={{ appear: 300, exit: 300, enter: 300 }}>
              <Typography variant="h5" className={classes.mainTitle}>
                Associação de Funcionários da Unimed
              </Typography>
            </Fade>
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            {pages.map(([title, page]) => (
              <Button
                key={`button-title-${page}`}
                variant="text"
                size="large"
                color="inherit"
                onClick={() => handleClickNavigate(page)}
              >
                <Typography variant="subtitle1" className={classes.titlePageButton}>
                  {title}
                </Typography>
              </Button>
            ))}
          </Grid>
        </Grid>
      </BrowserView>
      <MobileView>
        <Grid container className={classes.root} justifyContent="space-between">
          <Grid item p={2}>
            <img alt="logo afu" height={40} src={logoAfuFilled} className={classes.logo} />
          </Grid>
          <Grid item p={0.5}>
            <IconButton onClick={(e) => handlePopoverClose(e.currentTarget)}>
              <MenuSharp style={{ fontSize: '50', color: palette.text.secondary }} />
            </IconButton>
          </Grid>
        </Grid>
        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={() => handlePopoverClose(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {pages.map(([title, page]) => (
            <ListItemButton key={`button-title-${page}`} onClick={() => handleClickNavigate(page)}>
              <ListItemText primary={title} />
            </ListItemButton>
          ))}
        </Popover>
      </MobileView>
    </HeaderTemplate>
  );
}

export function DashboardHeader({ values }: any) {
  const classes = useStyles();

  const { logout, usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const { titulo } = values;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (event?: any) => {
    if (
      event?.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen((pv) => !pv);
  };
  const handleClickTitle = () => {
    setDrawerOpen((pv) => !pv);
  };

  type OptionsProps = 'logout' | 'home' | 'settings';
  const handleOptions = (option: OptionsProps) => {
    switch (option) {
      case 'logout':
        logout();
        break;
      case 'home':
        navigate('/');
        break;
      case 'settings':
        navigate('/afu/perfil');
        break;
      default:
        break;
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'user-popover' : undefined;

  return (
    <HeaderTemplate position="relative" color="primary">
      <Grid container justifyContent="space-between" direction="row">
        {isMobile || isTablet ? (
          <Drawer anchor="left" open={!!drawerOpen} onClose={toggleDrawer}>
            <DashBoardSideBar onClick={() => toggleDrawer()} />
          </Drawer>
        ) : null}
        <Grid
          item
          xs={10}
          lg={6}
          component={Typography}
          onClick={handleClickTitle}
          variant="h4"
          fontWeight="bold"
          align={isMobile || isTablet ? 'center' : 'left'}
          alignSelf="center"
          borderRadius={3}
          boxShadow={isMobile || isTablet ? 3 : 0}
        >
          {titulo ?? 'Dashboard'}
        </Grid>
        <Grid
          container
          xs={2}
          lg={6}
          item
          alignContent="center"
          justifyContent="flex-end"
          className={classes.avatarGrid}
        >
          {isMobile || isTablet ? null : (
            <Grid
              component={Typography}
              fontWeight="bold"
              variant={isMobile || isTablet ? 'h6' : 'h4'}
              item
              pr={2}
              alignSelf="center"
            >
              {`Olá, `} {capitalize(usuario?.nmUsuario) ?? 'Usuário'}
            </Grid>
          )}
          <Grid item>
            <Avatar style={{ cursor: 'pointer' }} src={avatarLogo} onClick={handleAvatarClick} />
          </Grid>
        </Grid>{' '}
        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List>
            <ListItemButton onClick={() => handleOptions('home')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Início" />
            </ListItemButton>
            <ListItemButton onClick={() => handleOptions('settings')}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItemButton>
            <ListItemButton onClick={() => handleOptions('logout')}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Popover>
      </Grid>
    </HeaderTemplate>
  );
}

HeaderTemplate.defaultProps = {
  isFloating: false,
};
