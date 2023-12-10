/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Usuario } from '@/Utils/functions/userTypes.d';
import serverAction, { getCdEmail, setAlert } from '@/Utils/functions/auth.d';
import { AuthContext } from '../../login/AuthProvider';
import PasswordField from '@/Components/inputs/PasswordField';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '1em',
  },
  section: {
    padding: '0 0 1em',
    '& > div': {
      padding: 4,
    },
  },
  sectionTitle: {
    padding: '0 0 1em',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

function PerfilUsuario() {
  const classes = useStyles();
  const { usuario } = useContext(AuthContext);
  const [formValues, setFormValues] = useState<Usuario>(usuario || ({} as Usuario));
  const [confirmPassword, setConfirmPassword] = useState('');

  const isPasswordEqual = confirmPassword === formValues.dsSenha;

  const navigate = useNavigate();
  const isFormValid = isPasswordEqual && Object.entries(formValues).filter(([, value]) => !!value).length >= 3;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUsuario = {
      ...formValues,
      snConfirmado: 'S',
      dtInclusao: moment(formValues.dtInclusao ? formValues.dtInclusao : new Date().toString()).format('DD/MM/YYYY'),
      cdEmail: getCdEmail(formValues.dsEmail),
    };
    navigate('/afu');

    await serverAction('setUsuario', updatedUsuario, 'CtrlUsuario', true).then((res: any) => {
      if (res.status) {
        setAlert(`Usuário atualizado com sucesso!`, 'success');
      }
    });
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container item xs={12} justifyContent="space-between" className={classes.section}>
          <Grid container item xs={12} className={classes.sectionTitle}>
            <Typography variant="subtitle1">Dados cadastrais</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              name="nmUsuario"
              label="Nome"
              value={formValues.nmUsuario}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              name="dsEmail"
              label="Email"
              value={formValues.dsEmail}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PasswordField
              label="Nova Senha:"
              props={{ name: 'dsSenha', variant: 'filled' }}
              value={formValues.dsSenha ?? ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PasswordField
              label="Confirme a nova senha:"
              value={confirmPassword ?? ''}
              props={{ variant: 'filled' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="filled"
              disabled
              name="dtInclusao"
              label="Data de Inclusão"
              value={formValues.dtInclusao ? formValues.dtInclusao : moment().format('DD/MM/YYYY')}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="space-between" className={classes.section}>
          <Grid item xs={12}>
            <Button
              disabled={!isFormValid}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Atualizar Perfil
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default PerfilUsuario;
