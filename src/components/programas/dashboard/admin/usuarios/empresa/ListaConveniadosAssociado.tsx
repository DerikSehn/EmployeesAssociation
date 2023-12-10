/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsApp } from '@mui/icons-material';
import { Button, Divider, Grid, Icon, ListItem, Skeleton, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isMobile, isTablet } from 'react-device-detect';
import CardButtonCadastro from '@/Components/cards/CardContained';
import { ImageFromBuffer } from '@/Components/inputs/ImageUploader';
import GenericTable from '@/Components/lists/GenericTable';
import { Conveniado, gerarConveniados } from '@/Utils/functions/userTypes.d';
import DialogDetalhesConveniado from './DialogDetalhesConveniado';

const useStyles = makeStyles((theme: Theme) => ({
  ListaConveniadosAssociadoRoot: {},
  divider: {
    width: '100%',
    color: theme.palette.background.paper,
  },
  list: {
    width: '100%',
  },

  icon: {
    transform: 'scale(2.5)',
    padding: '2rem 2rem 0 0 ',
    color: theme.palette.text.secondary,
  },
}));

function ConveniadoItem({ conveniado }: { conveniado: Conveniado }) {
  const { dsRazaoSocial, documento, dsRamo } = conveniado;

  const theme = useTheme();

  return (
    <Grid container>
      <Grid
        borderRadius={5}
        width={isMobile || isTablet ? 100 : 200}
        height={isMobile || isTablet ? 100 : 200}
        item
        justifyContent="center"
        position="relative"
      >
        <DialogDetalhesConveniado conveniado={conveniado}>
          {documento?.blobDocumento ? (
            <CardButtonCadastro title="" subtitle={dsRamo} style={{ backdropFilter: 'brightness(1)' }}>
              <ImageFromBuffer style={{ width: '100%', maxWidth: '100%' }} arrayBuffer={documento?.blobDocumento} />
            </CardButtonCadastro>
          ) : (
            <div>
              <Skeleton component={Button} width="100%" style={{ height: '100px' }} animation={false} />
              <Icon
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(2)',
                  color: theme.palette.text.secondary,
                }}
              >
                store
              </Icon>
              {isMobile || isTablet ? null : (
                <Button fullWidth variant="contained" color="primary">
                  Ver Benefícios
                </Button>
              )}
            </div>
          )}
        </DialogDetalhesConveniado>
      </Grid>
      <Grid
        container
        item
        alignContent="baseline"
        overflow="hidden"
        textOverflow="ellipsis"
        xs={8}
        lg={4}
        component={ListItem}
      >
        <Grid container>
          <Typography variant="h5" color={theme.palette.text.secondary} fontWeight="bold" align="left">
            {dsRazaoSocial}
          </Typography>
        </Grid>
        <Grid container>
          <Typography variant="h5" color={theme.palette.text.secondary} align="left">
            {dsRamo}
          </Typography>
        </Grid>
        <Grid container>
          <Grid item>
            <WhatsApp />
          </Grid>
          <Grid item pl={1}>
            <Typography variant="body1" color={theme.palette.text.secondary} align="left">
              {conveniado.dsCelular || conveniado.dsTelefone}
            </Typography>{' '}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Icon>email</Icon>
          </Grid>
          <Grid item pl={1}>
            <Typography variant="body1" color={theme.palette.text.secondary} align="left">
              {conveniado.dsEmail}
            </Typography>{' '}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        alignContent="baseline"
        overflow="hidden"
        textOverflow="ellipsis"
        xs={12}
        lg={4}
        component={ListItem}
      />
    </Grid>
  );
}

export default function ListaConveniadosAssociado() {
  const classes = useStyles();

  return (
    <>
      <Grid container p={2} item xs={12}>
        <Typography variant="h4" gutterBottom>
          <b>Empresas</b>
        </Typography>
      </Grid>
      <Divider className={classes.divider} />
      <GenericTable
        readOnly
        data={gerarConveniados(0)}
        head={['Conveniados']}
        // eslint-disable-next-line react/no-unstable-nested-components
        line={(conv) => [<ConveniadoItem conveniado={conv} />]}
        maxDepth={2}
      />
    </>
  );
}
