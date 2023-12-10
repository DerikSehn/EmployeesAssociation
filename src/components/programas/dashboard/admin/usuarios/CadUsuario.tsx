/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isEqual, isObject } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { Associado, Conveniado, PerfilUsuario, Usuario } from '@/Utils/functions/userTypes.d';
import serverAction, { getCdEmail, setAlert } from '@/Utils/functions/auth.d';
import UtilAutoComplete from '@/Components/inputs/UtilAutoComplete';
import PasswordField from '@/Components/inputs/PasswordField';

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
}));
interface CadUsuarioProps {
  editUsuario?: Usuario;
  onSubmit: () => void;
}

function CadUsuario({ editUsuario, onSubmit }: CadUsuarioProps) {
  const classes = useStyles();
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [formValues, setFormValues] = useState<Usuario>(editUsuario || ({} as Usuario));
  const isFormValuesDifferent = !isEqual(editUsuario ?? {}, formValues);
  const isNewUsuarioValid = [
    (formValues.dsEmail || formValues.associado?.dsEmail || formValues.conveniado?.dsEmail || '')
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    formValues.nmUsuario?.length > 2,
  ].every((value) => !!value);
  const isPasswordEqual = confirmaSenha === formValues.dsSenha;

  const isUserValid = isFormValuesDifferent && (editUsuario || (isNewUsuarioValid && isPasswordEqual));

  const handleChange = (event: any, field?: any) => {
    const { name, value } = event.target;
    setFormValues((pvSt: any) => ({
      ...pvSt,
      ...(typeof field === 'string' ? { [field]: { ...pvSt[field], ...value } } : { [name]: value }),
    }));
  };

  const handleAutoCompleteChange = (value: unknown, field?: string, name?: string) => {
    handleChange(
      {
        target: {
          name,
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>,
      field,
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cdEmail = getCdEmail(
      formValues.dsEmail || formValues.associado?.dsEmail || formValues.conveniado?.dsEmail || '',
    );

    const obj = {
      ...formValues,
      snConfirmado: 'S',
      idConveniado: formValues.conveniado?.idConveniado,
      idAssociado: formValues.associado?.idAssociado,
      dtInclusao: formValues.dtInclusao ?? moment().format('DD/MM/YYYY'),
      cdEmail,
    };

    await serverAction('setUsuario', obj, 'CtrlUsuario', true).then((res: any) => {
      if (res.status) {
        setAlert(`Usuário ${editUsuario ? 'alterado' : 'cadastrado'} com sucesso!`, 'success');
        onSubmit();
      }
    });
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid container item xs={12} className={classes.secaoTitle}>
            <Typography variant="subtitle1">Dados cadastrais</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              name="nmUsuario"
              label="Nome"
              value={formValues.nmUsuario}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="filled"
              disabled
              name="dtInclusao"
              label="Data de Inclusão"
              value={
                formValues.dtInclusao
                  ? moment(formValues.dtInclusao).format('DD/MM/YYYY')
                  : moment().format('DD/MM/YYYY')
              }
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              key={formValues.associado?.dsEmail || formValues.conveniado?.dsEmail}
              variant="filled"
              name="dsEmail"
              disabled={!!(formValues.associado?.dsEmail || formValues.conveniado?.dsEmail)}
              label="Email"
              InputLabelProps={{ shrink: true }}
              value={formValues.dsEmail ?? (formValues.associado?.dsEmail || formValues.conveniado?.dsEmail)}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {!formValues.dsEmail ? (
            <>
              <Grid item xs={12} sm={6}>
                <UtilAutoComplete
                  label="Associado Vinculado"
                  disabled={!!formValues.conveniado?.idConveniado}
                  variant="filled"
                  value={formValues?.associado || ({ idAssociado: undefined } as Associado)}
                  defaultValue={formValues?.associado}
                  getOptionLabel={(option) =>
                    isObject(option) && option?.idAssociado ? `${option?.nmAssociado} - ${option?.dsEmail}` : ''
                  }
                  onChange={(_, value) => handleAutoCompleteChange(value, 'associado')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <UtilAutoComplete
                  style={{ marginTop: '8px' }}
                  label="Conveniado Vinculado"
                  disabled={!!formValues.associado?.idAssociado}
                  variant="filled"
                  value={formValues?.conveniado || ({ idConveniado: undefined } as Conveniado)}
                  defaultValue={formValues?.conveniado}
                  getOptionLabel={(option) =>
                    isObject(option) && option?.idConveniado ? `${option?.dsNomeFantasia} - ${option?.dsEmail}` : ''
                  }
                  onChange={(_, value) => handleAutoCompleteChange(value, 'conveniado')}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={6}>
              <UtilAutoComplete
                style={{ marginTop: '8px' }}
                label="Tipo de Usuário"
                variant="filled"
                value={formValues?.perfilUsuario || ({ idPerfilUsuario: undefined } as PerfilUsuario)}
                defaultValue={formValues?.perfilUsuario}
                getOptionLabel={(option) =>
                  isObject(option) && option?.idPerfilUsuario
                    ? `${option?.nmPerfilUsuario} - ${option?.dsPerfilUsuario}`
                    : ''
                }
                onChange={(_, value) => handleAutoCompleteChange(value, 'perfilUsuario')}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Grid item xs={12} sm={6}>
              <PasswordField
                label="Senha:"
                props={{ name: 'dsSenha', variant: 'filled' }}
                value={formValues.dsSenha ?? ''}
                onChange={handleChange}
              />
            </Grid>
            {!editUsuario ? (
              <Grid item xs={12} sm={6}>
                <PasswordField
                  label="Repita a senha:"
                  value={confirmaSenha ?? ''}
                  props={{ variant: 'filled' }}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid item xs={12}>
            <Button
              disabled={!isUserValid}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {editUsuario ? 'Confirmar alterações' : 'Cadastrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
CadUsuario.defaultProps = {
  editUsuario: undefined,
};

export default CadUsuario;
