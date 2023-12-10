/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fade, Grid, Icon, IconButton, Theme, Tooltip, Typography, darken } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import logoAfu from '../assets/afu_filled.png';
import logoAfuMinified from '../assets/afu_mini.png';
import serverAction from '../utils/functions/auth.d';
import { Programa } from '../utils/functions/userTypes.d';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 100,
    transition: '.4s',
    height: 'calc(100dvh - 70px)',
    top: 0,
    position: 'sticky',
    backgroundColor: theme.palette.primary.main,
  },
  collapsed: {
    width: '70px',
  },
  open: {
    width: '300px',
    backgroundColor: darken(theme.palette.primary.dark, 0.2),
  },
  menuContainer: {
    overflow: 'hidden',
    height: 70,
    marginBottom: '20px',
  },
  menuButton: {
    width: 150,
    position: 'relative',
  },
  fade: {
    position: 'absolute',
    height: 50,
    borderRadius: '.2em',
  },
}));

type SideBarProps = {
  children: ReactNode;
};

function SideBarTemplate({ children }: PropsWithChildren<SideBarProps>) {
  const classes = useStyles();
  const [open, setOpen] = useState(isMobile);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <Grid item className={clsx(classes.root, open ? { [classes.open]: true } : { [classes.collapsed]: true })}>
      <Grid container justifyContent="center" item xs={12} className={classes.menuContainer}>
        <IconButton onClick={toggle} className={classes.menuButton} disableRipple>
          <Fade in={open} className={classes.fade} style={{ width: 150 }}>
            <img alt="logo afu" width={50} height={50} src={logoAfu} />
          </Fade>
          <Fade in={!open} className={classes.fade} style={{ width: 50, borderRadius: '50%' }}>
            <img alt="logo afu" width={50} height={50} src={logoAfuMinified} />
          </Fade>
        </IconButton>
      </Grid>
      {children}
    </Grid>
  );
}

const useStylesDashBoard = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '2em',
    position: 'sticky',
    background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${darken(
      theme.palette.primary.dark,
      0.4,
    )})`,
    height: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  item: {
    color: theme.palette.background.paper,
    whitespace: 'nowrap',
    padding: '1em 17.5px',
    cursor: 'pointer',

    transition: '.1s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: darken(theme.palette.background.paper, 0.3),
    },
  },
  title: {
    paddingLeft: '17.5px',
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
}));

export function DashBoardSideBar({ onClick }: { onClick?: (programa: Programa) => void }) {
  const classes = useStylesDashBoard();

  const navigate = useNavigate();

  const handleClick = (programa: Programa) => {
    navigate(programa.nmPrograma);
    if (typeof onClick === 'function') {
      onClick(programa);
    }
  };

  const [options, setOptions] = useState<Programa[]>([]);

  const { pathname } = useLocation();

  const getPerfilUsuario = () => {
    serverAction('getProgramasUsuario', {}, 'CtrlPerfilUsuario', true).then(async (res) => {
      if (res.status) {
        setOptions(res.lista);
      }
    });
  };

  useEffect(() => {
    const path = pathname.split('/').slice(-1)[0];
    if (options.length) {
      handleClick(options?.find(({ nmPrograma }) => nmPrograma === path) || options[0]);
    }
    getPerfilUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SideBarTemplate>
      <Grid container alignContent="baseline" item xs={12} className={classes.root}>
        {options.map((programa) => (
          <Grid
            onClick={() => handleClick(programa)}
            key={programa.nmPrograma}
            container
            wrap="nowrap"
            alignItems="center"
            item
            xs={12}
            className={classes.item}
          >
            <Grid component={Tooltip} title={programa.dsPrograma} item>
              <Icon fontSize="large">{programa.nmIcone}</Icon>
            </Grid>
            <Typography variant="inherit" align="center" className={classes.title}>
              {programa.dsPrograma}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </SideBarTemplate>
  );
}
DashBoardSideBar.defaultProps = {
  onClick: undefined,
};
export default SideBarTemplate;
