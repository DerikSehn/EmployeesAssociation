import { CheckCircle, Circle, Email, Numbers, Person, Phone, Work } from '@mui/icons-material';
import { Grid, ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import imgAssociado from '@/Assets/imgsExample/avatar.png';

import { Associado } from '@/Utils/functions/userTypes.d';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '1em',
  },
  secao: {
    padding: '0 0 1em',
    '& > div': {
      padding: 4,
    },
  },
  secaoTitle: {
    padding: '0 0 1em',
  },
  button: {
    margin: theme.spacing(2),
  },
  imgAssociado: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '50%',
  },
}));

interface DetalhesAssociadoProps {
  associado?: Associado;
}

function DetalhesAssociado({ associado }: DetalhesAssociadoProps) {
  const classes = useStyles();

  // Verifique se o associado existe antes de renderizar a tela
  if (!associado) {
    return <div>Nenhum associado selecionado.</div>;
  }

  // Principais informações do associado
  const principaisInformacoesAssociado = [
    { icon: <Numbers />, label: 'Matrícula', value: associado.nrMatricula },
    { icon: <Person />, label: 'Nome', value: associado.nmAssociado },
    {
      icon: associado?.tpSituacao?.toLocaleLowerCase() === 'ativo' ? <CheckCircle /> : <Circle />,
      label: 'Situação',
      value: associado.tpSituacao,
    },
    { icon: <Work />, label: 'Setor', value: associado.dsSetor },
    { icon: <Email />, label: 'Email', value: associado.dsEmail },
    { icon: <Phone />, label: 'Celular', value: associado.dsCelular },
  ];

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
        {/* <Grid container item xs={12} className={classes.secaoTitle}>
          <Typography variant="subtitle1">Informações do Associado</Typography>
        </Grid> */}
        <Grid container item xs={12} lg={4} justifyContent="center" alignItems="center">
          <img src={imgAssociado} alt="associado" className={classes.imgAssociado} />
        </Grid>
        <Grid container item xs={12} md={8}>
          {principaisInformacoesAssociado.map((informacao) => (
            <Grid item xs={12} key={informacao.label}>
              <ListItem>
                <ListItemIcon>{informacao.icon}</ListItemIcon>
                <ListItemText primary={informacao.label} secondary={informacao.value} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
DetalhesAssociado.defaultProps = {
  associado: undefined,
};

export default DetalhesAssociado;
