/* eslint-disable react/jsx-props-no-spreading */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

interface PasswordFieldProps {
  value: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  props?: TextFieldProps;
}

interface PasswordAdornmentProps {
  showPassword: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function PasswordAdornment({ onClick, showPassword }: PasswordAdornmentProps) {
  return (
    <InputAdornment position="end">
      <IconButton disableTouchRipple disableRipple {...{ onClick }}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}

export default function PasswordField({ label, onChange, value, props }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((pvSt) => !pvSt);
  };

  return (
    <TextField
      margin="dense"
      fullWidth
      variant="outlined"
      {...props}
      InputProps={{
        type: showPassword ? 'text' : 'password',
        endAdornment: <PasswordAdornment onClick={handleShowPassword} showPassword={showPassword} />,
      }}
      {...{ label, onChange, value }}
    />
  );
}

PasswordField.defaultProps = {
  props: undefined,
};
