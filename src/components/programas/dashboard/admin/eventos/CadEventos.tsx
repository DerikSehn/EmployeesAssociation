/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { isObject } from 'lodash';
import { useState } from 'react';
import gerarEventos, { Evento, gerarEvento } from '@/Utils/functions/productTypes.d';
import serverAction, { setAlert, uploadFile } from '@/Utils/functions/auth.d';
import UtilAutoComplete from '@/Components/inputs/UtilAutoComplete';
import ImageUploader from '@/Components/inputs/ImageUploader';
import fileToBlob from '@/Utils/functions/fileUtils';
import { Documento } from '@/Utils/functions/IDocumento';

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
  dropContainer: {
    width: '100%',
    cursor: 'default',
  },
}));

interface CadEventosProps {
  editEvento?: Evento;
  onSubmit: () => void;
}

function CadEventos({ editEvento, onSubmit }: CadEventosProps) {
  const classes = useStyles();

  const [formValues, setFormValues] = useState<Evento>(editEvento || /* ({} as Evento) */ gerarEventos(0)[0]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues: Evento) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAutoCompleteChange = (name: string, value: any) => {
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
      idAction: formValues.idEvento,
      objName: 'evento',
    };
    await serverAction('setAction', obj, 'CtrlAction', true).then((res: any) => {
      if (res.status) {
        if (!formValues.idEvento) {
          setFormValues(gerarEventos(0)[0]);
          onSubmit();
        }
        setAlert(`Evento ${editEvento ? 'alterado' : 'cadastrado'} com sucesso!`, 'info');
      }
    });
  };

  const handleDeleteImg = async () => {
    const obj = {
      objName: 'evento',
      idAction: formValues.idEvento,
      field: 'idDocumento',
    };
    await serverAction(`setColumnAction`, obj, 'CtrlAction', true).then((res: any) => {
      if (res.status) {
        setAlert(`Evento ${editEvento ? 'alterado' : 'cadastrado'} com sucesso!`, 'info');
      }
    });
  };

  const handleDropImg = async (documento: Documento) => {
    handleChange({
      target: {
        name: 'documento',
        value: documento,
      },
    });
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        {/* Dados do evento */}
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid container item xs={12} className={classes.secaoTitle}>
            <Typography variant="subtitle1">Dados do evento</Typography>
          </Grid>
          <Grid container item xs={12} lg={6}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                name="nmEvento"
                margin="dense"
                label="Nome do evento"
                value={formValues.nmEvento}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                name="dsEvento"
                margin="dense"
                label="Descrição do evento"
                multiline
                minRows={4}
                value={formValues.dsEvento}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <UtilAutoComplete
                style={{ marginTop: '8px', width: '100%' }}
                label="Conveniado"
                value={formValues?.conveniado}
                key={formValues.conveniado.idConveniado}
                variant="filled"
                defaultValue={formValues?.conveniado}
                getOptionLabel={(option) =>
                  isObject(option) && option.idConveniado
                    ? `${option?.dsNomeFantasia} - ${option?.dsNomeResponsavel}`
                    : ''
                }
                onChange={(_, value) => handleAutoCompleteChange('conveniado', value)}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} lg={6}>
            <Grid container item xs={12}>
              <ImageUploader
                className={classes.dropContainer}
                variant="drop"
                title="Adicione uma imagem para este evento"
                onDrop={handleDropImg}
                onDelete={handleDeleteImg}
              />
            </Grid>
            {editEvento && (
              <>
                <Grid item xs={12} sm={5}>
                  <TextField
                    margin="dense"
                    variant="filled"
                    name="dtInclusao"
                    label="Data de inclusão"
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
                <Grid item xs={12} sm={5}>
                  <TextField
                    margin="dense"
                    variant="filled"
                    name="dtExclusao"
                    label="Data de exclusão"
                    disabled
                    value={formValues.dtExclusao ?? undefined}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        {/* Botão de submit */}
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              {editEvento ? 'Confirmar alterações' : 'Cadastrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

CadEventos.defaultProps = {
  editEvento: undefined,
};

export default CadEventos;
