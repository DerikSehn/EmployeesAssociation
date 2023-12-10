import { Button, CardActions, CardContent, CardHeader, Grid, Theme, Typography, alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CardAFUProps } from './types.d';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '1em',
  },
  card: {
    padding: '1em',
    borderRadius: '1em',
    border: `2px solid ${alpha(theme.palette.primary.light, 0.3)}`,
  },
  actionButton: {
    marginRight: theme.spacing(3),
  },
}));

function CardAFU(props: CardAFUProps) {
  const classes = useStyles();
  const { buttonText, description, title } = props;

  const handleClick = () => {
    //  onClick('action');
  };

  return (
    <Grid container item justifyContent="center" xs={12} className={classes.root}>
      <Grid item xs={12} className={classes.card}>
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="body1">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" className={classes.actionButton} onClick={handleClick}>
            {buttonText}
          </Button>
        </CardActions>
      </Grid>
    </Grid>
  );
}

export default CardAFU;
