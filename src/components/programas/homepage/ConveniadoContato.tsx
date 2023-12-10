import { Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Done, Email } from '@mui/icons-material';
import serverAction, { setAlert, validaEmail } from '@/Utils/functions/auth.d';
import imgUnimed from '@/Assets/unimedvaledocaisvg.png';

const useStyles = makeStyles(() => ({
  ConveniadoContatoRoot: {
    width: '100%',
    padding: '4rem 1rem',
  },
  img: {
    paddingRight: '1rem',
    zindex: 2,
    maxWidth: '100%',
    objectFit: 'contain',
    objectPosition: 'top center',
  },
  form: {},
  CardContent: {
    padding: '1rem',
  },
  Button: {
    backgroundColor: '#0057AC',
    color: 'white',
    borderRadius: '5px',
    marginTop: '1rem',
  },
}));

export default function ConveniadoContato() {
  const dtUltimoEnvioLocal = localStorage.getItem('enviaEmailContatoConveniado');
  const habilitaEnvio = !dtUltimoEnvioLocal || dayjs(dtUltimoEnvioLocal)?.isBefore(dayjs().subtract(1, 'day'));

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const handleSubmit = () => {
    if (!validaEmail(email)) {
      setAlert('Forneça um e-mail válido');
      return;
    }
    const obj = {
      email,
      mensagem,
    };

    if (habilitaEnvio) {
      serverAction('enviaEmailContatoConveniado', obj, 'CtrlInformacoesHomePage', true).then((res) => {
        if (res.status) {
          setAlert('Mensagem enviada!');
          localStorage.setItem('enviaEmailContatoConveniado', dayjs().format('MM/DD/YYYY hh:mm:ss'));
        }
      });
    }
  };

  return (
    <Grid container item maxWidth={1360} margin="0 auto" className={classes.ConveniadoContatoRoot}>
      <Grid container>
        {isMobile || isTablet ? null : (
          <Grid container md={6} lg={8} pr={5} overflow="visible">
            <img src={imgUnimed} alt="unimed" className={classes.img} />
          </Grid>
        )}
        <Grid
          alignItems="baseline"
          gap={2}
          boxShadow={15}
          alignContent="baseline"
          zIndex={1}
          container
          p={4}
          borderRadius={2}
          md={6}
          lg={4}
        >
          <Grid p="0 0 2rem" component={Typography} variant="h5" fontWeight="bold">
            <Typography variant="h5" fontWeight="bold">
              Seja um parceiro
            </Typography>
            <Typography variant="body2">
              Pedimos que, por favor, preencha os campos abaixo para entrarmos em contato com sua empresa o mais breve
              possível.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Seu E-mail" onBlur={({ target }) => setEmail(target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={8}
              onBlur={({ target }) => setMensagem(target.value)}
              label="Mensagem"
            />
          </Grid>
          <Grid container pt={6} item justifyContent="flex-end">
            <Button
              disabled={!habilitaEnvio}
              fullWidth
              onClick={handleSubmit}
              className={classes.Button}
              variant="contained"
              color="primary"
              endIcon={habilitaEnvio ? <Email /> : <Done />}
            >
              {habilitaEnvio ? 'Enviar' : 'Tudo pronto! Já recebemos sua mensagem'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
