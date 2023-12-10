/* eslint-disable react/jsx-props-no-spreading */
import { Telegram } from '@mui/icons-material';
import { Button, ButtonProps, Slide, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactNode, useState } from 'react';

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

export default function MailButton({
  onClick,
  children,
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
{ children: ReactNode; onClick: () => Promise<any> } & ButtonProps) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (typeof onClick === 'function') {
      setLoading(true);
      await onClick();
      setLoading(false);
    }
  };

  return (
    <Button
      className={classes.button}
      variant="contained"
      fullWidth
      onClick={handleClick}
      {...props}
      disabled={loading === true ? loading : props.disabled}
    >
      <Slide direction="right" timeout={400} unmountOnExit mountOnEnter in={!loading}>
        <Typography variant="caption">{children}</Typography>
      </Slide>
      <Slide direction="left" timeout={400} unmountOnExit mountOnEnter in={loading}>
        <div className={classes.endIconWrapper}>
          <div className={classes.planeWrapper}>
            <Telegram className={classes.plane} />
          </div>
        </div>
      </Slide>
    </Button>
  );
}
