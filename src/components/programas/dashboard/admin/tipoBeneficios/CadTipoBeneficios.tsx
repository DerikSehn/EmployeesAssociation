/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import dayjs from 'dayjs';
import { TipoBeneficio } from '@/Utils/functions/productTypes.d';
import serverAction, { setAlert } from '@/Utils/functions/auth.d';

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
}));

interface CadTipoBeneficioProps {
  editTipoBeneficio?: TipoBeneficio;
  onSubmit: () => void;
}

function CadTipoBeneficio({ editTipoBeneficio, onSubmit }: CadTipoBeneficioProps) {
  const classes = useStyles();

  const [formValues, setFormValues] = useState<TipoBeneficio>(editTipoBeneficio || ({} as TipoBeneficio));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await serverAction('setTipoBeneficio', formValues, 'CtrlTipoBeneficio', true).then((res: any) => {
      if (res.status) {
        setAlert(`Tipo de Benefício ${editTipoBeneficio ? 'alterado' : 'cadastrado'} com sucesso!`, 'info');
        onSubmit();
      }
    });
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        {/* Dados cadastrais */}
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid container item xs={12} className={classes.secaoTitle}>
            <Typography variant="subtitle1">Dados cadastrais</Typography>
          </Grid>
          <Grid container item xs={12} lg={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                name="nmTipoBeneficio"
                label="Descrição do Tipo de Benefício"
                value={formValues.nmTipoBeneficio}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                margin="dense"
                variant="filled"
                name="dtInclusao"
                label="Data de Abertura"
                disabled
                value={
                  formValues.dtInclusao
                    ? dayjs(formValues.dtInclusao).format('DD/MM/YYYY')
                    : dayjs().format('DD/MM/YYYY')
                }
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant="filled"
              name="dsObservacoes"
              label="Observações"
              multiline
              minRows={4}
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
              {editTipoBeneficio ? 'Confirmar alterações' : 'Cadastrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

CadTipoBeneficio.defaultProps = {
  editTipoBeneficio: undefined,
};

export default CadTipoBeneficio;
