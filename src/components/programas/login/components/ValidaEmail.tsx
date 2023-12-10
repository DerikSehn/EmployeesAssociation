import { Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCdEmail, validaEmail } from '@/Utils/functions/auth.d';
import MailButton from '@/Components/buttons/MailButton';

interface CadastroProps {
  onSubmit(dsEmail: string): void;
}

const useStyles = makeStyles((/* theme: Theme */) => ({
  root: {
    padding: 10,
  },
  tf: {
    padding: '.1em',
  },
}));

export default function ValidadsEmail({ onSubmit }: CadastroProps) {
  const classes = useStyles();

  const [dsEmail, setdsEmail] = useState('');
  const navigate = useNavigate();

  /* const handlecdCpf = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setcdCpf(event.target.value ?? '');
  }; */

  const handledsEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setdsEmail(event.target.value ?? '');
  };

  const handleSubmit = async () => {
    await onSubmit(await getCdEmail(dsEmail));
  };

  return (
    <>
      <Grid container item justifyContent="center" xs={12} className={classes.tf}>
        <Typography variant="subtitle1">insira seu email de Associado:</Typography>
      </Grid>
      <Grid className={classes.tf} item xs={12}>
        <TextField
          margin="dense"
          variant="outlined"
          name="dsEmail"
          fullWidth
          value={dsEmail}
          label="Email"
          onChange={(e) => handledsEmail(e)}
        />
      </Grid>
      {/* <Grid className={classes.tf} item xs={12}>
        <PasswordField value={password} onChange={handlePassword} label="Nova Senha" />
      </Grid> */}

      <MailButton disabled={!dsEmail || !validaEmail(dsEmail)} onClick={handleSubmit}>
        Confirmar E-mail
      </MailButton>
      <Button style={{ marginTop: '.2rem' }} variant="outlined" fullWidth onClick={() => navigate('/conveniado')}>
        Sou conveniado
      </Button>
    </>
  );
}
