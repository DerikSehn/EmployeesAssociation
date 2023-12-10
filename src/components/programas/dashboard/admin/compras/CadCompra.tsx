/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isObject } from 'lodash';
import { useState } from 'react';
import imgCompra from '@/Assets/purchase.png';
import CustomNumberFormat from '@/Components/inputs/CustomNumberFormat';
import UtilAutoComplete from '@/Components/inputs/UtilAutoComplete';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';
import { Compra, gerarBeneficios, gerarCompras } from '@/Utils/functions/productTypes.d';
import { gerarAssociados } from '@/Utils/functions/userTypes.d';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '.5em',
    width: '100%',
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
  tfRange: {
    padding: '0 1em',
    width: '80%',
    backgroundColor: theme.palette.background.default,
  },
  imgCompra: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '50%',
  },
  imgContainer: {},
}));

interface CadCompraProps {
  editCompra?: Compra;
  onSubmit: () => void;
}

function CadCompra({ editCompra, onSubmit }: CadCompraProps) {
  const classes = useStyles();

  const [formValues, setFormValues] = useState<Compra>(editCompra || gerarCompras(0)[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const obj = {
      ...formValues,
      vlCompra: formValues.vlCompra,
      idAssociado: formValues.associado.idAssociado,
      idBeneficio: formValues.beneficio.idBeneficio,
    };
    await serverAction('setCompra', obj, 'CtrlCompra', true).then((res: any) => {
      if (res.status) {
        setAlert(`Compra ${editCompra ? 'alterada' : 'cadastrada'} com sucesso!`, 'info');
        onSubmit();
      }
    });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    handleChange({
      target: {
        name: 'vlCompra',
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleAutoCompleteChange = (name: string, value: unknown) => {
    handleChange({
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        {/* Dados cadastrais */}
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid container item xs={12} className={classes.secaoTitle}>
            <Typography variant="subtitle1">Dados cadastrais</Typography>
          </Grid>
          <Grid container item xs={12} lg={8} spacing={2}>
            <Grid item xs={12}>
              <UtilAutoComplete
                key={formValues.associado?.idAssociado}
                variant="filled"
                label="Associado"
                defaultValue={formValues?.associado ?? gerarAssociados(0)[0]}
                value={formValues.associado ?? gerarAssociados(0)[0]}
                getOptionLabel={(option) =>
                  isObject(option) && option?.idAssociado ? `${option.nrMatricula} - ${option.nmAssociado}` : ''
                }
                onChange={(_, value) => handleAutoCompleteChange('associado', value)}
              />
            </Grid>

            <Grid item xs={12}>
              <UtilAutoComplete
                key={formValues?.beneficio?.idBeneficio}
                defaultValue={formValues.beneficio ?? gerarBeneficios(0)[0]}
                label="Benefício"
                value={formValues.beneficio ?? gerarBeneficios(0)[0]}
                variant="filled"
                getOptionLabel={(option) =>
                  isObject(option) && option?.idBeneficio ? `${option.nmBeneficio} - ${option.dsObservacoes}` : ''
                }
                onChange={(_, value) => handleAutoCompleteChange('beneficio', value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
                label="Conveniado Vinculado ao benefício"
                key={formValues?.beneficio?.conveniado?.dsRazaoSocial}
                value={formValues?.beneficio?.conveniado?.dsRazaoSocial}
                defaultValue={formValues?.beneficio?.conveniado?.dsRazaoSocial}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                name="vlCompra"
                InputProps={{ inputComponent: CustomNumberFormat as any }}
                label="Valor da Compra"
                value={formValues.vlCompra}
                onChange={handleNumberChange}
                fullWidth
              />
            </Grid>

            {/* Adicione mais campos conforme necessário */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                {editCompra ? 'Confirmar alterações' : 'Cadastrar'}
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            lg={4}
            justifyContent="center"
            alignItems="center"
            className={classes.imgContainer}
          >
            <img src={imgCompra} alt="compra" className={classes.imgCompra} />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

CadCompra.defaultProps = {
  editCompra: undefined,
};

export default CadCompra;
