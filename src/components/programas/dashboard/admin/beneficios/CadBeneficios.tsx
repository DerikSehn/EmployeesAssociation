/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, MenuItem, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isObject } from 'lodash';
import { useState } from 'react';
import CustomNumberFormat from '@/Components/inputs/CustomNumberFormat';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';
import { Beneficio, gerarBeneficios } from '@/Utils/functions/productTypes.d';
import { gerarConveniados } from '@/Utils/functions/userTypes.d';
import UtilAutoComplete from '../../../../inputs/UtilAutoComplete';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '.5em',
  },
  secao: {
    padding: '0 0 1.2em',
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
}));

interface CadBeneficiosProps {
  editBeneficio?: Beneficio;
  onSubmit: () => void;
}

function CadBeneficios({ editBeneficio, onSubmit }: CadBeneficiosProps) {
  const classes = useStyles();

  const [formValues, setFormValues] = useState<Beneficio>(
    editBeneficio || gerarBeneficios(0)[0] /* ({} as Beneficio ) */,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAutoCompleteChange = (name: string, value: unknown) => {
    handleChange({
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const obj = {
      ...formValues,
      tipoBeneficio: null,
      idTipoBeneficio: formValues?.tipoBeneficio?.idTipoBeneficio,
    };

    await serverAction(`setBeneficio`, obj, 'CtrlBeneficio', true).then((res) => {
      if (res.status) {
        onSubmit();
      }
    });
    setAlert(`Benefício ${editBeneficio ? 'alterado' : 'cadastrado'} com sucesso!`, 'info');
  };

  return (
    <Grid key={formValues.idBeneficio} container item xs={12} className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        {/* Dados cadastrais */}
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid container item xs={12} className={classes.secaoTitle}>
            <Typography variant="subtitle1">Dados cadastrais</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="filled"
              name="nmBeneficio"
              label="Descrição do Benefício"
              value={formValues.nmBeneficio}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <UtilAutoComplete
              key={formValues.tipoBeneficio.idTipoBeneficio}
              label="Tipo de benefício"
              defaultValue={formValues.tipoBeneficio}
              value={formValues.tipoBeneficio}
              variant="filled"
              getOptionLabel={(option) =>
                isObject(option) && option?.idTipoBeneficio
                  ? `${option?.idTipoBeneficio} - ${option?.nmTipoBeneficio}`
                  : ''
              }
              onChange={(_, value) => handleAutoCompleteChange('tipoBeneficio', value)}
            />
          </Grid>

          {/* Outras informações */}
          <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
            <Grid container item xs={12} className={classes.secaoTitle}>
              <Typography variant="subtitle1">Valores</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} lg={2}>
            <TextField
              variant="filled"
              name="qtMinima"
              label="Quantidade Mínima"
              type="number"
              value={formValues.qtMinima}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} lg={4}>
            <TextField
              variant="filled"
              name="vlMinimo"
              InputProps={{ inputComponent: CustomNumberFormat as any }}
              label="Valor Mínimo:"
              value={formValues.vlMinimo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} lg={2}>
            <TextField
              variant="filled"
              name="qtMaxima"
              label="Quantidade Máxima"
              type="number"
              value={formValues.qtMaxima}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} lg={4}>
            <TextField
              variant="filled"
              name="vlMaximo"
              InputProps={{ inputComponent: CustomNumberFormat as any }}
              label="Valor Máximo:"
              value={formValues.vlMaximo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} className={classes.secaoTitle}>
            <Typography variant="subtitle1">Outras Informações</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <UtilAutoComplete
              label="Conveniado"
              key={formValues.conveniado?.idConveniado}
              variant="filled"
              value={formValues.conveniado ?? gerarConveniados(0)[0]}
              defaultValue={formValues.conveniado ?? gerarConveniados(0)[0]}
              getOptionLabel={(option) =>
                isObject(option) && option.idConveniado
                  ? `${option?.dsRazaoSocial} - ${option?.dsNomeResponsavel || option.dsNomeFantasia}`
                  : ''
              }
              onChange={(_, value) => handleAutoCompleteChange('conveniado', value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="filled"
              name="tpPeriodoApuracao"
              label="Período de Apuração"
              value={formValues.tpPeriodoApuracao}
              onChange={handleChange}
              fullWidth
              select
            >
              <MenuItem value="L">Tipo 1</MenuItem>
              <MenuItem value="X">Tipo 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              name="dsObservacoes"
              multiline
              minRows={4}
              label="Observações"
              value={formValues.dsObservacoes}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Botão de submit */}
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              {editBeneficio ? 'Confirmar alterações' : 'Cadastrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

CadBeneficios.defaultProps = {
  editBeneficio: undefined,
};

export default CadBeneficios;
