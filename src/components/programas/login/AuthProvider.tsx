/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '@mui/material';
import Login, { LoginModes } from '@/Components/programas/login/Login';
import serverAction, { getCdEmail } from '../../../utils/functions/auth.d';
import { PerfilUsuario, Usuario } from '../../../utils/functions/userTypes.d';

export interface AuthContextProps {
  usuario: Usuario | null;
  perfilUsuario?: PerfilUsuario | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  validaToken: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  usuario: null,
  perfilUsuario: undefined,
  login: () => {},
  logout: () => {},
  validaToken: () => {},
});

export default function AuthProvider({ children }: any) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [perfilUsuario, setPerfilUsuario] = useState<PerfilUsuario | null>(null);
  const [defaultMode, setDefaultMode] = useState('login' as LoginModes);
  const logout = () => {
    setUsuario(null);
    localStorage.setItem('lgTkn', '');
  };

  const getURLParams = () => {
    const currentURL = new URL(window.location.href);

    const tokenSignup = currentURL.searchParams.get('tsup');
    const tokenRecSenha = currentURL.searchParams.get('rec_senha');

    if (tokenSignup?.length === 32) {
      localStorage.setItem('lgTkn', tokenSignup);
      serverAction('', {}, 'CtrlLogin', true, 'validaToken').then(async (res: any) => {
        if (res.status) {
          setDefaultMode('cadastro');
        }
      });
    } else if (tokenRecSenha?.length === 32) {
      localStorage.setItem('lgTkn', tokenRecSenha);
      serverAction('', {}, 'CtrlLogin', true, 'validaRecSenha').then(async (res: any) => {
        if (res.status) {
          setDefaultMode('cadastro');
        }
      });
    }
  };
  const login = useCallback(async (email?: string, password?: string, lgTkn?: string) => {
    const dsSenha = password;
    const obj = {
      cdEmail: getCdEmail(email ?? ''),
      dsSenha,
      lgTkn,
    };

    await serverAction('', obj, '', true, 'login').then((res) => {
      if (res?.status) {
        setUsuario(res.usuario);
        setPerfilUsuario(res.perfilUsuario);
        if (res.dsToken) {
          localStorage.setItem('lgTkn', res.dsToken);
        } else {
          getURLParams();
        }
      }
      return !!res.dsToken;
    });
  }, []);

  const validaToken = debounce(async () => {
    const lgTkn = localStorage.getItem('lgTkn');
    if (lgTkn && (await !login(undefined, undefined, lgTkn))) {
      setUsuario(null);
    } else {
      getURLParams();
    }
  }, 500);

  const authContextValue = useMemo(
    () => ({
      usuario,
      perfilUsuario,
      login,
      validaToken,
      logout,
    }),
    [perfilUsuario, usuario, login, validaToken],
  );

  useEffect(() => {
    if (!usuario?.nmUsuario) {
      validaToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario?.nmUsuario]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {usuario?.idUsuario ? children : <Login key={defaultMode} login={login} defaultMode={defaultMode} />}
    </AuthContext.Provider>
  );
}
