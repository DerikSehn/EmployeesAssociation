import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import PasswordField from '@/Components/inputs/PasswordField';

interface CadastroProps {
  onSubmit(password?: string): void;
}

const useStyles = makeStyles((/* theme: Theme */) => ({
  root: {
    padding: 10,
  },
  tf: {
    padding: '.1em',
  },
}));

export default function Signup({ onSubmit }: CadastroProps) {
  const classes = useStyles();
  const currentURL = new URL(window.location.href);
  const isForgot = !!currentURL.searchParams.get('rec_senha');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isValid = !!(password.length > 7 && password === confirm);

  /*  const handleEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value ?? '');
  };
 */

  return (
    <>
      <Grid container item xs={12} className={classes.tf}>
        <Typography variant="subtitle2">
          {isForgot
            ? 'Para recuperar o acesso à sua conta, por favor, digite uma nova senha.'
            : `Escolha uma senha forte para acessar o Painel dos Associados da AFU:`}
        </Typography>
      </Grid>
      <Grid className={classes.tf} item xs={12}>
        <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} label="Nova Senha" />
      </Grid>
      <Grid className={classes.tf} item xs={12}>
        <PasswordField value={confirm} onChange={(e) => setConfirm(e.target.value)} label="Confimar Senha" />
      </Grid>
      <Button disabled={!isValid} variant="contained" fullWidth onClick={() => onSubmit(password)}>
        Finalizar Cadastro
      </Button>
    </>
  );
}
