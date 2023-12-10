/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import serverAction, { getCdEmail, setAlert } from '@/Utils/functions/auth.d';
import logoAfu from '../../../assets/afu_filled.png';
import ForgotPassword from './components/Forgot';
import LoginFields from './components/LoginFields';
import Signup from './components/Signup';
import ValidaEmail from './components/ValidaEmail';

const useStyles = makeStyles(() => ({
  '@keyframes entrance': {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  root: {
    minHeight: '100vh',
    animation: '$entrance 2s',
  },

  container: {
    padding: isMobile || isTablet ? '1rem' : '4em',
  },

  submitGrid: {
    padding: '.2em',
  },
  logoContainer: {
    padding: '.1em',
  },
  logo: {
    maxWidth: '100%',
    borderRadius: '1.3em',
    padding: 15,
  },

  button: {
    padding: 0,
  },
}));

export type LoginModes = 'login' | 'cadastro' | 'confirmaEmail' | 'forgot';

export type LoginProps = {
  defaultMode: LoginModes;
  login: (email?: string, password?: string) => void;
};

function Login({ login, defaultMode }: LoginProps) {
  const classes = useStyles();

  const [mode, setMode] = useState(defaultMode);
  const [signupObj, setSignupObj] = useState({
    cdEmail: '',
  });

  const handleLogin = async (email: string, password: string) => {
    login(email, password);
  };

  const handleConfirm = async (cdEmail: string) => {
    const obj = {
      cdEmail,
    };
    await serverAction('', obj, 'CtrlLogin', true, 'confirm').then((res: any) => {
      if (res?.msgErro) {
        setAlert(res.msgErro, 'warning');
      } else if (res.status) {
        setAlert('Um e-mail de confirmação foi enviado! Verifique sua caixa de entrada', 'info');
        setSignupObj(obj);
      }
    });
  };
  const handleSignup = async (dsSenha: any) => {
    const currentURL = new URL(window.location.href);
    const tkRecSenha = currentURL.searchParams.get('rec_senha');

    const obj = {
      ...signupObj,
      tkRecSenha,
      dsSenha,
    };

    await serverAction('', obj, 'CtrlLogin', true, tkRecSenha?.length === 32 ? 'novaSenha' : 'signup').then(
      (res: any) => {
        if (res.status) {
          if (res.dsToken) {
            localStorage.setItem('lgTkn', res.dsToken);
          }
          login();
        }
      },
    );
  };

  const handleForgotPassword = async (email: string) => {
    const obj = {
      cdEmail: getCdEmail(email),
    };
    await serverAction('', obj, 'CtrlLogin', true, 'forgot').then((res) => {
      if (res?.msgErro) {
        setAlert(res.msgErro, 'warning');
      } else if (res.status) {
        setAlert(
          'Uma Solicitação foi enviada ao seu e-mail. Para prosseguir, confira sua caixa de entrada.',
          'success',
        );
        setMode('login');
      }
    });
  };

  const handleClickButton = (newMode: LoginModes) => {
    setMode(newMode);
  };

  const renderMode = () => {
    switch (mode) {
      case 'confirmaEmail':
        return <ValidaEmail onSubmit={handleConfirm} />;
      case 'cadastro':
        return <Signup onSubmit={handleSignup} />;
      case 'forgot':
        return <ForgotPassword onSubmit={handleForgotPassword} />;
      default:
        return <LoginFields onSubmit={handleLogin} />;
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item xs={12} md={6} lg={4} component={Paper} className={classes.container}>
        <Grid className={classes.logoContainer} container justifyContent="center" item xs={12}>
          <img src={logoAfu} className={classes.logo} alt="Logotipo da Associação de Funcionários" />
        </Grid>
        {renderMode()}
        {mode === 'login' ? (
          <>
            <Grid className={classes.submitGrid} item xs={12}>
              <Button variant="text" fullWidth onClick={() => handleClickButton('forgot')} className={classes.button}>
                Esqueci minha senha
              </Button>
            </Grid>
            <Grid className={classes.submitGrid} item xs={12}>
              <Button
                variant="text"
                fullWidth
                onClick={() => handleClickButton('confirmaEmail')}
                className={classes.button}
              >
                Cadastre-se
              </Button>
            </Grid>
          </>
        ) : (
          <Grid className={classes.submitGrid} item xs={12}>
            <Button variant="text" fullWidth onClick={() => handleClickButton('login')} className={classes.button}>
              Voltar
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Login;
