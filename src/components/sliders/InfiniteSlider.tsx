import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect, ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  infiniteSliderRoot: {
    alignItems: 'center',
    background: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
  },
  slider: {
    background: theme.palette.background.default,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    whiteSpace: 'nowrap',
    maxWidth: '1360px',
    '&:hover $slideTrack': {
      animationPlayState: 'paused',
    },
  },
  slideTrack: {
    display: 'flex',
    animation: '$scroll 20s linear infinite',
    padding: '1rem 1rem 1rem 0',
  },
  slide: {
    height: 100,
  },
  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0%)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
}));

function InfiniteSlider({ children }: { children: ReactNode }) {
  const classes = useStyles();
  return (
    <div className={classes.infiniteSliderRoot}>
      <div className={classes.slider}>
        <div className={classes.slideTrack}>{children}</div>
        <div className={classes.slideTrack}>{children}</div>
        <div className={classes.slideTrack}>{children}</div>
      </div>
    </div>
  );
}

export default InfiniteSlider;
