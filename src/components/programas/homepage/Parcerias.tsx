import { Card, Grid, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Conveniado } from '@/Utils/functions/userTypes.d';
import serverAction from '@/Utils/functions/auth.d';
import InfiniteSlider from '../../sliders/InfiniteSlider';
import { arrayBufferToBlobUrl } from '../../inputs/ImageUploader';

const useStyles = makeStyles((theme: Theme) => ({
  ParceriasRoot: {
    color: theme.palette.text.secondary,
    padding: isMobile || isTablet ? '' : '0 5rem',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  ParceriasRootWrapper: {
    margin: '0 auto',
    maxWidth: 1360,
    width: '100%',
  },
  divider: {
    width: '100%',
    color: theme.palette.background.paper,
  },
  icon: {
    transform: 'scale(2.5)',
    color: theme.palette.text.secondary,
  },
}));

function Parcerias() {
  const [listParcerias, setListParcerias] = useState<Conveniado[]>([]);

  const classes = useStyles();
  const { palette } = useTheme();

  const getListaParcerias = () => {
    serverAction('getListParcerias', {}, 'CtrlInformacoesHomePage', true).then((res) => {
      if (res.status) {
        setListParcerias(res.lista as Conveniado[]);
      }
    });
  };

  useEffect(() => {
    getListaParcerias();
  }, []);

  return (
    <Grid container item xs={12} className={classes.ParceriasRoot}>
      {listParcerias?.length ? (
        <>
          <Grid container className={classes.ParceriasRootWrapper}>
            <Grid container item xs={12} p="2rem 0">
              <Typography variant="h4" gutterBottom>
                <b>Parcerias</b>
              </Typography>
            </Grid>
          </Grid>
          <InfiniteSlider>
            {[...listParcerias, ...listParcerias, ...listParcerias, ...listParcerias].map(
              ({ dsRazaoSocial, idConveniado, documento }) => (
                <Grid
                  boxShadow={0.2}
                  borderRadius={3}
                  container
                  minWidth={150}
                  maxWidth={150}
                  key={`${idConveniado}-${dsRazaoSocial}`}
                  item
                >
                  {documento?.blobDocumento ? (
                    <Grid borderRadius={5} container item justifyContent="center" xs={12}>
                      <img
                        style={{ borderRadius: '.3rem', maxWidth: '100%', maxHeight: '70%' }}
                        src={arrayBufferToBlobUrl(documento.blobDocumento, 'image/png/jpeg') || undefined}
                        alt="imagem-conveniado"
                      />
                    </Grid>
                  ) : null}
                </Grid>
              ),
            )}
          </InfiniteSlider>
        </>
      ) : null}
    </Grid>
  );
}

export default Parcerias;
