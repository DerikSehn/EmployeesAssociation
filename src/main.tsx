import { ThemeProvider, createTheme, darken } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashBoard from './routes/DashBoard';
import ErrorPage from './routes/ErrorPage';
import '../index.css';
import Home from './routes/Home';
import Loader from './components/loaders/Loader';
import HomeContent from './components/programas/homepage/Content';
import FallBackComponent from './components/programas/dashboard/index';
import HomeServicos from './components/programas/homepage/Servicos';
import HomeBeneficios from './components/programas/homepage/Beneficios';
import HomeParcerias from './components/programas/homepage/Parcerias';
import TipoBeneficios from './components/programas/dashboard/admin/tipoBeneficios/TipoBeneficios';
import PainelInformacoes from './components/programas/dashboard/PainelInformacoes';
import Beneficios from './components/programas/dashboard/admin/beneficios/Beneficios';
import Associados from './components/programas/dashboard/admin/usuarios/Usuarios';
import Empresas from './components/programas/dashboard/admin/usuarios/empresa/Empresas';
import Eventos from './components/programas/dashboard/admin/eventos/Eventos';
import PerfilUsuario from './components/programas/dashboard/global/PerfilUsuario';
import Compras from './components/programas/dashboard/admin/compras/Compras';
import ConveniadoContato from './components/programas/homepage/ConveniadoContato';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009b62', // verde
      dark: darken('#009b62', 0.5),
    },
    secondary: {
      main: '#00AEEF', // azul claro
    },
    background: {
      default: '#F5F5F5', // cinza claro
    },
    text: {
      primary: '#333333', // cinza escuro
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomeContent />,
      },
      {
        path: '/servicos',
        element: <HomeServicos />,
      },
      {
        path: '/beneficios',
        element: <HomeBeneficios defaultList={undefined} />,
      },
      {
        path: '/parcerias',
        element: <HomeParcerias />,
      },
      {
        path: '/conveniado',
        element: <ConveniadoContato />,
      },
    ],
  },
  {
    path: '/afu',
    element: <DashBoard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/afu',
        element: <FallBackComponent />,
      },
      {
        path: '/afu/painel',
        element: <PainelInformacoes />,
      },
      {
        path: '/afu/eventos',
        element: <Eventos />,
      },
      {
        path: '/afu/beneficios',
        element: <Beneficios />,
      },
      {
        path: '/afu/tipo_beneficios',
        element: <TipoBeneficios />,
      },
      {
        path: '/afu/usuarios',
        element: <Associados />,
      },
      {
        path: '/afu/empresas',
        element: <Empresas />,
      },
      {
        path: '/afu/perfil',
        element: <PerfilUsuario />,
      },
      {
        path: '/afu/compras',
        element: <Compras />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={4}>
        <RouterProvider fallbackElement={<Loader />} {...{ router }} />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
