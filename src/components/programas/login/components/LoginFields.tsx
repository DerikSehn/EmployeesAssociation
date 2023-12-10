import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import PasswordField from '../../../inputs/PasswordField';

interface LoginFieldsProps {
  onSubmit(email: string, password: string | undefined): void;
}

const useStyles = makeStyles((/* theme: Theme */) => ({
  root: {
    padding: 10,
  },
  tf: {
    padding: '.1em',
  },
}));

export default function LoginFields({ onSubmit }: LoginFieldsProps) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value ?? '');
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value ?? '');
  };

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <>
      <Grid className={classes.tf} item xs={12}>
        <TextField
          margin="dense"
          variant="outlined"
          name="email"
          fullWidth
          value={email}
          label="Insira o E-mail:"
          onChange={(e) => handleEmail(e)}
        />
      </Grid>
      <Grid className={classes.tf} item xs={12}>
        <PasswordField value={password} onChange={handlePassword} label="Senha:" />
      </Grid>
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Login
      </Button>
    </>
  );
}
