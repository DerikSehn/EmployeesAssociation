/* eslint-disable react/jsx-props-no-spreading */
import { Delete } from '@mui/icons-material';
import { Badge, Card, CardContent, CardMedia, IconButton, Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { isFunction } from 'lodash';
import { Evento } from '@/Utils/functions/productTypes.d';
import { CardEventoProps } from './types.d';
import { arrayBufferToBlobUrl } from '../inputs/ImageUploader';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginBottom: 20,
    cursor: 'pointer',
    overflow: 'hidden',
    '& > div:first-child': {
      transform: 'scale(1)',
    },
    transition: '1s',
    '&:hover': {
      '& $deleteIcon': {
        opacity: 1,
        transition: '.2s',
      },
      boxShadow: theme.shadows[15],
      '& > div:first-child': {
        transform: 'scale(1.1)',
        boxShadow: 'none',
      },
    },
  },
  cardMedia: {
    minWidth: '220px',
    width: '100%',
    height: 200,
    transition: '1s',
    zIndex: 0,
    boxShadow: '0 0 200px rgba(0,51,0,0.4) inset',
  },
  cardContent: {
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
  },
  deleteIcon: {
    transition: '.2s',
    transform: 'translateX(-15px) translateY(20px)',
    opacity: 0,
  },
}));

function CardEvento({ title, buttonText, evento, onClick, onDelete, imagem, CardProps, readOnly }: CardEventoProps) {
  const classes = useStyles();
  const handleClick = () => {
    if (isFunction(onClick)) {
      onClick(evento);
    }
  };
  const handleDelete = () => {
    if (typeof onDelete === 'function') onDelete(evento as Evento);
  };

  return (
    <Tooltip title={buttonText}>
      <Card {...CardProps} onClick={handleClick} className={classes.card}>
        <Badge
          style={{ width: '100%', height: '100%' }}
          badgeContent={
            readOnly && isFunction(onDelete) ? null : (
              <IconButton className={classes.deleteIcon} onClick={handleDelete}>
                <Delete />
              </IconButton>
            )
          }
        >
          <CardMedia
            className={classes.cardMedia}
            image={arrayBufferToBlobUrl(evento?.documento?.blobDocumento, 'image/png/jpeg') || imagem}
            title={evento?.nmEvento}
          />
        </Badge>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" component="h3">
            {evento?.nmEvento || title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {evento?.dsEvento}
          </Typography>
          <Typography variant="caption">{dayjs(evento?.dtInclusao).format('DD/MM')}</Typography>
        </CardContent>
      </Card>
    </Tooltip>
  );
}

export default CardEvento;
