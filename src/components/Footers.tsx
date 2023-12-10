import { Box, Container, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

const footerStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    bottom: 0,
  },
}));

function HomeFooter() {
  const classes = footerStyles();
  return (
    <Box component="footer" className={classes.root}>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {dayjs().get('year')} Unimed Vale do caí.
        </Typography>
      </Container>
    </Box>
  );
}

export default HomeFooter;
