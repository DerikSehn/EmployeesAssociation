import { Telegram } from '@mui/icons-material';
import { Button, Grid, Slide, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isFunction } from 'lodash';
import { useState } from 'react';
import MailButton from '@/Components/buttons/MailButton';

interface ForgotPasswordProps {
  onSubmit(email: string): void;
}

const useStyles = makeStyles((/* theme: Theme */) => ({
  '@keyframes planeMove': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '50%': {
      transform: 'translateX(50%)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
  '@keyframes planeWrapperMove': {
    '0%': {
      transform: 'translateY(0%)',
    },
    '25%': {
      transform: 'translateY(-25%)',
    },
    '50%': {
      transform: 'translateY(0%)',
    },
    '75%': {
      transform: 'translateY(25%)',
    },
    '100%': {
      transform: 'translateY(0%)',
    },
  },
  root: {
    padding: 10,
  },
  tf: {
    padding: '.1em',
  },
  button: {
    overflow: 'hidden',
    minHeight: '52px',
    position: 'relative',
  },
  endIconWrapper: {
    position: 'relative',
  },
  planeWrapper: {
    position: 'absolute',

    top: -10,
    transform: 'translateY(0%)',
    height: '15px',
    animation: '$planeWrapperMove 3s infinite',
  },
  plane: {
    position: 'absolute',
    animation: '$planeMove 2.8s infinite',
  },
}));

export default function ForgotPassword({ onSubmit }: ForgotPasswordProps) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  /*   const [isSubmitted, setIsSubmitted] = useState(false);
   */ const [email, setEmail] = useState('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value ?? '');
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (isFunction(onSubmit)) {
      await onSubmit(email);
      setLoading(false);
    }
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
          label="Insira seu e-mail:"
          onChange={(e) => handleEmail(e)}
        />
      </Grid>
      <MailButton onClick={handleSubmit}>Confirmar Email</MailButton>
    </>
  );
}
