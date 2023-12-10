import { Close, Search } from '@mui/icons-material';
import { CircularProgress, Grow, IconButton, InputAdornment, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes entrance': {
    '0%': {
      width: 0,
      padding: 0,
      margin: 0,
    },
    '100%': {
      width: '30px',
    },
  },
  root: {
    width: '100%',
    transition: '.3s',
    '&:focus': {
      color: 'red',
    },
  },
  closeButton: {
    animation: '$entrance .3s both',
  },
  inputAdornment: {
    color: theme.palette.background.paper,
    fontWeight: '800 !important',
  },
}));

interface SearchFieldProps {
  onClick(action: string): void;
  label: string;
  fullWidth?: boolean;
}

interface SearchAdornmentProps {
  loading: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SearchAdornment({ onClick, loading }: SearchAdornmentProps) {
  const classes = useStyles();

  return (
    <InputAdornment position="end" className={classes.inputAdornment}>
      <IconButton disableTouchRipple {...{ onClick }}>
        {loading ? <CircularProgress /> : <Search fontSize="large" />}
      </IconButton>
    </InputAdornment>
  );
}

export default function SearchField({ onClick, label, fullWidth }: SearchFieldProps) {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
    onClick('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    setTimeout(() => {
      onClick(value);
      setLoading(false);
    }, 0);
  };

  return (
    <TextField
      fullWidth={fullWidth}
      margin="dense"
      onChange={handleChange}
      color="primary"
      variant="filled"
      label={label ?? 'pesquisar'}
      InputProps={{
        className: classes.root,
        endAdornment: (
          <>
            {value ? (
              <Grow in={!!value} timeout={400}>
                <IconButton className={classes.closeButton} onClick={handleClear}>
                  <Close />
                </IconButton>
              </Grow>
            ) : null}
            <SearchAdornment onClick={handleClick} loading={loading} />,
          </>
        ),
      }}
      {...{ value }}
    />
  );
}

SearchField.defaultProps = {
  fullWidth: false,
};
